import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, TrendingUp, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function PerformanceRating() {
  const ratings = [
    {
      id: "1",
      employee: "John Doe",
      position: "Senior Sales Executive",
      department: "Sales",
      period: "Q3 2024",
      selfRating: 4.2,
      managerRating: 4.5,
      finalRating: 4.4,
      status: "completed",
      trend: "up",
    },
    {
      id: "2",
      employee: "Jane Smith",
      position: "Software Engineer",
      department: "Engineering",
      period: "Q3 2024",
      selfRating: 4.0,
      managerRating: 4.2,
      finalRating: 4.1,
      status: "completed",
      trend: "stable",
    },
    {
      id: "3",
      employee: "Mike Johnson",
      position: "Customer Success Manager",
      department: "Customer Success",
      period: "Q3 2024",
      selfRating: 3.8,
      managerRating: 4.0,
      finalRating: 3.9,
      status: "pending",
      trend: "down",
    },
  ];

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-blue-600";
    if (rating >= 3.0) return "text-yellow-600";
    return "text-red-600";
  };

  const getRatingBadge = (rating: number) => {
    if (rating >= 4.5) return { label: "Outstanding", variant: "default" as const };
    if (rating >= 4.0) return { label: "Exceeds", variant: "secondary" as const };
    if (rating >= 3.0) return { label: "Meets", variant: "secondary" as const };
    return { label: "Needs Improvement", variant: "destructive" as const };
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.1 / 5.0</div>
            <Progress value={82} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              +0.2 from previous period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground mt-2">
              Rating ≥ 4.5 (12% of workforce)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Reviews
            </CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <Progress value={87} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              132 of 152 reviews completed
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Performance Ratings Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Self Rating</TableHead>
                <TableHead>Manager Rating</TableHead>
                <TableHead>Final Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ratings.map((rating) => {
                const badge = getRatingBadge(rating.finalRating);
                return (
                  <TableRow key={rating.id}>
                    <TableCell className="font-medium">
                      {rating.employee}
                    </TableCell>
                    <TableCell>{rating.position}</TableCell>
                    <TableCell>{rating.department}</TableCell>
                    <TableCell>{rating.period}</TableCell>
                    <TableCell>
                      <span className={getRatingColor(rating.selfRating)}>
                        {rating.selfRating.toFixed(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={getRatingColor(rating.managerRating)}>
                        {rating.managerRating.toFixed(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-bold ${getRatingColor(
                            rating.finalRating
                          )}`}
                        >
                          {rating.finalRating.toFixed(1)}
                        </span>
                        <Badge variant={badge.variant}>{badge.label}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          rating.status === "completed"
                            ? "secondary"
                            : "default"
                        }
                      >
                        {rating.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
