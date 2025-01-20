import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from '@/components/ui/data-table';

const quoteColumns: ColumnDef<any>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "vehicle", header: "Vehicle" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "price", header: "Price" },
];

interface QuotesTableProps {
  data: any[];
}

export const QuotesTable = ({ data }: QuotesTableProps) => {
  return (
    <DataTable
      columns={quoteColumns}
      data={data}
      searchColumn="vehicle"
      searchPlaceholder="Search quotes..."
    />
  );
};