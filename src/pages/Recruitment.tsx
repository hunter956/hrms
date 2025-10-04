import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { JobPostings } from "@/components/recruitment/JobPostings";
import { Applications } from "@/components/recruitment/Applications";
import { Interviews } from "@/components/recruitment/Interviews";
import { OfferLetters } from "@/components/recruitment/OfferLetters";
import { OnboardingChecklist } from "@/components/recruitment/OnboardingChecklist";
import { RecruitmentStats } from "@/components/recruitment/RecruitmentStats";
import { Briefcase, Users, Calendar, FileText, ClipboardCheck } from "lucide-react";

export default function Recruitment() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1e293b]">Recruitment & Onboarding</h1>
        <p className="text-[#64748b]">
          Manage job postings, candidate applications, interviews, and employee onboarding
        </p>
      </div>

      <RecruitmentStats />

      <Tabs defaultValue="jobs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="jobs" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Job Postings
          </TabsTrigger>
          <TabsTrigger value="applications" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Applications
          </TabsTrigger>
          <TabsTrigger value="interviews" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Interviews
          </TabsTrigger>
          <TabsTrigger value="offers" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Offer Letters
          </TabsTrigger>
          <TabsTrigger value="onboarding" className="flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4" />
            Onboarding
          </TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-6">
          <Card className="p-6">
            <JobPostings />
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <Card className="p-6">
            <Applications />
          </Card>
        </TabsContent>

        <TabsContent value="interviews" className="space-y-6">
          <Card className="p-6">
            <Interviews />
          </Card>
        </TabsContent>

        <TabsContent value="offers" className="space-y-6">
          <Card className="p-6">
            <OfferLetters />
          </Card>
        </TabsContent>

        <TabsContent value="onboarding" className="space-y-6">
          <Card className="p-6">
            <OnboardingChecklist />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
