import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, AlertCircle, TrendingUp } from "lucide-react";
import { format } from "date-fns";

export function AttendanceStats() {
  const today = format(new Date(), "yyyy-MM-dd");

  const { data: stats } = useQuery({
    queryKey: ["attendance-stats", today],
    queryFn: async () => {
      const { data: todayRecords, error } = await supabase
        .from("attendance_records")
        .select("status, overtime_hours")
        .eq("date", today);

      if (error) throw error;

      const present = todayRecords?.filter((r) => r.status === "present").length || 0;
      const late = todayRecords?.filter((r) => r.status === "late").length || 0;
      const absent = todayRecords?.filter((r) => r.status === "absent").length || 0;
      const totalOvertime =
        todayRecords?.reduce((sum, r) => sum + (Number(r.overtime_hours) || 0), 0) || 0;

      return { present, late, absent, totalOvertime };
    },
  });

  const statCards = [
    {
      title: "Present Today",
      value: stats?.present || 0,
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Late Arrivals",
      value: stats?.late || 0,
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Absent",
      value: stats?.absent || 0,
      icon: AlertCircle,
      color: "text-red-600",
    },
    {
      title: "Total Overtime (hrs)",
      value: stats?.totalOvertime.toFixed(1) || "0.0",
      icon: TrendingUp,
      color: "text-blue-600",
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
