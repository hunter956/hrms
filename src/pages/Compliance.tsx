import ComplianceTracking from "@/components/compliance/ComplianceTracking";
import StatutoryReports from "@/components/compliance/StatutoryReports";
import LaborDocs from "@/components/compliance/LaborDocs";
import AuditTrail from "@/components/compliance/AuditTrail";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Compliance() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Compliance & Legal</h2>
        <p className="text-muted-foreground">PF/ESI/TDS tracking, statutory reports, labor documentation and audit trail.</p>
      </div>
      <Tabs defaultValue="tracking" className="w-full">
        <TabsList className="w-full max-w-full flex flex-wrap gap-2">
          <TabsTrigger value="tracking">PF/ESI/TDS Tracking</TabsTrigger>
          <TabsTrigger value="reports">Statutory Reports</TabsTrigger>
          <TabsTrigger value="docs">Labor Documentation</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>
        <TabsContent value="tracking" className="space-y-6">
          <ComplianceTracking />
        </TabsContent>
        <TabsContent value="reports" className="space-y-6">
          <StatutoryReports />
        </TabsContent>
        <TabsContent value="docs" className="space-y-6">
          <LaborDocs />
        </TabsContent>
        <TabsContent value="audit" className="space-y-6">
          <AuditTrail />
        </TabsContent>
      </Tabs>
    </div>
  );
}


