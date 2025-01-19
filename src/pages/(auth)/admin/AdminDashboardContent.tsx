import React from 'react';
import { DataTable } from '@/components/ui/data-table';


export function AdminDashboardContent({ analytics }) {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <DataTable 
        columns={[
          { accessorKey: "dealerId", header: "Dealer ID" },
          { accessorKey: "dealsWon", header: "Deals Won" },
          { accessorKey: "dealsLost", header: "Deals Lost" },
          { accessorKey: "dealsAnswered", header: "Deals Answered" },
        ]}
        data={analytics}
        searchColumn="dealerId"
        searchPlaceholder="Search dealers..."
      />
    </div>
  );
}