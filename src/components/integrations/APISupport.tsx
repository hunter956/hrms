import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function APISupport() {
  const endpoints = [
    { method: "GET", path: "/api/v1/employees", desc: "List employees" },
    { method: "POST", path: "/api/v1/employees", desc: "Create employee" },
    { method: "GET", path: "/api/v1/attendance", desc: "Attendance records" },
    { method: "POST", path: "/api/v1/webhooks/approvals", desc: "Receive approval webhooks" },
  ];

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>API Endpoints (Demo)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Method</TableHead>
                  <TableHead>Path</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {endpoints.map((e) => (
                  <TableRow key={e.method + e.path}>
                    <TableCell>{e.method}</TableCell>
                    <TableCell><code>{e.path}</code></TableCell>
                    <TableCell>{e.desc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Use bearer tokens in the Authorization header. Example: <code>Authorization: Bearer &lt;token&gt;</code></p>
        </CardContent>
      </Card>
    </div>
  );
}


