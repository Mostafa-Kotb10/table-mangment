import { prisma } from "@/lib/prisma";
import { AddStructureForm, DeleteStructureButton } from "./struct-tables";
import { AssignProductForm } from "./assign-prosucts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

export default async function StructuresPage() {
  const structures = await prisma.structure.findMany({
    include: {
      tables: true,
      products: { include: { product: true } },
    },
    orderBy: { id: "asc" },
  });

  const products = await prisma.product.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="min-h-screen mt-20 bg-background p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">🏗️</div>
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Structures</h1>
          <p className="text-sm text-muted-foreground">Manage structures and assign products</p>
        </div>
      </div>

      {/* Create Structure */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle>Create Structure</CardTitle>
          <CardDescription>Enter a new structure name</CardDescription>
        </CardHeader>
        <CardContent>
          <AddStructureForm />
        </CardContent>
      </Card>

      {/* Structures Table */}
      <Card className="border-border/50">
        <CardHeader className="pb-0">
          <CardTitle>All Structures</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 overflow-x-auto">
          <Table className="min-w-[500px]">
            <TableHeader>
              <TableRow>
                <TableHead>Structure Name</TableHead>
                <TableHead>Tables Count</TableHead>
                <TableHead>Products</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {structures.map(s => (
                <TableRow key={s.id}>
                  <TableCell className="py-3 font-medium">{s.name}</TableCell>
                  <TableCell className="py-3">{s.tables.length}</TableCell>
                  <TableCell className="py-3 space-y-1">
                    {s.products.map(ps => (
                      <div key={ps.id}>{ps.product.name} · {ps.quantity}</div>
                    ))}
                    <AssignProductForm structureId={s.id} products={products} />
                  </TableCell>
                  <TableCell className="py-3 text-right">
                    <DeleteStructureButton structureId={s.id} />
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