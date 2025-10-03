import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type AppConn = {
  id: string;
  app: string;
  status: "Connected" | "Disconnected";
};

const available = ["Slack", "Microsoft Teams", "Gmail", "Google Calendar", "Zoho", "HubSpot"];

export default function ThirdPartyApps() {
  const [connections, setConnections] = useState<AppConn[]>([
    { id: "c1", app: "Slack", status: "Connected" },
    { id: "c2", app: "Gmail", status: "Disconnected" },
  ]);

  const toggle = (id: string) => setConnections((prev) => prev.map((c) => (c.id === id ? { ...c, status: c.status === "Connected" ? "Disconnected" : "Connected" } : c)));
  const add = (app: string) => setConnections((prev) => [{ id: crypto.randomUUID(), app, status: "Disconnected" }, ...prev]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Available Apps</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {available.map((a) => (
            <Button key={a} variant="outline" onClick={() => add(a)}>Add {a}</Button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>App</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {connections.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">No connections</TableCell>
                  </TableRow>
                )}
                {connections.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.app}</TableCell>
                    <TableCell>{c.status}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" onClick={() => toggle(c.id)}>{c.status === "Connected" ? "Disconnect" : "Connect"}</Button>
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


