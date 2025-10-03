import { Target, TrendingUp, Users, Award } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";

export function PerformanceStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Active Goals"
        value="142"
        change="+12% from last quarter"
        changeType="positive"
        icon={Target}
      />
      <StatsCard
        title="Pending Reviews"
        value="23"
        change="Due this month"
        changeType="neutral"
        icon={Users}
      />
      <StatsCard
        title="Avg Performance"
        value="4.2/5"
        change="+0.3 from last period"
        changeType="positive"
        icon={TrendingUp}
      />
      <StatsCard
        title="Top Performers"
        value="18"
        change="Exceeded targets"
        changeType="positive"
        icon={Award}
      />
    </div>
  );
}
