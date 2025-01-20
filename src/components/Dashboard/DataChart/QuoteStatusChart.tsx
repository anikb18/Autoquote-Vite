import { DataChart } from '@/components/ui/data-chart';

interface QuoteStatusChartProps {
  data: any[];
}

export const QuoteStatusChart = ({ data }: QuoteStatusChartProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Quote Status</h2>
      <DataChart data={data} />
    </div>
  );
};