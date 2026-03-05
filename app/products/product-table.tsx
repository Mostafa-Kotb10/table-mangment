'use client';
import { addProduct, updateProduct, deleteProduct } from "../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw, Trash2 } from "lucide-react";
import { Product } from "@/app/generated/prisma/client";
import { Badge } from "@/components/ui/badge";

interface Props {
  products: Product[];
}

export default function ProductsTable({ products }: Props) {
  return (
    <Table className="min-w-[500px]">
      <TableHeader>
        <TableRow className="hover:bg-transparent border-border/50">
          <TableHead className="text-xs font-medium w-[40%]">Product</TableHead>
          <TableHead className="text-xs font-medium">Stock Status</TableHead>
          <TableHead className="text-xs font-medium w-[240px]">Update Quantity</TableHead>
          <TableHead className="text-xs font-medium text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((p) => {
          const isLow = p.quantity < 10;
          const isOut = p.quantity === 0;

          return (
            <TableRow key={p.id} className="border-border/40 group">
              {/* Name */}
              <TableCell className="font-medium text-sm py-3">{p.name}</TableCell>

              {/* Stock Badge */}
              <TableCell className="py-3">
                {isOut ? (
                  <Badge variant="destructive" className="font-normal text-xs">
                    Out of stock
                  </Badge>
                ) : isLow ? (
                  <Badge variant="outline" className="font-normal text-xs border-amber-400/50 text-amber-600 dark:text-amber-400">
                    Low · {p.quantity} left
                  </Badge>
                ) : (
                  <Badge variant="outline" className="font-normal text-xs border-emerald-400/50 text-emerald-600 dark:text-emerald-400">
                    In stock · {p.quantity}
                  </Badge>
                )}
              </TableCell>

              {/* Update form */}
              <TableCell className="py-3">
                <form
                  action={updateProduct}
                  className="flex flex-col sm:flex-row gap-2 items-start sm:items-center"
                >
                  {/* Hidden input for product ID */}
                  <input type="hidden" name="id" value={p.id} />
                  <Input
                    name="quantity"
                    type="number"
                    defaultValue={p.quantity}
                    min="0"
                    className="h-8 w-full sm:w-24 text-sm"
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1.5 w-full sm:w-auto text-xs"
                  >
                    <RefreshCw className="h-3 w-3" /> Update
                  </Button>
                </form>
              </TableCell>

              {/* Delete form */}
              <TableCell className="py-3 text-right">
                <form action={deleteProduct}>
                  <input type="hidden" name="id" value={p.id} />
                  <Button
                    type="submit"
                    variant="destructive"
                    size="sm"
                    className="h-8 w-8 p-0 text-white hover:bg-red-500"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span className="sr-only">Delete {p.name}</span>
                  </Button>
                </form>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}