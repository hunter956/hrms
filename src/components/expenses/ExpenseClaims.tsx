import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type ExpenseClaim = {
  id: string;
  date: string;
  category: string;
  amount: number;
  description: string;
  receiptFileName?: string;
  status: "Submitted" | "Approved" | "Rejected";
};

const categories = [
  "Travel",
  "Meals",
  "Accommodation",
  "Supplies",
  "Other",
];

export default function ExpenseClaims() {
  const [form, setForm] = useState({
    date: "",
    category: "Travel",
    amount: "",
    description: "",
    receipt: undefined as File | undefined,
  });
  const [claims, setClaims] = useState<ExpenseClaim[]>([]);

  const totalSubmitted = useMemo(() =>
    claims.reduce((sum, c) => sum + (isNaN(c.amount) ? 0 : c.amount), 0),
    [claims]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNumber = Number(form.amount);
    if (!form.date || !form.category || !amountNumber) return;
    const newClaim: ExpenseClaim = {
      id: crypto.randomUUID(),
      date: form.date,
      category: form.category,
      amount: amountNumber,
      description: form.description,
      receiptFileName: form.receipt?.name,
      status: "Submitted",
    };
    setClaims((prev) => [newClaim, ...prev]);
    setForm({ date: "", category: "Travel", amount: "", description: "", receipt: undefined });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Submit Expense Claim</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.amount}
                  onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="receipt">Receipt (PDF/Image)</Label>
                <Input
                  id="receipt"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setForm((f) => ({ ...f, receipt: e.target.files?.[0] }))}
                />
                {form.receipt && (
                  <div className="text-xs text-muted-foreground">Selected: {form.receipt.name}</div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Add any details for this expense"
              />
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button type="reset" variant="outline" onClick={() => setForm({ date: "", category: "Travel", amount: "", description: "", receipt: undefined })}>Clear</Button>
              <Button type="submit">Submit Claim</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Claims</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground mb-3">Total Submitted: ₹{totalSubmitted.toFixed(2)}</div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Receipt</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {claims.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">No claims yet</TableCell>
                  </TableRow>
                )}
                {claims.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.date}</TableCell>
                    <TableCell>{c.category}</TableCell>
                    <TableCell className="text-right">₹{c.amount.toFixed(2)}</TableCell>
                    <TableCell className="max-w-[280px] truncate" title={c.description}>{c.description || "—"}</TableCell>
                    <TableCell>{c.receiptFileName ? c.receiptFileName : "—"}</TableCell>
                    <TableCell>{c.status}</TableCell>
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


