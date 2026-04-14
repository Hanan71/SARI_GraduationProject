import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { format } from 'date-fns';
import { Reading } from "@shared/schema";

interface LiveChartProps {
  data: Reading[];
  color?: string;
}

export function LiveChart({ data, color = "#06b6d4" }: LiveChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center bg-secondary/10 border border-dashed border-border rounded-xl">
        <p className="text-muted-foreground">Waiting for sensor data...</p>
      </div>
    );
  }

  // Use only last 20 points for live feel
  const chartData = data.slice(-20);

  return (
    <div className="h-[350px] w-full bg-card/50 rounded-xl border border-border/50 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Real-time Power Consumption</h3>
        <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs text-primary font-mono">LIVE FEED</span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} opacity={0.3} />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(ts) => format(new Date(ts), 'HH:mm:ss')}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            minTickGap={30}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(val) => `${val}W`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              borderColor: 'hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--foreground))'
            }}
            labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
            itemStyle={{ color: color }}
            labelFormatter={(label) => format(new Date(label), 'HH:mm:ss')}
          />
          <Area 
            type="monotone" 
            dataKey="power" 
            stroke={color} 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorValue)" 
            isAnimationActive={false} // Disable animation for smoother real-time updates
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
