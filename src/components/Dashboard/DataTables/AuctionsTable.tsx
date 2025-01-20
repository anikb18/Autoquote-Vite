import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from '@/components/ui/data-table';

const auctionColumns: ColumnDef<any>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "vehicle", header: "Vehicle" },
  { accessorKey: "currentBid", header: "Current Bid" },
  { accessorKey: "endDate", header: "End Date" },
  { accessorKey: "status", header: "Status" },
];

interface AuctionsTableProps {
  data: any[];
}

export const AuctionsTable = ({ data }: AuctionsTableProps) => {
  return (
    <DataTable
      columns={auctionColumns}
      data={data}
      searchColumn="vehicle"
      searchPlaceholder="Search auctions..."
    />
  );
};