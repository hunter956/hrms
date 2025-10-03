import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Network } from "lucide-react";

export function HierarchyTab() {
  const { data: hierarchyLevels, isLoading } = useQuery({
    queryKey: ["hierarchy_levels"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hierarchy_levels")
        .select("*")
        .order("level_number");
      if (error) throw error;
      return data;
    },
  });

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("departments")
        .select("*, parent:parent_department_id(name)")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
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
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hierarchyLevels?.map((level) => (
                <Card key={level.id} className="bg-gradient-to-br from-card to-card/80 border-border/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{level.level_name}</CardTitle>
                      <Badge variant="outline">Level {level.level_number}</Badge>
                    </div>
                    <CardDescription className="text-sm">
                      {level.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

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
                          <Badge variant="secondary">Parent</Badge>
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
                                <Badge variant="outline" className="text-xs">Child</Badge>
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
    </div>
  );
}
