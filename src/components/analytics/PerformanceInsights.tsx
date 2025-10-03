import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function PerformanceInsights() {
  const distribution = useMemo(
    () => [
      { rating: "5 - Outstanding", count: 14 },
      { rating: "4 - Exceeds", count: 38 },
      { rating: "3 - Meets", count: 60 },
      { rating: "2 - Below", count: 9 },
      { rating: "1 - Needs Improvement", count: 3 },
    ],
    []
  );

  const total = distribution.reduce((s, r) => s + r.count, 0);
  const topBandPct = Math.round(((distribution[0].count + distribution[1].count) / total) * 100);

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Reviews</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{total}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Band (4-5)</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{topBandPct}%</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Improvement Needed (≤2)</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{distribution[3].count + distribution[4].count}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rating Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Count</TableHead>
                  <TableHead className="text-right">Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {distribution.map((r) => (
                  <TableRow key={r.rating}>
                    <TableCell>{r.rating}</TableCell>
                    <TableCell className="text-right">{r.count}</TableCell>
                    <TableCell className="text-right">{Math.round((r.count / total) * 100)}%</TableCell>
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


