import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type TravelRequest = {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  purpose: string;
  estimatedCost: number;
  status: "Pending" | "Approved" | "Rejected";
};

export default function TravelRequests() {
  const [form, setForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    purpose: "",
    estimatedCost: "",
  });
  const [requests, setRequests] = useState<TravelRequest[]>([]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cost = Number(form.estimatedCost);
    if (!form.destination || !form.startDate || !form.endDate || !cost) return;
    setRequests((prev) => [
      {
        id: crypto.randomUUID(),
        destination: form.destination,
        startDate: form.startDate,
        endDate: form.endDate,
        purpose: form.purpose,
        estimatedCost: cost,
        status: "Pending",
      },
      ...prev,
    ]);
    setForm({ destination: "", startDate: "", endDate: "", purpose: "", estimatedCost: "" });
  };

  const setStatus = (id: string, status: TravelRequest["status"]) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Submit Travel Request</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 md:grid-cols-2" onSubmit={submit}>
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input id="destination" value={form.destination} onChange={(e) => setForm((f) => ({ ...f, destination: e.target.value }))} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" value={form.startDate} onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" value={form.endDate} onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))} required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Textarea id="purpose" value={form.purpose} onChange={(e) => setForm((f) => ({ ...f, purpose: e.target.value }))} placeholder="Brief purpose of travel" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimatedCost">Estimated Cost</Label>
              <Input id="estimatedCost" type="number" min="0" step="0.01" value={form.estimatedCost} onChange={(e) => setForm((f) => ({ ...f, estimatedCost: e.target.value }))} required />
            </div>
            <div className="flex items-center justify-end md:col-span-2 gap-2">
              <Button type="reset" variant="outline" onClick={() => setForm({ destination: "", startDate: "", endDate: "", purpose: "", estimatedCost: "" })}>Clear</Button>
              <Button type="submit">Submit Request</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Requests & Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Destination</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">No requests</TableCell>
                  </TableRow>
                )}
                {requests.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.destination}</TableCell>
                    <TableCell>{r.startDate} → {r.endDate}</TableCell>
                    <TableCell className="max-w-[280px] truncate" title={r.purpose}>{r.purpose || "—"}</TableCell>
                    <TableCell className="text-right">₹{r.estimatedCost.toFixed(2)}</TableCell>
                    <TableCell>{r.status}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="outline" onClick={() => setStatus(r.id, "Approved")} disabled={r.status === "Approved"}>Approve</Button>
                      <Button size="sm" variant="outline" onClick={() => setStatus(r.id, "Rejected")} disabled={r.status === "Rejected"}>Reject</Button>
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


