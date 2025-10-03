import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileText, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function SelfAssessment() {
  const assessmentQuestions = [
    {
      id: "1",
      category: "Goal Achievement",
      question: "How well did you achieve your goals this period?",
    },
    {
      id: "2",
      category: "Quality of Work",
      question: "Rate the quality and accuracy of your work deliverables.",
    },
    {
      id: "3",
      category: "Communication",
      question: "How effectively did you communicate with team members and stakeholders?",
    },
    {
      id: "4",
      category: "Innovation",
      question: "Did you contribute innovative ideas or process improvements?",
    },
    {
      id: "5",
      category: "Collaboration",
      question: "How well did you collaborate with colleagues and cross-functional teams?",
    },
  ];

  const ratingOptions = [
    { value: "5", label: "Exceeds Expectations" },
    { value: "4", label: "Meets Expectations" },
    { value: "3", label: "Partially Meets" },
    { value: "2", label: "Needs Improvement" },
    { value: "1", label: "Unsatisfactory" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Self Assessment Form - Q3 2024
            </CardTitle>
            <Badge>Due: Sep 30, 2024</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Please complete this self-assessment by rating yourself on the following criteria.
              Your responses will be reviewed by your manager during the appraisal process.
            </p>
          </div>

          {assessmentQuestions.map((item, index) => (
            <div key={item.id} className="space-y-4 border-b pb-6 last:border-0">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-lg">Q{index + 1}.</span>
                  <Badge variant="secondary">{item.category}</Badge>
                </div>
                <p className="text-foreground font-medium ml-8">{item.question}</p>
              </div>

              <div className="ml-8 space-y-4">
                <RadioGroup>
                  {ratingOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`${item.id}-${option.value}`} />
                      <Label
                        htmlFor={`${item.id}-${option.value}`}
                        className="font-normal cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="space-y-2">
                  <Label>Additional Comments (Optional)</Label>
                  <Textarea
                    placeholder="Provide specific examples or additional context..."
                    className="min-h-[80px]"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="space-y-4 pt-4">
            <div>
              <Label>Overall Self-Reflection</Label>
              <Textarea
                placeholder="Summarize your achievements, challenges, and areas for development..."
                className="min-h-[120px] mt-2"
              />
            </div>

            <div>
              <Label>Goals for Next Period</Label>
              <Textarea
                placeholder="What goals would you like to set for the upcoming period?"
                className="min-h-[100px] mt-2"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline">Save Draft</Button>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Submit Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
