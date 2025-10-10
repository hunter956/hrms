import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PerformanceStats } from "@/components/performance/PerformanceStats";
import { GoalsKPIs } from "@/components/performance/GoalsKPIs";
import { SelfAssessment } from "@/components/performance/SelfAssessment";
import { ManagerReview } from "@/components/performance/ManagerReview";
import { PerformanceRating } from "@/components/performance/PerformanceRating";
import { PerformanceReports } from "@/components/performance/PerformanceReports";

export default function Performance() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="flex items-center gap-2 h-8 w-8 p-0" onClick={() => navigate('/employees')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight text-[#1e293b]">Performance Management</h1>
          <p className="text-[#64748b] mt-2">
            (Track goals, conduct reviews, and analyze employee performance)
          </p>
        </div>
      </div>

      <PerformanceStats />

      <Tabs defaultValue="goals" className="space-y-6">
        <TabsList className="bg-[#f9fafb] border border-[#e2e8f0]">
          <TabsTrigger value="goals" className="data-[state=active]:bg-[#2563eb] data-[state=active]:text-white hover:bg-[#e0f2fe] hover:text-[#1e293b] transition-all duration-300 hover:scale-[1.02]">Goals & KPIs</TabsTrigger>
          <TabsTrigger value="self-assessment" className="data-[state=active]:bg-[#2563eb] data-[state=active]:text-white hover:bg-[#e0f2fe] hover:text-[#1e293b] transition-all duration-300 hover:scale-[1.02]">Self Assessment</TabsTrigger>
          <TabsTrigger value="manager-review" className="data-[state=active]:bg-[#2563eb] data-[state=active]:text-white hover:bg-[#e0f2fe] hover:text-[#1e293b] transition-all duration-300 hover:scale-[1.02]">Manager Review</TabsTrigger>
          <TabsTrigger value="ratings" className="data-[state=active]:bg-[#2563eb] data-[state=active]:text-white hover:bg-[#e0f2fe] hover:text-[#1e293b] transition-all duration-300 hover:scale-[1.02]">Performance Ratings</TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-[#2563eb] data-[state=active]:text-white hover:bg-[#e0f2fe] hover:text-[#1e293b] transition-all duration-300 hover:scale-[1.02]">Reports & Trends</TabsTrigger>
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