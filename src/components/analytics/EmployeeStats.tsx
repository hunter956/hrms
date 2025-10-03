import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function EmployeeStats() {
  const headcountByDept = useMemo(
    () => [
      { department: "Engineering", headcount: 42, female: 10 },
      { department: "Sales", headcount: 28, female: 9 },
      { department: "HR", headcount: 7, female: 5 },
      { department: "Finance", headcount: 9, female: 4 },
    ],
    []
  );

  const totals = useMemo(() => {
    const total = headcountByDept.reduce((s, d) => s + d.headcount, 0);
    const female = headcountByDept.reduce((s, d) => s + d.female, 0);
    const male = total - female;
    const diversity = total ? Math.round((female / total) * 100) : 0;
    const attritionRate = 9; // sample static for demo
    const retentionRate = 100 - attritionRate;
    return { total, female, male, diversity, attritionRate, retentionRate };
  }, [headcountByDept]);

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Headcount</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{totals.total}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Retention</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{totals.retentionRate}%</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Attrition</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{totals.attritionRate}%</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Diversity (F%)</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{totals.diversity}%</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Female</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{totals.female}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Headcount by Department</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">Headcount</TableHead>
                  <TableHead className="text-right">Female</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {headcountByDept.map((d) => (
                  <TableRow key={d.department}>
                    <TableCell>{d.department}</TableCell>
                    <TableCell className="text-right">{d.headcount}</TableCell>
                    <TableCell className="text-right">{d.female}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


