import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FullAndFinal() {
  const [form, setForm] = useState({
    employee: "",
    basicDue: "0",
    bonus: "0",
    leaveEncashment: "0",
    deductions: "0",
    others: "0",
  });

  const totals = useMemo(() => {
    const basic = Number(form.basicDue) || 0;
    const bonus = Number(form.bonus) || 0;
    const leave = Number(form.leaveEncashment) || 0;
    const others = Number(form.others) || 0;
    const deduct = Number(form.deductions) || 0;
    const gross = basic + bonus + leave + others;
    const net = Math.max(0, gross - deduct);
    return { basic, bonus, leave, others, deduct, gross, net };
  }, [form]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Full & Final Settlement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employee">Employee</Label>
            <Input id="employee" value={form.employee} onChange={(e) => setForm((f) => ({ ...f, employee: e.target.value }))} placeholder="Employee name or ID" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="basicDue">Basic Due</Label>
              <Input id="basicDue" type="number" min="0" step="0.01" value={form.basicDue} onChange={(e) => setForm((f) => ({ ...f, basicDue: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bonus">Bonus</Label>
              <Input id="bonus" type="number" min="0" step="0.01" value={form.bonus} onChange={(e) => setForm((f) => ({ ...f, bonus: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="leaveEncashment">Leave Encashment</Label>
              <Input id="leaveEncashment" type="number" min="0" step="0.01" value={form.leaveEncashment} onChange={(e) => setForm((f) => ({ ...f, leaveEncashment: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="others">Other Earnings</Label>
              <Input id="others" type="number" min="0" step="0.01" value={form.others} onChange={(e) => setForm((f) => ({ ...f, others: e.target.value }))} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="deductions">Deductions</Label>
              <Input id="deductions" type="number" min="0" step="0.01" value={form.deductions} onChange={(e) => setForm((f) => ({ ...f, deductions: e.target.value }))} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Settlement Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Basic Due</div>
            <div className="text-right">₹{totals.basic.toFixed(2)}</div>
            <div>Bonus</div>
            <div className="text-right">₹{totals.bonus.toFixed(2)}</div>
            <div>Leave Encashment</div>
            <div className="text-right">₹{totals.leave.toFixed(2)}</div>
            <div>Other Earnings</div>
            <div className="text-right">₹{totals.others.toFixed(2)}</div>
            <div className="font-medium">Gross</div>
            <div className="text-right font-medium">₹{totals.gross.toFixed(2)}</div>
            <div>Deductions</div>
            <div className="text-right">₹{totals.deduct.toFixed(2)}</div>
            <div className="font-semibold">Net Payable</div>
            <div className="text-right font-semibold">₹{totals.net.toFixed(2)}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


