import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  status?: "normal" | "warning" | "critical";
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  trend, 
  trendValue,
  status = "normal",
  className 
}: MetricCardProps) {
  
  const statusColors = {
    normal: "border-border",
    warning: "border-warning/50 bg-warning/5 shadow-[0_0_20px_-10px_hsla(var(--warning),0.2)]",
    critical: "border-destructive/50 bg-destructive/5 shadow-[0_0_20px_-10px_hsla(var(--destructive),0.2)] animate-pulse-border",
  };

  const iconColors = {
    normal: "text-primary bg-primary/10",
    warning: "text-warning bg-warning/10",
    critical: "text-destructive bg-destructive/10",
  };

  return (
    <div className={cn(
      "bg-card rounded-xl border p-5 transition-all duration-300 hover:border-primary/30",
      statusColors[status],
      className
    )}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</h3>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-display font-bold text-foreground tracking-tight">{value}</span>
            <span className="text-sm font-medium text-muted-foreground">{unit}</span>
          </div>
        </div>
        <div className={cn("p-2.5 rounded-lg", iconColors[status])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      
      {trend && trendValue && (
        <div className="flex items-center gap-2 text-xs font-medium">
          <span className={cn(
            trend === "up" ? "text-emerald-500" : trend === "down" ? "text-rose-500" : "text-muted-foreground"
          )}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "−"} {trendValue}
          </span>
          <span className="text-muted-foreground/60">vs last hour</span>
        </div>
      )}
    </div>
  );
}
