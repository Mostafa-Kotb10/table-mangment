import { prisma } from "@/lib/prisma";
import { addProduct, deleteProduct, updateProduct } from "../actions";
import { Package, Plus, Trash2, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ProductsTable from "./product-table";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { id: "asc" } });

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.quantity, 0);
  const lowStock = products.filter((p) => p.quantity < 10).length;

  return (
<div className="min-h-screen mt-20 bg-background p-4 sm:p-8">
  <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">

    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="p-2 rounded-lg bg-primary/10">
        <Package className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
          Product Inventory
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your products and stock levels
        </p>
      </div>
    </div>

    {/* Stats Row */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{totalProducts}</div>
          <p className="text-xs text-muted-foreground mt-1">Total Products</p>
        </CardContent>
      </Card>
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{totalStock}</div>
          <p className="text-xs text-muted-foreground mt-1">Units in Stock</p>
        </CardContent>
      </Card>
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-amber-500">{lowStock}</div>
          <p className="text-xs text-muted-foreground mt-1">Low Stock Items</p>
        </CardContent>
      </Card>
    </div>

    {/* Add Product Form */}
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-medium">Add New Product</CardTitle>
        <CardDescription>
          Enter a product name and initial quantity to add it to inventory.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={addProduct} className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1 space-y-1.5 w-full sm:w-auto">
            <Label htmlFor="name" className="text-xs text-muted-foreground">
              Product Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Wireless Keyboard"
              className="h-9 w-full"
              required
            />
          </div>
          <div className="w-full sm:w-32 space-y-1.5">
            <Label htmlFor="quantity" className="text-xs text-muted-foreground">
              Quantity
            </Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              placeholder="0"
              min="0"
              className="h-9 w-full"
            />
          </div>
          <Button type="submit" size="sm" className="h-9 gap-1.5 w-full sm:w-auto">
            <Plus className="h-3.5 w-3.5" />
            Add Product
          </Button>
        </form>
      </CardContent>
    </Card>

    {/* Products Table */}
    <Card className="border-border/50">
      <CardHeader className="pb-0 flex flex-col sm:flex-row sm:justify-between gap-2">
        <CardTitle className="text-base font-medium">All Products</CardTitle>
        <Badge variant="secondary" className="font-normal">
          {totalProducts} items
        </Badge>
      </CardHeader>
      <CardContent className="pt-4 overflow-x-auto">
       <ProductsTable products={products} />
      </CardContent>
    </Card>
  </div>
</div>
  );
}