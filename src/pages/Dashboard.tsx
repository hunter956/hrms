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
      {/* Welcome Section with Enhanced Design */}
       <div className="relative overflow-hidden rounded-3xl border border-[#e2e8f0] p-8 bg-gradient-to-br from-[#f9fafb] via-white to-[#f0f9ff] shadow-xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-between gap-6 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">👋</span>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#1e293b]">Welcome back, {user.name}!</h1>
                <p className="text-[#64748b] mt-1">Here's your personalized HR dashboard with today's insights</p>
              </div>
            </div>
            
            {/* Quick Stats Row */}
            <div className="flex gap-4 mt-6">
              <div className="flex items-center gap-2 px-3 py-2 bg-white/60 rounded-lg border border-[#e2e8f0]">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-[#64748b]">All systems operational</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white/60 rounded-lg border border-[#e2e8f0]">
                <div className="w-2 h-2 rounded-full bg-[#0ea5e9]"></div>
                <span className="text-sm text-[#64748b]">12 pending tasks</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Link to="/leaves">
              <Button variant="default" className="px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
                <CalIcon className="mr-2 h-4 w-4" />
                Apply Leave
              </Button>
            </Link>
            <Link to="/payroll">
              <Button variant="outline" className="px-6 py-3 border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white transition-all duration-300">
                <DollarSign className="mr-2 h-4 w-4" />
                View Payslip
              </Button>
            </Link>
            <Button variant="secondary" className="px-6 py-3 bg-[#0ea5e9] text-white hover:bg-[#0284c7] transition-all duration-300">
              <Clock className="mr-2 h-4 w-4" />
              Clock In
            </Button>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full bg-gradient-to-r from-[#2563eb]/10 to-[#0ea5e9]/10 blur-3xl"></div>
        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-r from-[#0ea5e9]/10 to-[#2563eb]/10 blur-2xl"></div>
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
        <Card className="lg:col-span-2 border-[#e2e8f0] bg-gradient-to-br from-white to-[#f9fafb] shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="border-b border-[#e2e8f0] bg-gradient-to-r from-[#f9fafb] to-white">
            <CardTitle className="flex items-center gap-3 text-[#1e293b]">
              <div className="p-2 bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] rounded-lg">
                <CalIcon className="h-5 w-5 text-white" />
              </div>
              <span>Calendar & Events</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6 p-6">
            <div className="border border-[#e2e8f0] rounded-xl p-4 bg-white shadow-sm">
              <Calendar />
            </div>
            <div className="space-y-4">
              <div className="rounded-xl border border-[#e2e8f0] p-4 bg-gradient-to-br from-white to-[#f9fafb] shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#0ea5e9]"></div>
                  <div className="text-sm font-semibold text-[#1e293b]">Upcoming Events</div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#e0f2fe]/50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] flex items-center justify-center">
                      <span className="text-white text-xs font-bold">10</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#1e293b]">Company Holiday</div>
                      <div className="text-xs text-[#64748b]">Oct 10, 2024</div>
                    </div>
                  </li>
                  <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#e0f2fe]/50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#0ea5e9] to-[#2563eb] flex items-center justify-center">
                      <span className="text-white text-xs font-bold">12</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#1e293b]">Team Offsite</div>
                      <div className="text-xs text-[#64748b]">Oct 12, 2024</div>
                    </div>
                  </li>
                  <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#e0f2fe]/50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] flex items-center justify-center">
                      <span className="text-white text-xs font-bold">15</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#1e293b]">Payroll Processing</div>
                      <div className="text-xs text-[#64748b]">Oct 15, 2024</div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-[#e2e8f0] p-4 bg-gradient-to-br from-white to-[#f9fafb] shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#2563eb]"></div>
                  <div className="text-sm font-semibold text-[#1e293b]">Quick Actions</div>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Link to="/leaves">
                    <Button size="sm" variant="outline" className="w-full justify-start border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white">
                      <CalIcon className="mr-2 h-4 w-4" />
                      Apply Leave
                    </Button>
                  </Link>
                  <Link to="/expenses">
                    <Button size="sm" variant="outline" className="w-full justify-start border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-white">
                      <DollarSign className="mr-2 h-4 w-4" />
                      Submit Expense
                    </Button>
                  </Link>
                  <Link to="/profile">
                    <Button size="sm" variant="outline" className="w-full justify-start border-[#64748b] text-[#64748b] hover:bg-[#64748b] hover:text-white">
                      <UserIcon className="mr-2 h-4 w-4" />
                      Update Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right - Profile & Notifications */}
        <div className="space-y-6">
          <Card className="border-[#e2e8f0] bg-gradient-to-br from-white to-[#f9fafb] shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="border-b border-[#e2e8f0] bg-gradient-to-r from-[#f9fafb] to-white">
              <CardTitle className="flex items-center gap-3 text-[#1e293b]">
                <div className="p-2 bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] rounded-lg">
                  <UserIcon className="h-5 w-5 text-white" />
                </div>
                <span>Profile Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-16 w-16 ring-4 ring-[#e0f2fe] shadow-lg">
                    <AvatarImage src="/avatars/admin.jpg" alt="Profile" />
                    <AvatarFallback className="bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] text-white font-bold text-lg">AD</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-white"></div>
                </div>
                <div>
                  <div className="font-semibold text-[#1e293b] text-lg">HR Admin</div>
                  <div className="text-sm text-[#64748b]">HR Manager • Human Resources</div>
                  <div className="text-xs text-[#0ea5e9] font-medium">Active</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-[#e2e8f0] bg-gradient-to-br from-white to-[#f0f9ff] shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="text-2xl font-bold text-[#2563eb] mb-1">18</div>
                  <div className="text-xs text-[#64748b] font-medium">Leave Days</div>
                  <div className="text-xs text-green-600 mt-1">+2 this month</div>
                </div>
                <div className="p-4 rounded-xl border border-[#e2e8f0] bg-gradient-to-br from-white to-[#f0f9ff] shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="text-2xl font-bold text-[#0ea5e9] mb-1">95%</div>
                  <div className="text-xs text-[#64748b] font-medium">Attendance</div>
                  <div className="text-xs text-green-600 mt-1">+1.2% vs last week</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#e2e8f0] bg-gradient-to-br from-white to-[#f9fafb] shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="border-b border-[#e2e8f0] bg-gradient-to-r from-[#f9fafb] to-white">
              <CardTitle className="flex items-center gap-3 text-[#1e293b]">
                <div className="p-2 bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] rounded-lg">
                  <Bell className="h-5 w-5 text-white" />
                </div>
                <span>Recent Notifications</span>
                <div className="ml-auto w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">3</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {recentNotifications.map((n, index) => (
                <div key={n.id} className="flex items-start gap-3 p-3 rounded-xl border border-[#e2e8f0] bg-gradient-to-r from-white to-[#f9fafb] hover:from-[#e0f2fe]/50 hover:to-[#f0f9ff]/50 transition-all duration-300 shadow-sm">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    index === 0 ? 'bg-red-500' : 
                    index === 1 ? 'bg-[#0ea5e9]' : 'bg-[#64748b]'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#1e293b]">{n.title}</div>
                    <div className="text-xs text-[#64748b] mt-1">{n.type}</div>
                    <div className="text-xs text-[#64748b] mt-1">{n.time}</div>
                  </div>
                </div>
              ))}
              <Link to="/notifications">
                <Button variant="outline" size="sm" className="w-full border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white transition-all duration-300">
                  View all notifications
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-[#e2e8f0] bg-gradient-to-br from-white to-[#f9fafb] shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="border-b border-[#e2e8f0] bg-gradient-to-r from-[#f9fafb] to-white">
            <CardTitle className="flex items-center gap-3 text-[#1e293b]">
              <div className="p-2 bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span>Attendance Trend</span>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-[#64748b]">+1.2% this week</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ChartContainer config={{ attendance: { label: "Attendance %", color: "#2563eb" } }}>
              <LineChart data={attendanceTrend} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis width={28} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <ChartTooltip 
                  content={<ChartTooltipContent />} 
                  contentStyle={{ 
                    backgroundColor: '#f9fafb', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="#2563eb" 
                  strokeWidth={3} 
                  dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-[#e2e8f0] bg-gradient-to-br from-white to-[#f9fafb] shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="border-b border-[#e2e8f0] bg-gradient-to-r from-[#f9fafb] to-white">
            <CardTitle className="flex items-center gap-3 text-[#1e293b]">
              <div className="p-2 bg-gradient-to-r from-[#0ea5e9] to-[#2563eb] rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span>Team Availability</span>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#0ea5e9]"></div>
                <span className="text-xs text-[#64748b]">38 total members</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ChartContainer config={{ available: { label: "Available", color: "#0ea5e9" } }}>
              <BarChart data={teamAvailability} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="team" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis width={28} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <ChartTooltip 
                  content={<ChartTooltipContent />} 
                  contentStyle={{ 
                    backgroundColor: '#f9fafb', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Bar 
                  dataKey="available" 
                  fill="url(#teamGradient)" 
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="teamGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}