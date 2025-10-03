import { Users, Building2, Calendar as CalIcon, TrendingUp, Clock, DollarSign, Bell, User as UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

export default function Dashboard() {
  const user = { name: "HR Admin" };

  const recentNotifications = [
    { id: 1, type: "Leave", title: "Leave Request Pending", time: "2h ago" },
    { id: 2, type: "Policy", title: "WFH Policy Updated", time: "1d ago" },
    { id: 3, type: "Reminder", title: "Reviews due Friday", time: "2d ago" },
  ];

  const attendanceTrend = [
    { day: "Mon", attendance: 92 },
    { day: "Tue", attendance: 94 },
    { day: "Wed", attendance: 95 },
    { day: "Thu", attendance: 93 },
    { day: "Fri", attendance: 96 },
  ];

  const teamAvailability = [
    { team: "Eng", available: 38 },
    { team: "Sales", available: 24 },
    { team: "HR", available: 6 },
    { team: "Finance", available: 8 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="relative rounded-2xl border border-border/50 p-6 bg-gradient-to-r from-card via-card/90 to-card/80 shadow-elevated">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">Welcome, {user.name}</h1>
            <p className="text-muted-foreground mt-2">Here’s a quick overview of today’s HR insights and tasks.</p>
          </div>
          <div className="flex gap-2">
            <Link to="/leaves"><Button variant="default">Apply Leave</Button></Link>
            <Link to="/payroll"><Button variant="outline">View Payslip</Button></Link>
            <Button variant="secondary">Clock In</Button>
          </div>
        </div>
        <div className="absolute -z-10 -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-primary/10 blur-2xl" />
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Leave Balance" value={"18 days"} change="-1 day this week" changeType="negative" icon={CalIcon} />
        <StatsCard title="Upcoming Holidays" value={3} change="Next: Diwali" changeType="neutral" icon={Building2} />
        <StatsCard title="Pending Approvals" value={12} change="5 leave, 7 expenses" changeType="negative" icon={Bell} />
        <StatsCard title="Attendance Summary" value="95%" change="+1.2% vs last week" changeType="positive" icon={Clock} />
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left - Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CalIcon className="h-5 w-5" /> Calendar</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-xl p-2">
              <Calendar />
            </div>
            <div className="space-y-4">
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium">Upcoming</div>
                <ul className="mt-2 text-sm text-muted-foreground space-y-2">
                  <li>Oct 10 - Company Holiday</li>
                  <li>Oct 12 - Team Offsite</li>
                  <li>Oct 15 - Payroll Processing</li>
                </ul>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium">Quick Actions</div>
                <div className="mt-2 flex gap-2 flex-wrap">
                  <Link to="/leaves"><Button size="sm" variant="outline">Apply Leave</Button></Link>
                  <Link to="/expenses"><Button size="sm" variant="outline">Submit Expense</Button></Link>
                  <Link to="/profile"><Button size="sm" variant="outline">Update Profile</Button></Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right - Profile & Notifications */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><UserIcon className="h-5 w-5" /> Profile Summary</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Avatar className="h-16 w-16 ring-2 ring-primary/20">
                <AvatarImage src="/avatars/admin.jpg" alt="Profile" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <div className="font-medium">HR Admin</div>
                <div className="text-muted-foreground">HR Manager • Human Resources</div>
                <div className="text-muted-foreground">Joined: 2022-04-01</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentNotifications.map((n) => (
                <div key={n.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <div className="text-sm font-medium">{n.title}</div>
                    <div className="text-xs text-muted-foreground">{n.type}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{n.time}</div>
                </div>
              ))}
              <Link to="/notifications"><Button variant="outline" size="sm" className="w-full">View all</Button></Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" /> Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ attendance: { label: "Attendance %", color: "hsl(var(--primary))" } }}>
              <LineChart data={attendanceTrend} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis width={28} tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="attendance" stroke="var(--color-attendance)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Team Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ available: { label: "Available", color: "hsl(var(--secondary-foreground))" } }}>
              <BarChart data={teamAvailability} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="team" tickLine={false} axisLine={false} />
                <YAxis width={28} tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="available" fill="var(--color-available)" radius={[6, 6, 0, 0]} />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}