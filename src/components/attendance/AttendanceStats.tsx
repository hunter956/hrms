import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, AlertCircle, TrendingUp } from "lucide-react";

export function AttendanceStats() {
  // Hardcoded stats data
  const stats = {
    present: 45,
    late: 8,
    absent: 3,
    totalOvertime: 12.5
  };

  const statCards = [
    {
      title: "Present Today",
      value: stats.present,
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Late Arrivals",
      value: stats.late,
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Absent",
      value: stats.absent,
      icon: AlertCircle,
      color: "text-red-600",
    },
    {
      title: "Total Overtime (hrs)",
      value: stats.totalOvertime.toFixed(1),
      icon: TrendingUp,
      color: "text-sky-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}