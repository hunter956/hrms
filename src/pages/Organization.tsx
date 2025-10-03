import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DepartmentsTab } from "@/components/organization/DepartmentsTab";
import { BranchesTab } from "@/components/organization/BranchesTab";
import { TeamsTab } from "@/components/organization/TeamsTab";
import { DesignationsTab } from "@/components/organization/DesignationsTab";
import { HierarchyTab } from "@/components/organization/HierarchyTab";

export default function Organization() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Organization Structure
        </h1>
        <p className="text-muted-foreground mt-2">
          Create & manage departments, branches, teams, roles, and reporting hierarchy
        </p>
      </div>

      <Tabs defaultValue="departments" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-card border border-border/50">
          <TabsTrigger value="departments" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
            Departments
          </TabsTrigger>
          <TabsTrigger value="branches" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
            Branches
          </TabsTrigger>
          <TabsTrigger value="teams" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
            Teams
          </TabsTrigger>
          <TabsTrigger value="designations" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
            Designations
          </TabsTrigger>
          <TabsTrigger value="hierarchy" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
            Hierarchy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="departments" className="mt-6">
          <DepartmentsTab />
        </TabsContent>

        <TabsContent value="branches" className="mt-6">
          <BranchesTab />
        </TabsContent>

        <TabsContent value="teams" className="mt-6">
          <TeamsTab />
        </TabsContent>

        <TabsContent value="designations" className="mt-6">
          <DesignationsTab />
        </TabsContent>

        <TabsContent value="hierarchy" className="mt-6">
          <HierarchyTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
