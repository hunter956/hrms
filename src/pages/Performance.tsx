import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PerformanceStats } from "@/components/performance/PerformanceStats";
import { GoalsKPIs } from "@/components/performance/GoalsKPIs";
import { SelfAssessment } from "@/components/performance/SelfAssessment";
import { ManagerReview } from "@/components/performance/ManagerReview";
import { PerformanceRating } from "@/components/performance/PerformanceRating";
import { PerformanceReports } from "@/components/performance/PerformanceReports";

export default function Performance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Performance Management</h1>
        <p className="text-muted-foreground mt-2">
          Track goals, conduct reviews, and analyze employee performance
        </p>
      </div>

      <PerformanceStats />

      <Tabs defaultValue="goals" className="space-y-6">
        <TabsList>
          <TabsTrigger value="goals">Goals & KPIs</TabsTrigger>
          <TabsTrigger value="self-assessment">Self Assessment</TabsTrigger>
          <TabsTrigger value="manager-review">Manager Review</TabsTrigger>
          <TabsTrigger value="ratings">Performance Ratings</TabsTrigger>
          <TabsTrigger value="reports">Reports & Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="goals">
          <GoalsKPIs />
        </TabsContent>

        <TabsContent value="self-assessment">
          <SelfAssessment />
        </TabsContent>

        <TabsContent value="manager-review">
          <ManagerReview />
        </TabsContent>

        <TabsContent value="ratings">
          <PerformanceRating />
        </TabsContent>

        <TabsContent value="reports">
          <PerformanceReports />
        </TabsContent>
      </Tabs>
    </div>
  );
}
