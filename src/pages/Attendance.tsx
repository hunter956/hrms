import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { AttendanceMarking } from "@/components/attendance/AttendanceMarking";
import { AttendanceTable } from "@/components/attendance/AttendanceTable";
import { ShiftManagement } from "@/components/attendance/ShiftManagement";
import { RosterManagement } from "@/components/attendance/RosterManagement";
import { AttendanceStats } from "@/components/attendance/AttendanceStats";
import { Calendar, Clock, Users, BarChart3 } from "lucide-react";

export default function Attendance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#1e293b]">Attendance & Time Tracking</h1>
        <p className="text-[#64748b] mt-2">
          Manage employee attendance, shifts, and working hours
        </p>
      </div>

      <AttendanceStats />

      <Tabs defaultValue="marking" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-[#f9fafb] border border-[#e2e8f0]">
          <TabsTrigger value="marking" className="flex items-center gap-2 data-[state=active]:bg-[#2563eb] data-[state=active]:text-white hover:bg-[#e0f2fe] hover:text-[#1e293b] transition-all duration-300 hover:scale-[1.02]">
            <Clock className="h-4 w-4" />
            Mark Attendance
          </TabsTrigger>
          <TabsTrigger value="records" className="flex items-center gap-2 data-[state=active]:bg-[#2563eb] data-[state=active]:text-white hover:bg-[#e0f2fe] hover:text-[#1e293b] transition-all duration-300 hover:scale-[1.02]">
            <Calendar className="h-4 w-4" />
            Records
          </TabsTrigger>
          <TabsTrigger value="shifts" className="flex items-center gap-2 data-[state=active]:bg-[#2563eb] data-[state=active]:text-white hover:bg-[#e0f2fe] hover:text-[#1e293b] transition-all duration-300 hover:scale-[1.02]">
            <BarChart3 className="h-4 w-4" />
            Shifts
          </TabsTrigger>
          <TabsTrigger value="rosters" className="flex items-center gap-2 data-[state=active]:bg-[#2563eb] data-[state=active]:text-white hover:bg-[#e0f2fe] hover:text-[#1e293b] transition-all duration-300 hover:scale-[1.02]">
            <Users className="h-4 w-4" />
            Rosters
          </TabsTrigger>
        </TabsList>

        <TabsContent value="marking" className="space-y-6">
          <Card className="p-6 border-[#e2e8f0] bg-[#f9fafb]">
            <AttendanceMarking />
          </Card>
        </TabsContent>

        <TabsContent value="records" className="space-y-6">
          <Card className="p-6 border-[#e2e8f0] bg-[#f9fafb]">
            <AttendanceTable />
          </Card>
        </TabsContent>

        <TabsContent value="shifts" className="space-y-6">
          <Card className="p-6 border-[#e2e8f0] bg-[#f9fafb]">
            <ShiftManagement />
          </Card>
        </TabsContent>

        <TabsContent value="rosters" className="space-y-6">
          <Card className="p-6 border-[#e2e8f0] bg-[#f9fafb]">
            <RosterManagement />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
