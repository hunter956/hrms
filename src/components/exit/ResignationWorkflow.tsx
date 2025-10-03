import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Resignation = {
  id: string;
  employee: string;
  noticeStart: string;
  lastWorking: string;
  reason: string;
  status: "Submitted" | "Accepted" | "Withdrawn";
};

export default function ResignationWorkflow() {
  const [form, setForm] = useState({ employee: "", noticeStart: "", lastWorking: "", reason: "" });
  const [items, setItems] = useState<Resignation[]>([]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.employee || !form.noticeStart || !form.lastWorking) return;
    setItems((prev) => [
      { id: crypto.randomUUID(), employee: form.employee, noticeStart: form.noticeStart, lastWorking: form.lastWorking, reason: form.reason, status: "Submitted" },
      ...prev,
    ]);
    setForm({ employee: "", noticeStart: "", lastWorking: "", reason: "" });
  };

  const setStatus = (id: string, status: Resignation["status"]) => {
    setItems((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Employee Resignation Submission</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={submit}>
            <div className="space-y-2">
              <Label htmlFor="employee">Employee</Label>
              <Input id="employee" placeholder="Employee name or ID" value={form.employee} onChange={(e) => setForm((f) => ({ ...f, employee: e.target.value }))} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="noticeStart">Notice Start</Label>
                <Input id="noticeStart" type="date" value={form.noticeStart} onChange={(e) => setForm((f) => ({ ...f, noticeStart: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastWorking">Last Working Day</Label>
                <Input id="lastWorking" type="date" value={form.lastWorking} onChange={(e) => setForm((f) => ({ ...f, lastWorking: e.target.value }))} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Textarea id="reason" placeholder="Reason for resignation" value={form.reason} onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))} />
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button type="reset" variant="outline" onClick={() => setForm({ employee: "", noticeStart: "", lastWorking: "", reason: "" })}>Clear</Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resignations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Notice Start</TableHead>
                  <TableHead>Last Working</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">No resignations</TableCell>
                  </TableRow>
                )}
                {items.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell title={r.reason}>{r.employee}</TableCell>
                    <TableCell>{r.noticeStart}</TableCell>
                    <TableCell>{r.lastWorking}</TableCell>
                    <TableCell>{r.status}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="outline" onClick={() => setStatus(r.id, "Accepted")} disabled={r.status === "Accepted"}>Accept</Button>
                      <Button size="sm" variant="outline" onClick={() => setStatus(r.id, "Withdrawn")} disabled={r.status === "Withdrawn"}>Withdraw</Button>
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


