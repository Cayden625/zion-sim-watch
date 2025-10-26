import { useState, useEffect, useRef } from 'react';

type SystemMode = 'Electrolysis Active' | 'Pumping Baking Soda' | 'Pumping Ocean Water';

interface SystemState {
  mode: SystemMode;
  oxygenLevel: number;
  heartRate: number;
  powerGenerated: number;
  powerUsed: number;
  timeRemaining: number; // in minutes
  bakingSoda: number;
  lastRefresh: number;
}

const getProcessDescription = (mode: SystemMode): string => {
  switch (mode) {
    case 'Electrolysis Active':
      return 'Process: Electrolysis running — splitting water';
    case 'Pumping Baking Soda':
      return 'Process: Pumping baking soda solution into chamber';
    case 'Pumping Ocean Water':
      return 'Process: Pumping ocean water to intake';
  }
};

const getRandomInterval = () => Math.random() * 1000 + 1000; // 1.0-2.0 seconds
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export const useSystemSimulation = () => {
  const [state, setState] = useState<SystemState>({
    mode: 'Electrolysis Active',
    oxygenLevel: 85,
    heartRate: 85,
    powerGenerated: 0.500,
    powerUsed: 0.100,
    timeRemaining: 120, // 2 hours = 120 minutes
    bakingSoda: 750,
    lastRefresh: 1.5,
  });

  const modeStartTimeRef = useRef(Date.now());
  const modeDurationsRef = useRef({
    'Electrolysis Active': 20000,
    'Pumping Baking Soda': 5000,
    'Pumping Ocean Water': 5000,
  });

  useEffect(() => {
    const updateSimulation = () => {
      setState(prevState => {
        const now = Date.now();
        const elapsed = now - modeStartTimeRef.current;
        const currentModeDuration = modeDurationsRef.current[prevState.mode];
        
        let newMode = prevState.mode;
        let shouldResetModeTimer = false;

        // Check if mode should change
        if (elapsed >= currentModeDuration) {
          shouldResetModeTimer = true;
          if (prevState.mode === 'Electrolysis Active') {
            newMode = 'Pumping Baking Soda';
          } else if (prevState.mode === 'Pumping Baking Soda') {
            newMode = 'Pumping Ocean Water';
          } else {
            newMode = 'Electrolysis Active';
          }
        }

        if (shouldResetModeTimer) {
          modeStartTimeRef.current = now;
        }

        // Update oxygen level (random walk between 70-98)
        const oxygenChange = (Math.random() - 0.5) * 4;
        const newOxygen = clamp(Math.round(prevState.oxygenLevel + oxygenChange), 70, 98);

        // Update heart rate (random between 70-110)
        const newHeartRate = Math.floor(Math.random() * 41) + 70;

        // Update power generated (monotonic increase)
        const generatedIncrease = Math.random() * 0.003 + 0.001;
        const newPowerGenerated = prevState.powerGenerated + generatedIncrease;

        // Update power used (increases based on mode, capped at 5.0)
        let usedIncrease = 0.001;
        if (newMode === 'Electrolysis Active') {
          usedIncrease = 0.003;
        } else if (newMode === 'Pumping Baking Soda' || newMode === 'Pumping Ocean Water') {
          usedIncrease = 0.0015;
        }
        const newPowerUsed = Math.min(5.0, prevState.powerUsed + usedIncrease);

        // Update time remaining (slowly decrement)
        const timeDecrease = 0.02; // minutes per tick
        const newTimeRemaining = Math.max(0, prevState.timeRemaining - timeDecrease);

        // Update baking soda (only decrease during Pumping Baking Soda mode)
        let newBakingSoda = prevState.bakingSoda;
        if (newMode === 'Pumping Baking Soda') {
          newBakingSoda = Math.max(0, prevState.bakingSoda - 0.5);
        }

        const newRefreshInterval = (Math.random() + 1).toFixed(1);

        return {
          mode: newMode,
          oxygenLevel: newOxygen,
          heartRate: newHeartRate,
          powerGenerated: newPowerGenerated,
          powerUsed: newPowerUsed,
          timeRemaining: newTimeRemaining,
          bakingSoda: newBakingSoda,
          lastRefresh: parseFloat(newRefreshInterval),
        };
      });
    };

    const interval = setInterval(updateSimulation, getRandomInterval());
    return () => clearInterval(interval);
  }, []);

  const warningMessage = state.bakingSoda <= 100 
    ? 'WARNING: Baking soda low — refill required' 
    : 'Warning: Stable';

  const processDescription = getProcessDescription(state.mode);

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return `${hours}h ${mins}m`;
  };

  return {
    ...state,
    warningMessage,
    processDescription,
    formattedTimeRemaining: formatTime(state.timeRemaining),
  };
};
