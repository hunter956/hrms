import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type LaborDoc = {
  id: string;
  title: string;
  category: string;
  fileName?: string;
  effectiveFrom?: string;
};

const categories = ["Shops & Establishments", "Factories Act", "Payment of Wages", "Maternity Benefit", "POSH", "Other"];

export default function LaborDocs() {
  const [docs, setDocs] = useState<LaborDoc[]>([]);
  const [form, setForm] = useState({ title: "", category: categories[0], effectiveFrom: "", file: undefined as File | undefined });

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;
    setDocs((prev) => [
      { id: crypto.randomUUID(), title: form.title, category: form.category, fileName: form.file?.name, effectiveFrom: form.effectiveFrom },
      ...prev,
    ]);
    setForm({ title: "", category: categories[0], effectiveFrom: "", file: undefined });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Maintain Labor Law Documentation</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={add}>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select id="category" className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="effectiveFrom">Effective From</Label>
              <Input id="effectiveFrom" type="date" value={form.effectiveFrom} onChange={(e) => setForm((f) => ({ ...f, effectiveFrom: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file">Upload Document (PDF/Image)</Label>
              <Input id="file" type="file" accept="image/*,.pdf" onChange={(e) => setForm((f) => ({ ...f, file: e.target.files?.[0] }))} />
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button type="reset" variant="outline" onClick={() => setForm({ title: "", category: categories[0], effectiveFrom: "", file: undefined })}>Clear</Button>
              <Button type="submit"  className="px-6 py-3 h-auto">Add Document</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Repository</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Effective From</TableHead>
                  <TableHead>File</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {docs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">No documents</TableCell>
                  </TableRow>
                )}
                {docs.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell>{d.title}</TableCell>
                    <TableCell>{d.category}</TableCell>
                    <TableCell>{d.effectiveFrom || "—"}</TableCell>
                    <TableCell>{d.fileName || "—"}</TableCell>
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


