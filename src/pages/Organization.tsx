import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DepartmentsTab } from "@/components/organization/DepartmentsTab";
import { BranchesTab } from "@/components/organization/BranchesTab";
import { TeamsTab } from "@/components/organization/TeamsTab";
import { DesignationsTab } from "@/components/organization/DesignationsTab";
import { HierarchyTab } from "@/components/organization/HierarchyTab";

export default function Organization() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-[#1e293b]">
          Organization Structure
        </h1>
        <p className="text-[#64748b] mt-2">
          Create & manage departments, branches, teams, roles, and reporting hierarchy
        </p>
      </div>

      <Tabs defaultValue="departments" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-[#f9fafb] border border-[#e2e8f0]">
          <TabsTrigger value="departments" className="data-[state=active]:bg-[#2563eb] data-[state=active]:text-white hover:bg-[#e0f2fe] hover:text-[#1e293b] transition-all duration-300 hover:scale-[1.02]">
            Departments
          </TabsTrigger>
          <TabsTrigger value="branches" className="data-[state=active]:bg-[#2563eb] data-[state=active]:text-white hover:bg-[#e0f2fe] hover:text-[#1e293b] transition-all duration-300 hover:scale-[1.02]">
            Branches
          </TabsTrigger>
          <TabsTrigger value="teams" className="data-[state=active]:bg-[#2563eb] data-[state=active]:text-white hover:bg-[#e0f2fe] hover:text-[#1e293b] transition-all duration-300 hover:scale-[1.02]">
            Teams
          </TabsTrigger>
          <TabsTrigger value="designations" className="data-[state=active]:bg-[#2563eb] data-[state=active]:text-white hover:bg-[#e0f2fe] hover:text-[#1e293b] transition-all duration-300 hover:scale-[1.02]">
            Designations
          </TabsTrigger>
          <TabsTrigger value="hierarchy" className="data-[state=active]:bg-[#2563eb] data-[state=active]:text-white hover:bg-[#e0f2fe] hover:text-[#1e293b] transition-all duration-300 hover:scale-[1.02]">
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
