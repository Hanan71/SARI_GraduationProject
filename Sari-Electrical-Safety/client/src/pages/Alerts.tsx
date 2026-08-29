import { Sidebar } from "@/components/layout/Sidebar";
import { useAlerts, useMarkAlertRead } from "@/hooks/use-sari";
import { format } from "date-fns";
import { AlertTriangle, CheckCircle2, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function AlertsPage() {
  const { data: alerts, isLoading } = useAlerts();
  const { mutate: markRead } = useMarkAlertRead();
  const [filter, setFilter] = useState<"ALL" | "UNREAD" | "CRITICAL">("ALL");

  if (isLoading) return <div className="min-h-screen bg-background text-foreground flex items-center justify-center">Loading...</div>;

  const filteredAlerts = alerts?.filter(a => {
    if (filter === "UNREAD") return !a.isRead;
    if (filter === "CRITICAL") return a.severity === "CRITICAL" || a.severity === "HIGH";
    return true;
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold">System Alerts Log</h1>
              <p className="text-muted-foreground">Historical record of all detected anomalies.</p>
            </div>
            <div className="flex gap-2 bg-card border border-border p-1 rounded-lg">
              {["ALL", "UNREAD", "CRITICAL"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </header>

          <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/30 text-xs font-mono text-muted-foreground uppercase tracking-wider">
              <div className="col-span-2">Severity</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-5">Message</div>
              <div className="col-span-2">Time</div>
              <div className="col-span-1 text-right">Action</div>
            </div>

            <div className="divide-y divide-border">
              {filteredAlerts?.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>No alerts matching current filter.</p>
                </div>
              ) : (
                filteredAlerts?.map((alert) => (
                  <div key={alert.id} className={cn(
                    "grid grid-cols-12 gap-4 p-4 items-center hover:bg-secondary/20 transition-colors",
                    !alert.isRead && "bg-primary/5"
                  )}>
                    <div className="col-span-2">
                       <span className={cn(
                         "px-2 py-1 rounded text-xs font-bold inline-flex items-center gap-1",
                         alert.severity === "CRITICAL" ? "bg-destructive/20 text-destructive" :
                         alert.severity === "HIGH" ? "bg-orange-500/20 text-orange-500" :
                         "bg-emerald-500/20 text-emerald-500"
                       )}>
                         {alert.severity === "CRITICAL" && <AlertTriangle className="w-3 h-3" />}
                         {alert.severity}
                       </span>
                    </div>
                    <div className="col-span-2 text-sm font-medium">{alert.type}</div>
                    <div className="col-span-5 text-sm text-muted-foreground">{alert.message}</div>
                    <div className="col-span-2 text-xs font-mono text-muted-foreground">
                      {format(new Date(alert.timestamp), "MMM dd, HH:mm:ss")}
                    </div>
                    <div className="col-span-1 text-right">
                      {!alert.isRead && (
                        <button
                          onClick={() => markRead(alert.id)}
                          className="text-xs text-primary hover:underline"
                        >
                          Mark Read
                        </button>
                      )}
                    </div>
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
