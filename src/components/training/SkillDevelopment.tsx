import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TrendingUp, Target } from "lucide-react";

const SkillDevelopment = () => {
  const skills = [
    {
      id: 1,
      employee: "Alice Johnson",
      skillName: "Project Management",
      currentLevel: "Intermediate",
      targetLevel: "Advanced",
      progress: 65,
      lastAssessed: "2024-03-15",
      trainingCompleted: 3,
      status: "In Progress",
    },
    {
      id: 2,
      employee: "Bob Smith",
      skillName: "Data Analysis",
      currentLevel: "Beginner",
      targetLevel: "Intermediate",
      progress: 40,
      lastAssessed: "2024-03-10",
      trainingCompleted: 2,
      status: "In Progress",
    },
    {
      id: 3,
      employee: "Carol Davis",
      skillName: "Leadership",
      currentLevel: "Advanced",
      targetLevel: "Expert",
      progress: 85,
      lastAssessed: "2024-03-20",
      trainingCompleted: 5,
      status: "On Track",
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "secondary";
      case "Intermediate":
        return "default";
      case "Advanced":
        return "default";
      case "Expert":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Skill Development Tracking</CardTitle>
            <CardDescription>Monitor employee skill progression and development goals</CardDescription>
          </div>
          <Button>
            <Target className="mr-2 h-4 w-4" />
            Set Development Goals
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Skill</TableHead>
              <TableHead>Current Level</TableHead>
              <TableHead>Target Level</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Training Completed</TableHead>
              <TableHead>Last Assessed</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills.map((skill) => (
              <TableRow key={skill.id}>
                <TableCell className="font-medium">{skill.employee}</TableCell>
                <TableCell>{skill.skillName}</TableCell>
                <TableCell>
                  <Badge variant={getLevelColor(skill.currentLevel)}>
                    {skill.currentLevel}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getLevelColor(skill.targetLevel)}>
                    {skill.targetLevel}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={skill.progress} className="w-20" />
                    <span className="text-sm">{skill.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>{skill.trainingCompleted} sessions</TableCell>
                <TableCell>
                  {new Date(skill.lastAssessed).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge variant={skill.status === "On Track" ? "default" : "secondary"}>
                    {skill.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <TrendingUp className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SkillDevelopment;
