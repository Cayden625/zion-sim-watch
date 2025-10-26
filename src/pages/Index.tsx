import { useSystemSimulation } from '@/hooks/useSystemSimulation';
import { MetricCard } from '@/components/MetricCard';
import { Activity } from 'lucide-react';

const Index = () => {
  const simulation = useSystemSimulation();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-3">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold text-primary tracking-tight">
            Zion System Monitor
          </h1>
          <h2 className="text-xl font-bold text-primary">(SIMULATION)</h2>
          <p className="text-sm text-muted-foreground mt-2">
            All readings simulated for demo only.
          </p>
        </div>

        {/* System Mode Card */}
        <MetricCard label="System Mode">
          <div className="text-lg font-bold text-foreground mb-2">
            {simulation.mode}
          </div>
          <div className="text-sm text-muted-foreground mb-2">
            {simulation.processDescription}
          </div>
          <div className={`text-sm font-medium ${
            simulation.bakingSoda <= 100 ? 'text-watch-danger' : 'text-watch-success'
          }`}>
            {simulation.warningMessage}
          </div>
        </MetricCard>

        {/* Oxygen Level Card */}
        <MetricCard label="O₂ Level">
          <div className="text-3xl font-bold text-primary">
            {simulation.oxygenLevel}%
          </div>
        </MetricCard>

        {/* Heart Rate Card */}
        <MetricCard label="Heart Rate (SIMULATED)">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-watch-danger animate-pulse" />
            <div className="text-3xl font-bold text-foreground">
              {simulation.heartRate}
            </div>
            <div className="text-sm text-muted-foreground">bpm</div>
          </div>
        </MetricCard>

        {/* Power Card */}
        <MetricCard label="Power">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">
              Generated (kWh): 
              <span className="ml-2 text-base font-semibold text-watch-success">
                {simulation.powerGenerated.toFixed(3)}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Used (kWh): 
              <span className="ml-2 text-base font-semibold text-watch-warning">
                {simulation.powerUsed.toFixed(3)}
              </span>
            </div>
          </div>
        </MetricCard>

        {/* Time Estimate Card */}
        <MetricCard label="Estimated Time Remaining">
          <div className="text-3xl font-bold text-primary">
            {simulation.formattedTimeRemaining}
          </div>
        </MetricCard>

        {/* Baking Soda Card */}
        <MetricCard label="Baking Soda">
          <div className="text-lg font-semibold text-foreground">
            Baking Soda: {Math.round(simulation.bakingSoda)} ml
          </div>
          {simulation.bakingSoda <= 100 && (
            <div className="mt-2 text-sm font-bold text-watch-danger bg-watch-danger/10 px-3 py-2 rounded">
              WARNING: Baking soda low — refill required
            </div>
          )}
        </MetricCard>

        {/* HealthKit Placeholder */}
        <div className="mt-4 p-3 bg-secondary/50 rounded border border-border">
          <p className="text-xs text-muted-foreground italic">
            Apple Watch / HealthKit integration placeholder: Future real heart-rate integration would be implemented here using HealthKit APIs.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground pt-3">
          Last refresh: {simulation.lastRefresh}s ago
        </div>
      </div>
    </div>
  );
};

export default Index;
