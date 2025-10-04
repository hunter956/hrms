import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrainingStats from "@/components/training/TrainingStats";
import TrainingSessions from "@/components/training/TrainingSessions";
import TrainingParticipation from "@/components/training/TrainingParticipation";
import SkillDevelopment from "@/components/training/SkillDevelopment";
import CertificationCompliance from "@/components/training/CertificationCompliance";

const Training = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1e293b]">Training & Development</h1>
        <p className="text-[#64748b]">
          Manage employee training programs and track skill development
        </p>
      </div>

      <TrainingStats />

      <Tabs defaultValue="sessions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sessions">Training Sessions</TabsTrigger>
          <TabsTrigger value="participation">Participation</TabsTrigger>
          <TabsTrigger value="skills">Skill Development</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
        </TabsList>

        <TabsContent value="sessions">
          <TrainingSessions />
        </TabsContent>

        <TabsContent value="participation">
          <TrainingParticipation />
        </TabsContent>

        <TabsContent value="skills">
          <SkillDevelopment />
        </TabsContent>

        <TabsContent value="certifications">
          <CertificationCompliance />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Training;
