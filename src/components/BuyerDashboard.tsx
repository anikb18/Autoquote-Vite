// components/BuyerDashboard.tsx
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/features/auth/AuthProvider";
import { fetchBuyerQuotesWithDetails } from "@/lib/supabase-utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import ChatInterface from "./ChatInterface";

const BuyerDashboard = () => {
  const { user } = useAuth();

  const { data: quotes, isLoading } = useQuery({
    queryKey: ['buyer-quotes', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');
      return fetchBuyerQuotesWithDetails(user.id);
    },
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Quote Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {quotes?.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No quote requests yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Car Details</TableHead>
                  <TableHead>Trade-In</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Dealer Responses</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes?.map((quote) => (
                  <QuoteRow key={quote.id} quote={quote} />
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Separate component for quote rows to improve readability
const QuoteRow = ({ quote }) => {
  return (
    <>
      <TableRow>
        <TableCell>
          <pre className="text-sm">
            {JSON.stringify(quote.car_details, null, 2)}
          </pre>
        </TableCell>
        <TableCell>{quote.has_trade_in ? "Yes" : "No"}</TableCell>
        <TableCell>
          <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(quote.status)}`}>
            {quote.status}
          </span>
        </TableCell>
        <TableCell>
          {quote.dealer_quotes?.length || 0} responses
        </TableCell>
      </TableRow>
      {quote.dealer_quotes?.some(dq => dq.is_accepted) && (
        <TableRow>
          <TableCell colSpan={4} className="p-4">
            <ChatInterface 
              quoteId={quote.id} 
              dealerId={quote.dealer_quotes.find(dq => dq.is_accepted)?.dealer_id}
            />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

// Utility function for status colors
const getStatusColor = (status: string) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800',
  };
  return colors[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
};

export default BuyerDashboard;