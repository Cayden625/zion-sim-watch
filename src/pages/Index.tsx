import { useSystemSimulation } from '@/hooks/useSystemSimulation';
import { MetricCard } from '@/components/MetricCard';
import { Activity } from 'lucide-react';

const Index = () => {
  const simulation = useSystemSimulation();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-2">
      <div className="w-full max-w-[196px] space-y-2">
        {/* Header */}
        <div className="text-center mb-3">
          <h1 className="text-sm font-bold text-primary tracking-tight">
            Zion System Monitor
          </h1>
          <h2 className="text-sm font-bold text-primary">(SIMULATION)</h2>
          <p className="text-[10px] text-muted-foreground mt-1">
            All readings simulated for demo only.
          </p>
        </div>

        {/* System Mode Card */}
        <MetricCard label="System Mode">
          <div className="text-sm font-bold text-foreground mb-1">
            {simulation.mode}
          </div>
          <div className="text-[10px] text-muted-foreground mb-1">
            {simulation.processDescription}
          </div>
          <div className={`text-[10px] font-medium ${
            simulation.bakingSoda <= 100 ? 'text-watch-danger' : 'text-watch-success'
          }`}>
            {simulation.warningMessage}
          </div>
        </MetricCard>

        {/* Oxygen Level Card */}
        <MetricCard label="O₂ Level">
          <div className="text-2xl font-bold text-primary">
            {simulation.oxygenLevel}%
          </div>
        </MetricCard>

        {/* Heart Rate Card */}
        <MetricCard label="Heart Rate (SIMULATED)">
          <div className="flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-watch-danger animate-pulse" />
            <div className="text-2xl font-bold text-foreground">
              {simulation.heartRate}
            </div>
            <div className="text-xs text-muted-foreground">bpm</div>
          </div>
        </MetricCard>

        {/* Power Card */}
        <MetricCard label="Power">
          <div className="space-y-0.5">
            <div className="text-[10px] text-muted-foreground">
              Generated (kWh): 
              <span className="ml-1 text-xs font-semibold text-watch-success">
                {simulation.powerGenerated.toFixed(3)}
              </span>
            </div>
            <div className="text-[10px] text-muted-foreground">
              Used (kWh): 
              <span className="ml-1 text-xs font-semibold text-watch-warning">
                {simulation.powerUsed.toFixed(3)}
              </span>
            </div>
          </div>
        </MetricCard>

        {/* Time Estimate Card */}
        <MetricCard label="Estimated Time Remaining">
          <div className="text-xl font-bold text-primary">
            {simulation.formattedTimeRemaining}
          </div>
        </MetricCard>

        {/* Baking Soda Card */}
        <MetricCard label="Baking Soda">
          <div className="text-sm font-semibold text-foreground">
            Baking Soda: {Math.round(simulation.bakingSoda)} ml
          </div>
          {simulation.bakingSoda <= 100 && (
            <div className="mt-1.5 text-[10px] font-bold text-watch-danger bg-watch-danger/10 px-2 py-1 rounded">
              WARNING: Baking soda low — refill required
            </div>
          )}
        </MetricCard>

        {/* HealthKit Placeholder */}
        <div className="mt-3 p-2 bg-secondary/50 rounded border border-border">
          <p className="text-[9px] text-muted-foreground italic">
            Apple Watch / HealthKit integration placeholder: Future real heart-rate integration would be implemented here using HealthKit APIs.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-[10px] text-muted-foreground pt-2">
          Last refresh: {simulation.lastRefresh}s ago
        </div>
      </div>
    </div>
  );
};

export default Index;
