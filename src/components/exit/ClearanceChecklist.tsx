import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type ChecklistItem = {
  id: string;
  employee: string;
  itAssets: boolean;
  documents: boolean;
  duesCleared: boolean;
  remarks?: string;
};

export default function ClearanceChecklist() {
  const [form, setForm] = useState({ employee: "", itAssets: false, documents: false, duesCleared: false, remarks: "" });
  const [items, setItems] = useState<ChecklistItem[]>([]);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.employee) return;
    setItems((prev) => [
      { id: crypto.randomUUID(), employee: form.employee, itAssets: form.itAssets, documents: form.documents, duesCleared: form.duesCleared, remarks: form.remarks },
      ...prev,
    ]);
    setForm({ employee: "", itAssets: false, documents: false, duesCleared: false, remarks: "" });
  };

  const toggle = (id: string, key: keyof Pick<ChecklistItem, "itAssets" | "documents" | "duesCleared">) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [key]: !i[key] } : i)) as ChecklistItem[]);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Clearance Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={add}>
            <div className="space-y-2">
              <Label htmlFor="employee">Employee</Label>
              <Input id="employee" value={form.employee} onChange={(e) => setForm((f) => ({ ...f, employee: e.target.value }))} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.itAssets} onChange={(e) => setForm((f) => ({ ...f, itAssets: e.target.checked }))} /> IT Assets
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.documents} onChange={(e) => setForm((f) => ({ ...f, documents: e.target.checked }))} /> Documents
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.duesCleared} onChange={(e) => setForm((f) => ({ ...f, duesCleared: e.target.checked }))} /> Dues Cleared
              </label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Input id="remarks" value={form.remarks} onChange={(e) => setForm((f) => ({ ...f, remarks: e.target.value }))} />
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button type="reset" variant="outline" onClick={() => setForm({ employee: "", itAssets: false, documents: false, duesCleared: false, remarks: "" })}>Clear</Button>
              <Button type="submit"  className="px-6 py-3 h-auto">Add</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Employee Clearances</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>IT Assets</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Dues</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">No records</TableCell>
                  </TableRow>
                )}
                {items.map((i) => (
                  <TableRow key={i.id}>
                    <TableCell>{i.employee}</TableCell>
                    <TableCell>
                      <input type="checkbox" checked={i.itAssets} onChange={() => toggle(i.id, "itAssets")} />
                    </TableCell>
                    <TableCell>
                      <input type="checkbox" checked={i.documents} onChange={() => toggle(i.id, "documents")} />
                    </TableCell>
                    <TableCell>
                      <input type="checkbox" checked={i.duesCleared} onChange={() => toggle(i.id, "duesCleared")} />
                    </TableCell>
                    <TableCell className="max-w-[260px] truncate" title={i.remarks}>{i.remarks || "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


