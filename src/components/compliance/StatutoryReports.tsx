import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type GeneratedReport = {
  id: string;
  type: string;
  period: string; // YYYY-MM
  createdAt: string; // ISO date
  status: "Draft" | "Finalized";
};

const reportTypes = ["PF ECR", "ESI Contribution", "TDS Form 24Q", "Professional Tax"];

export default function StatutoryReports() {
  const [form, setForm] = useState({ type: reportTypes[0], period: "" });
  const [reports, setReports] = useState<GeneratedReport[]>([]);

  const generate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.period) return;
    setReports((prev) => [
      { id: crypto.randomUUID(), type: form.type, period: form.period, createdAt: new Date().toISOString(), status: "Draft" },
      ...prev,
    ]);
  };

  const finalize = (id: string) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Finalized" } : r)));
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Generate Statutory Report</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={generate}>
            <div className="space-y-2">
              <Label htmlFor="type">Report Type</Label>
              <select
                id="type"
                className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              >
                {reportTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="period">Period (YYYY-MM)</Label>
              <Input id="period" placeholder="2025-09" value={form.period} onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))} required />
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button type="submit">Generate</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">No reports yet</TableCell>
                  </TableRow>
                )}
                {reports.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.type}</TableCell>
                    <TableCell>{r.period}</TableCell>
                    <TableCell>{new Date(r.createdAt).toLocaleString()}</TableCell>
                    <TableCell>{r.status}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" onClick={() => finalize(r.id)} disabled={r.status === "Finalized"}>Finalize</Button>
                    </TableCell>
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


