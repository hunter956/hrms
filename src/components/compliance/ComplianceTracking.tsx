import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ComplianceRow = {
  id: string;
  month: string; // YYYY-MM
  pfAmount: number;
  esiAmount: number;
  tdsAmount: number;
  pfStatus: "Pending" | "Filed" | "Paid";
  esiStatus: "Pending" | "Filed" | "Paid";
  tdsStatus: "Pending" | "Filed" | "Paid";
};

const seed: ComplianceRow[] = [
  { id: "c1", month: "2025-07", pfAmount: 124500, esiAmount: 38200, tdsAmount: 256000, pfStatus: "Paid", esiStatus: "Paid", tdsStatus: "Filed" },
  { id: "c2", month: "2025-08", pfAmount: 131200, esiAmount: 40120, tdsAmount: 248900, pfStatus: "Paid", esiStatus: "Filed", tdsStatus: "Pending" },
  { id: "c3", month: "2025-09", pfAmount: 136880, esiAmount: 41950, tdsAmount: 262300, pfStatus: "Filed", esiStatus: "Pending", tdsStatus: "Pending" },
];

export default function ComplianceTracking() {
  const [rows, setRows] = useState<ComplianceRow[]>(seed);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Pending" | "Filed" | "Paid">("All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return rows.filter((r) => {
      const matchQuery = r.month.includes(q);
      const statuses = [r.pfStatus, r.esiStatus, r.tdsStatus];
      const matchStatus = statusFilter === "All" || statuses.some((s) => s === statusFilter);
      return matchQuery && matchStatus;
    });
  }, [rows, query, statusFilter]);

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>PF Due (last 3 mo)</CardTitle>
          </CardHeader>
          <CardContent className="text-xl font-semibold">₹{rows.reduce((s, r) => s + r.pfAmount, 0).toLocaleString()}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ESI Due (last 3 mo)</CardTitle>
          </CardHeader>
          <CardContent className="text-xl font-semibold">₹{rows.reduce((s, r) => s + r.esiAmount, 0).toLocaleString()}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>TDS Due (last 3 mo)</CardTitle>
          </CardHeader>
          <CardContent className="text-xl font-semibold">₹{rows.reduce((s, r) => s + r.tdsAmount, 0).toLocaleString()}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Open Items</CardTitle>
          </CardHeader>
          <CardContent className="text-xl font-semibold">{rows.flatMap((r) => [r.pfStatus, r.esiStatus, r.tdsStatus]).filter((s) => s !== "Paid").length}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>PF, ESI, TDS Compliance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-3 mb-3">
            <Input placeholder="Filter by month e.g. 2025-09" value={query} onChange={(e) => setQuery(e.target.value)} />
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
              <SelectTrigger className="w-[200px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Filed">Filed</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead className="text-right">PF</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">ESI</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">TDS</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">No records</TableCell>
                  </TableRow>
                )}
                {filtered.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.month}</TableCell>
                    <TableCell className="text-right">₹{r.pfAmount.toLocaleString()}</TableCell>
                    <TableCell>{r.pfStatus}</TableCell>
                    <TableCell className="text-right">₹{r.esiAmount.toLocaleString()}</TableCell>
                    <TableCell>{r.esiStatus}</TableCell>
                    <TableCell className="text-right">₹{r.tdsAmount.toLocaleString()}</TableCell>
                    <TableCell>{r.tdsStatus}</TableCell>
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


