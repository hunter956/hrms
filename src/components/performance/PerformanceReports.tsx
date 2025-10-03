import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart, LineChart, Download, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PerformanceReports() {
  const departmentData = [
    { department: "Sales", avgRating: 4.3, employees: 28, topPerformers: 6 },
    { department: "Engineering", avgRating: 4.2, employees: 45, topPerformers: 8 },
    { department: "Customer Success", avgRating: 4.1, employees: 22, topPerformers: 4 },
    { department: "Marketing", avgRating: 4.0, employees: 18, topPerformers: 3 },
    { department: "Operations", avgRating: 3.9, employees: 32, topPerformers: 5 },
  ];

  const trendData = [
    { period: "Q1 2024", avgRating: 3.8, reviews: 145 },
    { period: "Q2 2024", avgRating: 4.0, reviews: 148 },
    { period: "Q3 2024", avgRating: 4.1, reviews: 152 },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              Report Filters
            </CardTitle>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Select defaultValue="q3-2024">
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="q3-2024">Q3 2024</SelectItem>
                  <SelectItem value="q2-2024">Q2 2024</SelectItem>
                  <SelectItem value="q1-2024">Q1 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="cs">Customer Success</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select rating range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="high">4.5+ (Outstanding)</SelectItem>
                  <SelectItem value="good">4.0-4.4 (Good)</SelectItem>
                  <SelectItem value="average">3.0-3.9 (Average)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              Performance by Department
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentData.map((dept, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{dept.department}</span>
                      <Badge variant="secondary">{dept.employees} employees</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Avg Rating: {dept.avgRating}</span>
                      <span>Top Performers: {dept.topPerformers}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {dept.avgRating}
                    </div>
                    <div className="text-xs text-muted-foreground">/ 5.0</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-primary" />
              Performance Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trendData.map((trend, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <div className="font-semibold mb-1">{trend.period}</div>
                    <div className="text-sm text-muted-foreground">
                      {trend.reviews} reviews completed
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {trend.avgRating}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {index > 0 && trend.avgRating > trendData[index - 1].avgRating && (
                        <span className="text-green-600">
                          +{(trend.avgRating - trendData[index - 1].avgRating).toFixed(1)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <Badge className="mt-1">Trend</Badge>
              <p className="text-sm">
                Overall performance has improved by 0.3 points over the last three quarters,
                indicating positive organizational growth.
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <Badge className="mt-1" variant="secondary">
                Top Department
              </Badge>
              <p className="text-sm">
                Sales department leads with an average rating of 4.3, driven by strong goal
                achievement and customer satisfaction metrics.
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <Badge className="mt-1" variant="secondary">
                Opportunity
              </Badge>
              <p className="text-sm">
                Operations department shows potential for improvement with focused training
                and development initiatives.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
