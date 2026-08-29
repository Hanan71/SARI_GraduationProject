import { Sidebar } from "@/components/layout/Sidebar";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { LiveChart } from "@/components/dashboard/LiveChart";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { SimulationControl } from "@/components/dashboard/SimulationControl";
import { useLatestReading, useReadingHistory, useAlerts, useMarkAlertRead } from "@/hooks/use-sari";
import { useAuth } from "@/hooks/use-auth";
import { Zap, Activity, Thermometer, Waves, CheckCheck, Bell } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: latest, error: readingError } = useLatestReading();
  const { data: history } = useReadingHistory();
  const { data: alerts } = useAlerts();
  const { mutate: markRead } = useMarkAlertRead();

  // Derived state for quick stats
  const activeAlerts = alerts?.filter(a => !a.isRead) || [];
  const riskLevel = latest?.riskLevel || "SAFE";

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar />
      
      <main className="flex-1 lg:ml-64 p-4 lg:p-8 overflow-y-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Welcome back, <span className="text-primary">{user?.firstName || 'User'}</span>
            </h1>
            <p className="text-muted-foreground mt-1">Real-time monitoring and safety diagnostics.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end mr-4">
               <span className="text-xs text-muted-foreground">LAST UPDATED</span>
               <span className="font-mono text-sm">{latest ? format(new Date(latest.timestamp), 'HH:mm:ss') : '--:--:--'}</span>
            </div>
            <StatusBadge status={riskLevel as any} />
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard 
            title="Current Load" 
            value={latest?.current.toFixed(2) || "0.00"} 
            unit="A" 
            icon={Zap}
            status={latest?.current > 15 ? "warning" : "normal"}
            trend={latest?.current > 12 ? "up" : "neutral"}
            trendValue="0.5"
          />
          <MetricCard 
            title="Voltage" 
            value={latest?.voltage.toFixed(1) || "0.0"} 
            unit="V" 
            icon={Activity}
            status={latest?.voltage > 240 ? "critical" : "normal"}
          />
          <MetricCard 
            title="Leakage Current" 
            value={latest?.leakageCurrent.toFixed(1) || "0.0"} 
            unit="mA" 
            icon={Waves}
            status={latest?.leakageCurrent > 20 ? "critical" : latest?.leakageCurrent > 5 ? "warning" : "normal"}
            className={cn(latest?.leakageCurrent > 20 && "animate-pulse border-destructive")}
          />
          <MetricCard 
            title="Wire Temp" 
            value={latest?.temperature.toFixed(1) || "0.0"} 
            unit="°C" 
            icon={Thermometer}
            status={latest?.temperature > 70 ? "critical" : "normal"}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Chart Section */}
          <div className="lg:col-span-2 space-y-6">
            <LiveChart data={history || []} />
            <SimulationControl />
          </div>

          {/* Recent Alerts Feed */}
          <div className="bg-card rounded-xl border border-border p-6 flex flex-col h-[650px]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-lg flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Recent Hazards
              </h3>
              <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full font-bold">
                {activeAlerts.length} Active
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {activeAlerts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
                   <CheckCheck className="w-12 h-12 mb-2" />
                   <p>All systems nominal</p>
                </div>
              ) : (
                activeAlerts.map((alert) => (
                  <div key={alert.id} className={cn(
                    "p-4 rounded-lg border flex flex-col gap-2 transition-all hover:translate-x-1",
                    alert.severity === "CRITICAL" ? "bg-destructive/10 border-destructive/50" :
                    alert.severity === "HIGH" ? "bg-orange-500/10 border-orange-500/50" :
                    "bg-secondary/50 border-border"
                  )}>
                    <div className="flex justify-between items-start">
                      <span className={cn(
                        "text-xs font-bold px-2 py-0.5 rounded",
                        alert.severity === "CRITICAL" ? "bg-destructive text-white" :
                        "bg-secondary text-foreground"
                      )}>{alert.type}</span>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {format(new Date(alert.timestamp), "HH:mm:ss")}
                      </span>
                    </div>
                    <p className="text-sm font-medium">{alert.message}</p>
                    <button 
                      onClick={() => markRead(alert.id)}
                      className="self-end text-xs text-primary hover:underline mt-1"
                    >
                      Dismiss
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
