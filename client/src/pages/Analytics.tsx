import { Sidebar } from "@/components/layout/Sidebar";
import { useReadingHistory, useReadingStats } from "@/hooks/use-sari";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { format } from "date-fns";

export default function AnalyticsPage() {
  const { data: history } = useReadingHistory(100);
  const { data: stats } = useReadingStats();

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-display font-bold">Analytics Overview</h1>
          <p className="text-muted-foreground">Deep dive into historical power consumption and stability trends.</p>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-muted-foreground text-sm uppercase">Avg Power Usage</h3>
            <p className="text-3xl font-display font-bold mt-2">{stats?.averagePower.toFixed(0) || 0} <span className="text-sm font-sans text-muted-foreground">Watts</span></p>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-muted-foreground text-sm uppercase">Peak Current</h3>
            <p className="text-3xl font-display font-bold mt-2 text-orange-500">{stats?.peakCurrent.toFixed(1) || 0} <span className="text-sm font-sans text-muted-foreground">Amps</span></p>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="text-muted-foreground text-sm uppercase">Total Incidents</h3>
            <p className="text-3xl font-display font-bold mt-2 text-primary">{stats?.totalAlerts || 0}</p>
          </div>
        </div>

        {/* Large Chart */}
        <div className="bg-card p-6 rounded-xl border border-border h-[500px] mb-8">
          <h3 className="font-bold mb-6">Historical Performance (Last 100 Readings)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={(ts) => format(new Date(ts), 'mm:ss')} 
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                labelFormatter={(label) => format(new Date(label), 'HH:mm:ss')}
              />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="current" stroke="#f59e0b" name="Current (A)" dot={false} strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="voltage" stroke="#06b6d4" name="Voltage (V)" dot={false} strokeWidth={2} />
              <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#ef4444" name="Temp (°C)" dot={false} strokeWidth={1} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}
