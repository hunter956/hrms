import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, Eye, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ManagerReview() {
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  const pendingReviews = [
    {
      id: "1",
      employee: "John Doe",
      position: "Senior Sales Executive",
      period: "Q3 2024",
      submittedDate: "2024-09-25",
      status: "pending",
    },
    {
      id: "2",
      employee: "Jane Smith",
      position: "Software Engineer",
      period: "Q3 2024",
      submittedDate: "2024-09-23",
      status: "pending",
    },
    {
      id: "3",
      employee: "Mike Johnson",
      position: "Customer Success Manager",
      period: "Q3 2024",
      submittedDate: "2024-09-28",
      status: "in-progress",
    },
  ];

  const ratingOptions = [
    { value: "5", label: "Outstanding (5)" },
    { value: "4", label: "Exceeds Expectations (4)" },
    { value: "3", label: "Meets Expectations (3)" },
    { value: "2", label: "Needs Improvement (2)" },
    { value: "1", label: "Unsatisfactory (1)" },
  ];

  const reviewCriteria = [
    "Goal Achievement",
    "Quality of Work",
    "Communication",
    "Innovation",
    "Collaboration",
    "Leadership",
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-primary" />
            Pending Manager Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.employee}</TableCell>
                  <TableCell>{review.position}</TableCell>
                  <TableCell>{review.period}</TableCell>
                  <TableCell>{review.submittedDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        review.status === "pending"
                          ? "secondary"
                          : "default"
                      }
                    >
                      {review.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          onClick={() => setSelectedEmployee(review.employee)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>
                            Manager Review - {review.employee}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">
                              Employee Self-Assessment Summary
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              View the employee's self-assessment ratings and comments here.
                              This section would show the actual data submitted by the employee.
                            </p>
                          </div>

                          <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Manager Evaluation</h3>
                            {reviewCriteria.map((criteria, index) => (
                              <div key={index} className="space-y-3 border-b pb-4 last:border-0">
                                <Label className="text-base font-medium">
                                  {criteria}
                                </Label>
                                <RadioGroup>
                                  {ratingOptions.map((option) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center space-x-2"
                                    >
                                      <RadioGroupItem
                                        value={option.value}
                                        id={`${criteria}-${option.value}`}
                                      />
                                      <Label
                                        htmlFor={`${criteria}-${option.value}`}
                                        className="font-normal cursor-pointer"
                                      >
                                        {option.label}
                                      </Label>
                                    </div>
                                  ))}
                                </RadioGroup>
                                <Textarea
                                  placeholder="Manager's comments and justification..."
                                  className="mt-2"
                                />
                              </div>
                            ))}
                          </div>

                          <div className="space-y-4">
                            <div>
                              <Label>Overall Manager Feedback</Label>
                              <Textarea
                                placeholder="Provide comprehensive feedback on performance, strengths, and areas for improvement..."
                                className="min-h-[120px] mt-2"
                              />
                            </div>

                            <div>
                              <Label>Development Recommendations</Label>
                              <Textarea
                                placeholder="Suggest training, mentoring, or development opportunities..."
                                className="min-h-[100px] mt-2"
                              />
                            </div>

                            <div>
                              <Label>Goals for Next Period</Label>
                              <Textarea
                                placeholder="Define clear goals and expectations for the upcoming period..."
                                className="min-h-[100px] mt-2"
                              />
                            </div>
                          </div>

                          <div className="flex gap-2 justify-end pt-4">
                            <Button variant="outline">Save Draft</Button>
                            <Button>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Submit Review
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
