'use client';
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { assignProductToStructure } from "../actions";

interface Props {
  structureId: number;
  products: { id: number; name: string }[];
}

export function AssignProductForm({ structureId, products }: Props) {
  const [productId, setProductId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

  return (
    <form action={assignProductToStructure} className="flex gap-2 items-end">
      <input type="hidden" name="structureId" value={structureId} />

      <div className="w-36">
        <Label className="text-xs text-muted-foreground">Product</Label>
        <Select value={productId?.toString() ?? ""} onValueChange={val => setProductId(Number(val))} name="productId">
          <SelectTrigger>
            <SelectValue placeholder="Select Product" />
          </SelectTrigger>
          <SelectContent>
            {products.map(p => (
              <SelectItem key={p.id} value={p.id.toString()}>{p.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-24">
        <Label className="text-xs text-muted-foreground">Quantity</Label>
        <Input type="number" name="quantity" min={1} value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
      </div>

      <Button type="submit" size="sm" className="h-9 gap-1.5">Assign</Button>
    </form>
  );
}