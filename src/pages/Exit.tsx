import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ResignationWorkflow from "@/components/exit/ResignationWorkflow";
import ExitInterviews from "@/components/exit/ExitInterviews";
import ClearanceChecklist from "@/components/exit/ClearanceChecklist";
import FullAndFinal from "@/components/exit/FullAndFinal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Exit() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Employee Management
      </Button>

      <div>
        <h2 className="text-2xl font-bold tracking-tight">Separation & Exit Management</h2>
        <p className="text-muted-foreground">Resignations, interviews, clearances and full & final settlements.</p>
      </div>

      <Tabs defaultValue="resignations" className="w-full">
        <TabsList className="w-full max-w-full flex flex-wrap gap-2">
          <TabsTrigger value="resignations">Resignation Workflow</TabsTrigger>
          <TabsTrigger value="interviews">Exit Interviews</TabsTrigger>
          <TabsTrigger value="clearance">Clearance Checklist</TabsTrigger>
          <TabsTrigger value="fnf">Full & Final</TabsTrigger>
        </TabsList>
        <TabsContent value="resignations" className="space-y-6">
          <ResignationWorkflow />
        </TabsContent>
        <TabsContent value="interviews" className="space-y-6">
          <ExitInterviews />
        </TabsContent>
        <TabsContent value="clearance" className="space-y-6">
          <ClearanceChecklist />
        </TabsContent>
        <TabsContent value="fnf" className="space-y-6">
          <FullAndFinal />
        </TabsContent>
      </Tabs>
    </div>
  );
}