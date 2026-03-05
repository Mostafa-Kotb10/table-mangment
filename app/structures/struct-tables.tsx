'use client';
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createStructure, deleteStructure } from "../actions";

interface Props {
  structureId?: number;
  structureName?: string;
}

export function AddStructureForm() {
  return (
    <form action={createStructure} className="flex flex-col sm:flex-row gap-3 items-end">
      <div className="flex-1 space-y-1.5">
        <Label htmlFor="name" className="text-xs text-muted-foreground">Structure Name</Label>
        <Input id="name" name="name" required />
      </div>
      <Button type="submit" size="sm" className="h-9 gap-1.5 w-full sm:w-auto">
        Add Structure
      </Button>
    </form>
  );
}

export function DeleteStructureButton({ structureId }: { structureId: number }) {
  return (
    <form action={deleteStructure}>
      <input type="hidden" name="id" value={structureId} />
      <Button type="submit" size="sm" variant="destructive" className="h-8 w-8 p-0">
        🗑️
        <span className="sr-only">Delete structure</span>
      </Button>
    </form>
  );
}