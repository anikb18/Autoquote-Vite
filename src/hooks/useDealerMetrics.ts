import { useEffect, useState } from 'react';

export interface DealerMetrics {
  totalInventory: number;
  activeLeads: number;
  newNotifications: number;
  conversionRate: number;
}

const POLLING_INTERVAL = 5000; // Poll every 5 seconds

export function useDealerMetrics(dealerId: string) {
  const [metrics, setMetrics] = useState<DealerMetrics>({
    totalInventory: 0,
    activeLeads: 0,
    newNotifications: 0,
    conversionRate: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/dealer/metrics');
        const data = await response.json();
        if (data.metrics) {
          setMetrics({
            totalInventory: data.metrics.totalInventory,
            activeLeads: data.metrics.activeLeads,
            newNotifications: data.metrics.newNotifications,
            conversionRate: Number(data.metrics.conversionRate),
          });
        }
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
      }
    };

    // Fetch immediately
    fetchMetrics();

    // Set up polling
    const intervalId = setInterval(fetchMetrics, POLLING_INTERVAL);

    // Cleanup
    return () => {
      clearInterval(intervalId);
    };
  }, [dealerId]);

  return metrics;
}
