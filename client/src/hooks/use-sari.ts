import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type ReadingResponse, type AlertResponse, type SimulationConfig } from "@shared/schema";

// Readings Hooks
export function useLatestReading() {
  return useQuery({
    queryKey: [api.readings.latest.path],
    queryFn: async () => {
      const res = await fetch(api.readings.latest.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch latest reading");
      return api.readings.latest.responses[200].parse(await res.json());
    },
    refetchInterval: 1000, // Real-time update every second
  });
}

export function useReadingHistory(limit: number = 50) {
  return useQuery({
    queryKey: [api.readings.history.path, limit],
    queryFn: async () => {
      const url = buildUrl(api.readings.history.path) + `?limit=${limit}`;
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch reading history");
      return api.readings.history.responses[200].parse(await res.json());
    },
    refetchInterval: 5000, // Update every 5s for charts
  });
}

export function useReadingStats() {
  return useQuery({
    queryKey: [api.readings.stats.path],
    queryFn: async () => {
      const res = await fetch(api.readings.stats.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch stats");
      return api.readings.stats.responses[200].parse(await res.json());
    },
    refetchInterval: 5000,
  });
}

// Alerts Hooks
export function useAlerts() {
  return useQuery({
    queryKey: [api.alerts.list.path],
    queryFn: async () => {
      const res = await fetch(api.alerts.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch alerts");
      return api.alerts.list.responses[200].parse(await res.json());
    },
    refetchInterval: 2000, // Check for new alerts frequently
  });
}

export function useMarkAlertRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.alerts.markRead.path, { id });
      const res = await fetch(url, { 
        method: api.alerts.markRead.method,
        credentials: "include" 
      });
      if (!res.ok) throw new Error("Failed to mark alert as read");
      return api.alerts.markRead.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.alerts.list.path] });
    },
  });
}

// Simulation Hooks
export function useSimulationStatus() {
  return useQuery({
    queryKey: [api.simulation.status.path],
    queryFn: async () => {
      const res = await fetch(api.simulation.status.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch simulation status");
      return api.simulation.status.responses[200].parse(await res.json());
    },
    refetchInterval: 2000,
  });
}

export function useToggleSimulation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (config: { isRunning: boolean; scenario?: "NORMAL" | "LEAKAGE_FAULT" | "OVERLOAD" | "OVERHEATING" }) => {
      const res = await fetch(api.simulation.toggle.path, {
        method: api.simulation.toggle.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to toggle simulation");
      return api.simulation.toggle.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.simulation.status.path] });
    },
  });
}
