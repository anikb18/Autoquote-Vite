import { useTranslation } from 'react-i18next';
import { useViewMode } from '@/contexts/ViewModeContext';
import { useAuth } from '@/features/auth/AuthProvider';
import { useEffect, useState } from 'react';
import { mockQuotes, mockAuctions } from '@/mockData';
import { DataChart } from '@/components/ui/data-chart';
import { DataTable } from '@/components/ui/data-table';
import { QuoteRequestForm } from '@/components/QuoteRequestForm';
import { ColumnDef } from "@tanstack/react-table";

const MOCK_CHART_DATA = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split('T')[0],
    value: Math.floor(Math.random() * 100)
  };
});

const quoteColumns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "vehicle",
    header: "Vehicle",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "price",
    header: "Price",
  }
];

const auctionColumns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "vehicle",
    header: "Vehicle",
  },
  {
    accessorKey: "currentBid",
    header: "Current Bid",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
  },
  {
    accessorKey: "status",
    header: "Status",
  }
];

// Define the isMockUser function
const isMockUser = (userEmail: string) => userEmail === "anikbeauchemin18@gmail.com";

export function DashboardContent() {
  const { t } = useTranslation();
  const { viewMode } = useViewMode();
  const { user } = useAuth();
  const [chartData] = useState<any[]>(MOCK_CHART_DATA);
  
  const [latestQuotes, setLatestQuotes] = useState<any[]>([]);
  const [latestAuctions, setLatestAuctions] = useState<any[]>([]);
  const [loadingQuotes, setLoadingQuotes] = useState(true);
  const [loadingAuctions, setLoadingAuctions] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const quotes = isMockUser(user.email) ? mockQuotes : await fetchRealQuotes();
        setLatestQuotes(quotes || []);
      } catch (error) {
        console.error('Error fetching quotes:', error);
        setLatestQuotes([]);
      } finally {
        setLoadingQuotes(false);
      }
    };

    const fetchAuctions = async () => {
      try {
        const auctions = isMockUser(user.email) ? mockAuctions : await fetchRealAuctions();
        setLatestAuctions(auctions || []);
      } catch (error) {
        console.error('Error fetching auctions:', error);
        setLatestAuctions([]);
      } finally {
        setLoadingAuctions(false);
      }
    };

    fetchQuotes();
    fetchAuctions();
  }, [user.email]);

  if (loadingQuotes || loadingAuctions) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Request a Quote</h2>
        <QuoteRequestForm />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Latest Quotes</h2>
        <DataTable 
          columns={quoteColumns} 
          data={latestQuotes}
          searchColumn="vehicle"
          searchPlaceholder="Search quotes..."
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Latest Auctions</h2>
        <DataTable 
          columns={auctionColumns} 
          data={latestAuctions}
          searchColumn="vehicle"
          searchPlaceholder="Search auctions..."
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Quote Status</h2>
        <DataChart data={chartData} />
      </div>
    </div>
  );
}