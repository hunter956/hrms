import Biometric from "@/components/integrations/Biometric";
import Notifications from "@/components/integrations/Notifications";
import ThirdPartyApps from "@/components/integrations/ThirdPartyApps";
import APISupport from "@/components/integrations/APISupport";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Integrations() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Integration Features</h2>
        <p className="text-muted-foreground">Biometric attendance, notifications, app integrations, and API connectivity.</p>
      </div>
      <Tabs defaultValue="biometric" className="w-full">
        <TabsList className="w-full max-w-full flex flex-wrap gap-2">
          <TabsTrigger value="biometric">Biometric</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="apps">Third-Party Apps</TabsTrigger>
          <TabsTrigger value="api">API Support</TabsTrigger>
        </TabsList>
        <TabsContent value="biometric" className="space-y-6">
          <Biometric />
        </TabsContent>
        <TabsContent value="notifications" className="space-y-6">
          <Notifications />
        </TabsContent>
        <TabsContent value="apps" className="space-y-6">
          <ThirdPartyApps />
        </TabsContent>
        <TabsContent value="api" className="space-y-6">
          <APISupport />
        </TabsContent>
      </Tabs>
    </div>
  );
}


