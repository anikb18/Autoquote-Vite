import React, { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/AuthProvider';
import { supabase } from '@/lib/supabase';
import { DataTable } from '@/components/ui/data-table';

export function UserDashboardContent() {
  const { user } = useAuth();
  const [userQuotes, setUserQuotes] = useState<any[]>([]);
  const [userVehicles, setUserVehicles] = useState<any[]>([]);
  const [loadingQuotes, setLoadingQuotes] = useState(true);
  const [loadingVehicles, setLoadingVehicles] = useState(true);

  useEffect(() => {
    const fetchUserQuotes = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('quotes')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) {
          console.error('Error fetching user quotes:', error);
        } else {
          setUserQuotes(data || []);
        }
        setLoadingQuotes(false);
      }
    };

    const fetchUserVehicles = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('vehicles')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) {
          console.error('Error fetching user vehicles:', error);
        } else {
          setUserVehicles(data || []);
        }
        setLoadingVehicles(false);
      }
    };

    fetchUserQuotes();
    fetchUserVehicles();
  }, [user]);

  if (loadingQuotes || loadingVehicles) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Latest Quotes</h2>
        <DataTable 
          columns={[
            { accessorKey: "id", header: "Quote ID" },
            { accessorKey: "vehicle", header: "Vehicle" },
            { accessorKey: "status", header: "Status" },
            { accessorKey: "created_at", header: "Date Created" },
          ]}
          data={userQuotes}
          searchColumn="vehicle"
          searchPlaceholder="Search quotes..."
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Vehicles</h2>
        <DataTable 
          columns={[
            { accessorKey: "id", header: "Vehicle ID" },
            { accessorKey: "make", header: "Make" },
            { accessorKey: "model", header: "Model" },
            { accessorKey: "year", header: "Year" },
            { accessorKey: "created_at", header: "Date Added" },
          ]}
          data={userVehicles}
          searchColumn="make"
          searchPlaceholder="Search vehicles..."
        />
      </div>
    </div>
  );
}