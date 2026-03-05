'use client';
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getStructures } from '../actions';

export default function TableBatchForm() {
  const [structures, setStructures] = useState<{ id: number; name: string }[]>([]);
  const [name, setName] = useState('');
  const [structureId, setStructureId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function loadStructures() {
      const data = await getStructures();
      setStructures(data);
    }
    loadStructures();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !structureId) return;

    await fetch('/api/table-batch', {
      method: 'POST',
      body: JSON.stringify({ name, structureId, quantity }),
      headers: { 'Content-Type': 'application/json' },
    });

    setName('');
    setStructureId(null);
    setQuantity(1);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-end">
      <div className="flex-1 space-y-1.5">
        <Label htmlFor="name" className="text-xs text-muted-foreground">Batch Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div className="w-full sm:w-32 space-y-1.5">
        <Label htmlFor="structure" className="text-xs text-muted-foreground">Structure</Label>
        <Select value={structureId?.toString() ?? ''} onValueChange={(val) => setStructureId(Number(val))}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {structures.map((s) => (
              <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-24 space-y-1.5">
        <Label htmlFor="quantity" className="text-xs text-muted-foreground">Tables</Label>
        <Input type="number" min={1} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
      </div>

      <Button type="submit" size="sm" className="h-9 gap-1.5 w-full sm:w-auto">
        Create Batch
      </Button>
    </form>
  );
}