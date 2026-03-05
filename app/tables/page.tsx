import { prisma } from "@/lib/prisma";
import TableBatchForm from "./batch-table-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { deleteTableBatch } from "../actions";

export default async function TableBatchesPage() {
  // Fetch all table batches with structure info
  const batches = await prisma.table.findMany({
    include: { structure: true },
    orderBy: { createdAt: "desc" },
  });

  const totalBatches = batches.length;
  const totalTables = batches.reduce((sum, b) => sum + b.quantity, 0);

  return (
    <div className="min-h-screen mt-20 bg-background p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <span className="text-primary font-bold">🏷️</span>
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
            Table Batches
          </h1>
          <p className="text-sm text-muted-foreground">
            Create and manage batches of tables by structure
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{totalBatches}</div>
            <p className="text-xs text-muted-foreground mt-1">Total Batches</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{totalTables}</div>
            <p className="text-xs text-muted-foreground mt-1">Total Tables</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Table Batch Form */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-medium">Create Table Batch</CardTitle>
          <CardDescription>
            Enter a batch name, select a structure, and specify the number of tables.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TableBatchForm />
        </CardContent>
      </Card>

      {/* Table Batches List */}
      <Card className="border-border/50">
        <CardHeader className="pb-0">
          <CardTitle className="text-base font-medium">All Batches</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 overflow-x-auto">
          <Table className="min-w-[500px]">
            <TableHeader>
              <TableRow>
                <TableHead>Structure</TableHead>
                <TableHead>Batch Name</TableHead>
                <TableHead className="text-right">Tables Count</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batches.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium text-sm py-3">{b.structure.name}</TableCell>
                  <TableCell className="py-3">{b.name}</TableCell>
                  <TableCell className="py-3 text-right">{b.quantity}</TableCell>
                  <TableCell className="py-3 text-right">
                    <form action={deleteTableBatch}>
                      <input type="hidden" name="id" value={b.id} />
                      <Button type="submit" variant="destructive" size="sm">
                        Delete
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}