import React, { useEffect, useState } from 'react';
import { supabase } from '/supabase/supabaseClient'; 
import { useTranslation } from 'react-i18next';

const AdminPreferencesPage = () => {
  const { t } = useTranslation();
  const [analytics, setAnalytics] = useState<any[]>([]); // Adjust the type as necessary

  useEffect(() => {
    const fetchAnalytics = async () => {
      const { data, error } = await supabase
        .from('dealer_quotes') // Fetch from dealer_quotes table
        .select('dealer_id, status')
        .group('dealer_id'); // Group by dealer_id to aggregate data

      if (error) {
        console.error('Error fetching dealer analytics:', error);
      } else {
        // Process the data to calculate metrics
        const dealerAnalytics = data.reduce((acc, quote) => {
          const dealerId = quote.dealer_id;
          if (!acc[dealerId]) {
            acc[dealerId] = { dealerId, dealsWon: 0, dealsLost: 0, dealsAnswered: 0 };
          }
          // Count metrics based on the status
          if (quote.status === 'accepted') {
            acc[dealerId].dealsWon += 1;
          } else if (quote.status === 'rejected') {
            acc[dealerId].dealsLost += 1;
          }
          acc[dealerId].dealsAnswered += 1; // Increment answered for all quotes
          return acc;
        }, {});

        setAnalytics(Object.values(dealerAnalytics)); // Convert to array
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div>
      <h1>{t('admin.preferences.title')}</h1>
      {/* Other preferences UI can go here */}

      <h2>{t('admin.analytics.title')}</h2>
      <table>
        <thead>
          <tr>
            <th>{t('admin.analytics.dealer')}</th>
            <th>{t('admin.analytics.dealsWon')}</th>
            <th>{t('admin.analytics.dealsLost')}</th>
            <th>{t('admin.analytics.dealsAnswered')}</th>
          </tr>
        </thead>
        <tbody>
          {analytics.map(dealer => (
            <tr key={dealer.dealerId}>
              <td>{dealer.dealerId}</td>
              <td>{dealer.dealsWon}</td>
              <td>{dealer.dealsLost}</td>
              <td>{dealer.dealsAnswered}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPreferencesPage;