import { cn } from "@/lib/utils";
import { ShieldCheck, AlertTriangle, ZapOff, Flame } from "lucide-react";

interface StatusBadgeProps {
  status: "SAFE" | "MODERATE" | "HIGH" | "CRITICAL";
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = {
    SAFE: {
      label: "SYSTEM SECURE",
      icon: ShieldCheck,
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
      glow: "shadow-[0_0_15px_-3px_hsla(161,94%,30%,0.3)]"
    },
    MODERATE: {
      label: "CAUTION ADVISED",
      icon: AlertTriangle,
      color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
      glow: "shadow-[0_0_15px_-3px_hsla(38,92%,50%,0.3)]"
    },
    HIGH: {
      label: "RISK DETECTED",
      icon: ZapOff,
      color: "text-orange-500 border-orange-500/30 bg-orange-500/10",
      glow: "shadow-[0_0_20px_-3px_hsla(24,94%,50%,0.4)] animate-pulse"
    },
    CRITICAL: {
      label: "CRITICAL HAZARD",
      icon: Flame,
      color: "text-rose-500 border-rose-500/30 bg-rose-500/10",
      glow: "shadow-[0_0_30px_-5px_hsla(0,84%,60%,0.5)] animate-pulse"
    }
  };

  const { label, icon: Icon, color, glow } = config[status] || config.SAFE;

  return (
    <div className={cn(
      "flex items-center gap-3 px-4 py-2 rounded-full border backdrop-blur-sm transition-all duration-500",
      color,
      glow,
      className
    )}>
      <Icon className="w-5 h-5" />
      <span className="font-display font-bold tracking-wider text-sm">{label}</span>
    </div>
  );
}
