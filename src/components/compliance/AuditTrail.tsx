import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

type AuditEvent = {
  id: string;
  at: string; // ISO
  actor: string;
  action: string;
  entity: string;
  details?: string;
};

const seed: AuditEvent[] = [
  { id: "a1", at: "2025-09-29T09:10:00Z", actor: "admin@acme.com", action: "UPDATED", entity: "Employee #1023 - Salary", details: "CTC revised" },
  { id: "a2", at: "2025-09-28T14:22:18Z", actor: "manager@acme.com", action: "APPROVED", entity: "Leave #L-5531", details: "Annual leave" },
  { id: "a3", at: "2025-09-27T17:05:41Z", actor: "payroll@acme.com", action: "FILED", entity: "TDS 24Q - 2025-09", details: "Submitted to TRACES" },
];

export default function AuditTrail() {
  const [query, setQuery] = useState("");
  const events = useMemo(() => seed, []);
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return events.filter((e) =>
      e.actor.toLowerCase().includes(q) ||
      e.action.toLowerCase().includes(q) ||
      e.entity.toLowerCase().includes(q)
    );
  }, [events, query]);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Audit Trail</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-3">
            <Input placeholder="Search by actor, action, or entity" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Actor</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">No events</TableCell>
                  </TableRow>
                )}
                {filtered.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell>{new Date(e.at).toLocaleString()}</TableCell>
                    <TableCell>{e.actor}</TableCell>
                    <TableCell>{e.action}</TableCell>
                    <TableCell>{e.entity}</TableCell>
                    <TableCell className="max-w-[360px] truncate" title={e.details}>{e.details || "—"}</TableCell>
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


