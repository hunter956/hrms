import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Notification = {
  id: string;
  type: "Leave" | "Policy" | "Announcement" | "Reminder";
  title: string;
  body: string;
  createdAt: string; // ISO
  read: boolean;
};

export default function Notifications() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"All" | Notification["type"]>("All");
  const [sort, setSort] = useState<"Newest" | "Oldest">("Newest");
  const [items, setItems] = useState<Notification[]>([
    { id: "n1", type: "Leave", title: "Leave Request Pending", body: "John Doe requested 3 days leave.", createdAt: new Date(Date.now() - 3600_000).toISOString(), read: false },
    { id: "n2", type: "Policy", title: "Policy Update: WFH", body: "Revised WFH guidelines effective next month.", createdAt: new Date(Date.now() - 86_400_000).toISOString(), read: true },
    { id: "n3", type: "Announcement", title: "Office Renovation", body: "Renovation on 2nd floor this weekend.", createdAt: new Date(Date.now() - 48_600_000).toISOString(), read: false },
    { id: "n4", type: "Reminder", title: "Performance Review Due", body: "Submit reviews by Friday.", createdAt: new Date(Date.now() - 3 * 86_400_000).toISOString(), read: true },
  ]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let list = items.filter((n) =>
      (typeFilter === "All" || n.type === typeFilter) &&
      (n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q))
    );
    list = list.sort((a, b) => (sort === "Newest" ? b.createdAt.localeCompare(a.createdAt) : a.createdAt.localeCompare(b.createdAt)));
    return list;
  }, [items, query, typeFilter, sort]);

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const toggleRead = (id: string) => setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground mt-2">All your HRMS updates in one place.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input placeholder="Search notifications" value={query} onChange={(e) => setQuery(e.target.value)} />
            <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as any)}>
              <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Leave">Leave</SelectItem>
                <SelectItem value="Policy">Policy</SelectItem>
                <SelectItem value="Announcement">Announcement</SelectItem>
                <SelectItem value="Reminder">Reminder</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={(v) => setSort(v as any)}>
              <SelectTrigger><SelectValue placeholder="Sort" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Newest">Newest</SelectItem>
                <SelectItem value="Oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
            <button onClick={markAllRead} className="text-sm justify-self-start underline">Mark all as read</button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">No notifications</TableCell>
                  </TableRow>
                )}
                {filtered.map((n) => (
                  <TableRow key={n.id} className="cursor-pointer" onClick={() => toggleRead(n.id)}>
                    <TableCell>{n.type}</TableCell>
                    <TableCell className="font-medium">{n.title}</TableCell>
                    <TableCell className="max-w-[420px] truncate" title={n.body}>{n.body}</TableCell>
                    <TableCell>{new Date(n.createdAt).toLocaleString()}</TableCell>
                    <TableCell>
                      {n.read ? <Badge variant="secondary">Read</Badge> : <Badge>Unread</Badge>}
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


