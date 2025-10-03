import EmployeeStats from "@/components/analytics/EmployeeStats";
import PayrollAnalysis from "@/components/analytics/PayrollAnalysis";
import LeaveAttendanceTrends from "@/components/analytics/LeaveAttendanceTrends";
import PerformanceInsights from "@/components/analytics/PerformanceInsights";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Analytics & Reports</h2>
        <p className="text-muted-foreground">Workforce, payroll, leave/attendance, and performance insights.</p>
      </div>
      <Tabs defaultValue="employee" className="w-full">
        <TabsList className="w-full max-w-full flex flex-wrap gap-2">
          <TabsTrigger value="employee">Employee Statistics</TabsTrigger>
          <TabsTrigger value="payroll">Payroll Analysis</TabsTrigger>
          <TabsTrigger value="leave">Leave & Attendance</TabsTrigger>
          <TabsTrigger value="performance">Performance Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="employee" className="space-y-6">
          <EmployeeStats />
        </TabsContent>
        <TabsContent value="payroll" className="space-y-6">
          <PayrollAnalysis />
        </TabsContent>
        <TabsContent value="leave" className="space-y-6">
          <LeaveAttendanceTrends />
        </TabsContent>
        <TabsContent value="performance" className="space-y-6">
          <PerformanceInsights />
        </TabsContent>
      </Tabs>
    </div>
  );
}


