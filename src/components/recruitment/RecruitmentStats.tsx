import { StatsCard } from "@/components/dashboard/StatsCard";
import { Briefcase, Users, Calendar, UserCheck } from "lucide-react";

export function RecruitmentStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Active Jobs"
        value="12"
        change="+3 new positions"
        changeType="positive"
        icon={Briefcase}
      />
      <StatsCard
        title="Applications"
        value="147"
        change="+23 this week"
        changeType="positive"
        icon={Users}
      />
      <StatsCard
        title="Interviews"
        value="28"
        change="+8 scheduled"
        changeType="positive"
        icon={Calendar}
      />
      <StatsCard
        title="New Hires"
        value="5"
        change="Onboarding in progress"
        changeType="neutral"
        icon={UserCheck}
      />
    </div>
  );
}
