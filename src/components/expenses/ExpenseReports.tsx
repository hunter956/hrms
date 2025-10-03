import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type ReportRow = {
  month: string;
  travel: number;
  meals: number;
  accommodation: number;
  supplies: number;
  other: number;
};

const mock: ReportRow[] = [
  { month: "2025-06", travel: 42000, meals: 8600, accommodation: 38000, supplies: 3500, other: 1200 },
  { month: "2025-07", travel: 51500, meals: 9400, accommodation: 40250, supplies: 2800, other: 900 },
  { month: "2025-08", travel: 46800, meals: 10200, accommodation: 37600, supplies: 4100, other: 1500 },
  { month: "2025-09", travel: 55250, meals: 11800, accommodation: 44100, supplies: 3200, other: 1100 },
];

export default function ExpenseReports() {
  const totals = useMemo(() => {
    return mock.reduce(
      (acc, r) => ({
        travel: acc.travel + r.travel,
        meals: acc.meals + r.meals,
        accommodation: acc.accommodation + r.accommodation,
        supplies: acc.supplies + r.supplies,
        other: acc.other + r.other,
      }),
      { travel: 0, meals: 0, accommodation: 0, supplies: 0, other: 0 }
    );
  }, []);

  const grandTotal = totals.travel + totals.meals + totals.accommodation + totals.supplies + totals.other;

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Travel</CardTitle>
          </CardHeader>
          <CardContent className="text-xl font-semibold">₹{totals.travel.toLocaleString()}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Meals</CardTitle>
          </CardHeader>
          <CardContent className="text-xl font-semibold">₹{totals.meals.toLocaleString()}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Accommodation</CardTitle>
          </CardHeader>
          <CardContent className="text-xl font-semibold">₹{totals.accommodation.toLocaleString()}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Supplies</CardTitle>
          </CardHeader>
          <CardContent className="text-xl font-semibold">₹{totals.supplies.toLocaleString()}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Other</CardTitle>
          </CardHeader>
          <CardContent className="text-xl font-semibold">₹{totals.other.toLocaleString()}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Expense Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead className="text-right">Travel</TableHead>
                  <TableHead className="text-right">Meals</TableHead>
                  <TableHead className="text-right">Accommodation</TableHead>
                  <TableHead className="text-right">Supplies</TableHead>
                  <TableHead className="text-right">Other</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mock.map((r) => {
                  const rowTotal = r.travel + r.meals + r.accommodation + r.supplies + r.other;
                  return (
                    <TableRow key={r.month}>
                      <TableCell>{r.month}</TableCell>
                      <TableCell className="text-right">₹{r.travel.toLocaleString()}</TableCell>
                      <TableCell className="text-right">₹{r.meals.toLocaleString()}</TableCell>
                      <TableCell className="text-right">₹{r.accommodation.toLocaleString()}</TableCell>
                      <TableCell className="text-right">₹{r.supplies.toLocaleString()}</TableCell>
                      <TableCell className="text-right">₹{r.other.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-medium">₹{rowTotal.toLocaleString()}</TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell className="font-medium">Grand Total</TableCell>
                  <TableCell colSpan={5}></TableCell>
                  <TableCell className="text-right font-semibold">₹{grandTotal.toLocaleString()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


