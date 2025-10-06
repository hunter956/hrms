// import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Network } from "lucide-react";

export function HierarchyTab() {
  // Hardcoded hierarchy levels
  const hierarchyLevels = [
    {
      id: 1,
      level_name: "Executive",
      level_number: 1,
      description: "C-Level executives and top management",
    },
    {
      id: 2,
      level_name: "Senior Management",
      level_number: 2,
      description: "Directors and senior managers",
    },
    {
      id: 3,
      level_name: "Middle Management",
      level_number: 3,
      description: "Department heads and team leads",
    },
    {
      id: 4,
      level_name: "Junior Management",
      level_number: 4,
      description: "Supervisors and junior managers",
    },
    {
      id: 5,
      level_name: "Staff",
      level_number: 5,
      description: "Individual contributors and team members",
    },
  ];

  // Hardcoded branches
  const branches = [
    {
      id: 1,
      name: "Head Office",
      location: "New York, USA",
      description: "Main corporate headquarters",
    },
    {
      id: 2,
      name: "Branch A",
      location: "London, UK",
      description: "European operations center",
    },
    {
      id: 3,
      name: "Branch B",
      location: "Tokyo, Japan",
      description: "APAC regional branch",
    },
  ];

  const departments = [
    {
      id: 1,
      name: "Operations",
      description: "Handles day-to-day operations",
      parent_department_id: null,
    },
    {
      id: 2,
      name: "Finance",
      description: "Manages company finances",
      parent_department_id: null,
    },
    {
      id: 3,
      name: "Payroll",
      description: "Manages employee payroll",
      parent_department_id: 2,
    },
    {
      id: 4,
      name: "Logistics",
      description: "Oversees logistics and supply chain",
      parent_department_id: 1,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Organization Hierarchy Levels */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-elevated">
        <CardHeader className="border-b border-border/50 bg-gradient-primary/5">
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            Organization Hierarchy Levels
          </CardTitle>
          <CardDescription>
            Predefined hierarchy levels in your organization
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hierarchyLevels.map((level) => (
              <Card key={level.id} className="bg-gradient-to-br from-card to-card/80 border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{level.level_name}</CardTitle>
                    <Badge variant="default">Level {level.level_number}</Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {level.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Department Hierarchy */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-elevated">
        <CardHeader className="border-b border-border/50 bg-gradient-primary/5">
          <CardTitle>Department Hierarchy</CardTitle>
          <CardDescription>
            Visual representation of department reporting structure
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {departments && departments.length > 0 ? (
            <div className="space-y-4">
              {departments
                .filter((dept) => !dept.parent_department_id)
                .map((dept) => (
                  <div key={dept.id} className="space-y-2">
                    <Card className="bg-gradient-primary/10 border-primary/20">
                      <CardHeader className="py-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          {dept.name}
                          <Badge variant="default">Parent</Badge>
                        </CardTitle>
                        {dept.description && (
                          <CardDescription className="text-sm">
                            {dept.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                    </Card>
                    {departments
                      .filter((child) => child.parent_department_id === dept.id)
                      .map((child) => (
                        <div key={child.id} className="ml-8">
                          <Card className="bg-card border-border/50">
                            <CardHeader className="py-3">
                              <CardTitle className="text-sm flex items-center gap-2">
                                {child.name}
                                <Badge variant="destructive" className="text-xs">Child</Badge>
                              </CardTitle>
                              {child.description && (
                                <CardDescription className="text-xs">
                                  {child.description}
                                </CardDescription>
                              )}
                            </CardHeader>
                          </Card>
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No departments created yet. Create departments to see the hierarchy.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Branch List */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-elevated">
        <CardHeader className="border-b border-border/50 bg-gradient-primary/5">
          <CardTitle>Branch List</CardTitle>
          <CardDescription>
            Overview of all company branches
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {branches && branches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {branches.map((branch) => (
                <Card key={branch.id} className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">{branch.name}</CardTitle>
                    <CardDescription className="text-sm">{branch.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {branch.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No branches available.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
