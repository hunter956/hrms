import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const TrainingParticipation = () => {
  const participants = [
    {
      id: 1,
      employeeId: "EMP001",
      name: "Alice Johnson",
      department: "Engineering",
      sessionsEnrolled: 5,
      sessionsCompleted: 4,
      completionRate: 80,
      totalHours: 16,
      status: "Active",
    },
    {
      id: 2,
      employeeId: "EMP002",
      name: "Bob Smith",
      department: "Marketing",
      sessionsEnrolled: 3,
      sessionsCompleted: 3,
      completionRate: 100,
      totalHours: 12,
      status: "Active",
    },
    {
      id: 3,
      employeeId: "EMP003",
      name: "Carol Davis",
      department: "Sales",
      sessionsEnrolled: 4,
      sessionsCompleted: 2,
      completionRate: 50,
      totalHours: 8,
      status: "In Progress",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Training Participation</CardTitle>
            <CardDescription>Track employee training attendance and progress</CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search employees..." className="pl-8" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Sessions Enrolled</TableHead>
              <TableHead>Sessions Completed</TableHead>
              <TableHead>Completion Rate</TableHead>
              <TableHead>Total Hours</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant) => (
              <TableRow key={participant.id}>
                <TableCell className="font-medium">{participant.employeeId}</TableCell>
                <TableCell>{participant.name}</TableCell>
                <TableCell>{participant.department}</TableCell>
                <TableCell>{participant.sessionsEnrolled}</TableCell>
                <TableCell>{participant.sessionsCompleted}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={participant.completionRate} className="w-16" />
                    <span className="text-sm">{participant.completionRate}%</span>
                  </div>
                </TableCell>
                <TableCell>{participant.totalHours}h</TableCell>
                <TableCell>
                  <Badge variant={participant.status === "Active" ? "default" : "secondary"}>
                    {participant.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TrainingParticipation;
