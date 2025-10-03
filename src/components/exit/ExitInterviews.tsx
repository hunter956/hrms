import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Interview = {
  id: string;
  employee: string;
  interviewer: string;
  scheduledAt: string;
  feedback?: string;
  status: "Scheduled" | "Completed" | "Cancelled";
};

export default function ExitInterviews() {
  const [form, setForm] = useState({ employee: "", interviewer: "", scheduledAt: "" });
  const [items, setItems] = useState<Interview[]>([]);

  const schedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.employee || !form.interviewer || !form.scheduledAt) return;
    setItems((prev) => [
      { id: crypto.randomUUID(), employee: form.employee, interviewer: form.interviewer, scheduledAt: form.scheduledAt, status: "Scheduled" },
      ...prev,
    ]);
    setForm({ employee: "", interviewer: "", scheduledAt: "" });
  };

  const setStatus = (id: string, status: Interview["status"]) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Schedule Exit Interview</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 md:grid-cols-3" onSubmit={schedule}>
            <div className="space-y-2">
              <Label htmlFor="employee">Employee</Label>
              <Input id="employee" value={form.employee} onChange={(e) => setForm((f) => ({ ...f, employee: e.target.value }))} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interviewer">Interviewer</Label>
              <Input id="interviewer" value={form.interviewer} onChange={(e) => setForm((f) => ({ ...f, interviewer: e.target.value }))} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scheduledAt">Date & Time</Label>
              <Input id="scheduledAt" type="datetime-local" value={form.scheduledAt} onChange={(e) => setForm((f) => ({ ...f, scheduledAt: e.target.value }))} required />
            </div>
            <div className="md:col-span-3 flex items-center justify-end">
              <Button type="submit">Schedule</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Interviewer</TableHead>
                  <TableHead>When</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">No interviews</TableCell>
                  </TableRow>
                )}
                {items.map((i) => (
                  <TableRow key={i.id}>
                    <TableCell>{i.employee}</TableCell>
                    <TableCell>{i.interviewer}</TableCell>
                    <TableCell>{new Date(i.scheduledAt).toLocaleString()}</TableCell>
                    <TableCell>{i.status}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="outline" onClick={() => setStatus(i.id, "Completed")} disabled={i.status === "Completed"}>Complete</Button>
                      <Button size="sm" variant="outline" onClick={() => setStatus(i.id, "Cancelled")} disabled={i.status === "Cancelled"}>Cancel</Button>
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


