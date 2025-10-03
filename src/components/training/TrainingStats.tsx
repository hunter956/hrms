import { BookOpen, Users, Award, TrendingUp } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";

const TrainingStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Active Sessions"
        value="12"
        change="+2 this month"
        changeType="positive"
        icon={BookOpen}
      />
      <StatsCard
        title="Total Participants"
        value="156"
        change="+18 this month"
        changeType="positive"
        icon={Users}
      />
      <StatsCard
        title="Certifications Issued"
        value="34"
        change="+8 this month"
        changeType="positive"
        icon={Award}
      />
      <StatsCard
        title="Avg. Completion Rate"
        value="87%"
        change="+5% from last month"
        changeType="positive"
        icon={TrendingUp}
      />
    </div>
  );
};

export default TrainingStats;
