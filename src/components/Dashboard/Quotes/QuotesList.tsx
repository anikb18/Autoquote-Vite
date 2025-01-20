// src/components/QuotesList.tsx
'use client';

interface Quote {
  id: string;
  car_details: any;
  status: string;
  created_at: string;
}

interface QuotesListProps {
  quotes: Quote[];
}

export function QuotesList({ quotes }: QuotesListProps) {
  if (!quotes?.length) {
    return (
      <div className="mt-6 text-center text-gray-500">
        {t('dealer.quotes.empty')}
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-hidden bg-white shadow sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {quotes.map((quote) => (
          <li key={quote.id} className="px-4 py-4 hover:bg-gray-50 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="truncate">
                <p className="text-sm font-medium text-[#003139]">
                  {quote.car_details.make} {quote.car_details.model}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(quote.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="ml-2 flex flex-shrink-0">
                <span className={`inline-flex rounded-full px-2 text-xs font-semibold ${
                  quote.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  quote.status === 'accepted' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {quote.status}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
