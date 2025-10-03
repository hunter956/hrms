import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Device = {
  id: string;
  name: string;
  ip: string;
  location?: string;
  status: "Online" | "Offline";
};

export default function Biometric() {
  const [form, setForm] = useState({ name: "", ip: "", location: "" });
  const [devices, setDevices] = useState<Device[]>([
    { id: "d1", name: "Main Gate", ip: "192.168.1.20", location: "HQ Lobby", status: "Online" },
  ]);

  const addDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.ip) return;
    setDevices((prev) => [
      { id: crypto.randomUUID(), name: form.name, ip: form.ip, location: form.location, status: "Offline" },
      ...prev,
    ]);
    setForm({ name: "", ip: "", location: "" });
  };

  const toggleStatus = (id: string) => {
    setDevices((prev) => prev.map((d) => (d.id === id ? { ...d, status: d.status === "Online" ? "Offline" : "Online" } : d)));
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Biometric Devices</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={addDevice}>
            <div className="space-y-2">
              <Label htmlFor="name">Device Name</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ip">IP Address</Label>
              <Input id="ip" placeholder="192.168.1.100" value={form.ip} onChange={(e) => setForm((f) => ({ ...f, ip: e.target.value }))} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} />
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button type="reset" variant="outline" onClick={() => setForm({ name: "", ip: "", location: "" })}>Clear</Button>
              <Button type="submit">Add Device</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Registered Devices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>IP</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {devices.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">No devices</TableCell>
                  </TableRow>
                )}
                {devices.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell>{d.name}</TableCell>
                    <TableCell>{d.ip}</TableCell>
                    <TableCell>{d.location || "—"}</TableCell>
                    <TableCell>{d.status}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" onClick={() => toggleStatus(d.id)}>Toggle</Button>
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


