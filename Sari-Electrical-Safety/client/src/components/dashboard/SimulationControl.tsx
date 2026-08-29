import { useState } from "react";
import { useSimulationStatus, useToggleSimulation } from "@/hooks/use-sari";
import { cn } from "@/lib/utils";
import { Play, Square, Activity, AlertOctagon, Zap, ThermometerSun } from "lucide-react";

export function SimulationControl() {
  const { data: status } = useSimulationStatus();
  const { mutate: toggle, isPending } = useToggleSimulation();
  const [selectedScenario, setSelectedScenario] = useState<string>("NORMAL");

  const scenarios = [
    { id: "NORMAL", label: "Normal Operation", icon: Activity, color: "text-emerald-500" },
    { id: "LEAKAGE_FAULT", label: "Leakage Fault", icon: AlertOctagon, color: "text-amber-500" },
    { id: "OVERLOAD", label: "Circuit Overload", icon: Zap, color: "text-orange-500" },
    { id: "OVERHEATING", label: "Wire Overheating", icon: ThermometerSun, color: "text-rose-500" },
  ];

  const handleStart = () => {
    toggle({ isRunning: true, scenario: selectedScenario as any });
  };

  const handleStop = () => {
    toggle({ isRunning: false });
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-display font-bold">AI Simulation Controller</h3>
          <p className="text-sm text-muted-foreground">Inject synthetic data patterns to test AI detection.</p>
        </div>
        <div className={cn(
          "px-3 py-1 rounded-full text-xs font-mono font-bold border",
          status?.isRunning 
            ? "bg-primary/20 text-primary border-primary/30 animate-pulse" 
            : "bg-muted text-muted-foreground border-border"
        )}>
          {status?.isRunning ? "RUNNING" : "STOPPED"}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => setSelectedScenario(scenario.id)}
            disabled={status?.isRunning}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 gap-3",
              selectedScenario === scenario.id
                ? "border-primary bg-primary/5 shadow-md scale-[1.02]"
                : "border-border hover:border-border/80 bg-secondary/30",
              status?.isRunning && selectedScenario !== scenario.id && "opacity-50 grayscale cursor-not-allowed"
            )}
          >
            <scenario.icon className={cn("w-8 h-8", scenario.color)} />
            <span className="text-xs font-bold text-foreground">{scenario.label}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleStart}
          disabled={status?.isRunning || isPending}
          className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-900/20"
        >
          <Play className="w-4 h-4 fill-current" />
          Start Simulation
        </button>
        <button
          onClick={handleStop}
          disabled={!status?.isRunning || isPending}
          className="flex-1 flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-500 text-white py-3 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-rose-900/20"
        >
          <Square className="w-4 h-4 fill-current" />
          Stop Simulation
        </button>
      </div>
    </div>
  );
}
