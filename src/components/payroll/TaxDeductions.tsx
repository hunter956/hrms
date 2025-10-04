import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Plus, Edit, Trash2, Receipt } from "lucide-react";
import { format } from "date-fns";

export default function TaxDeductions() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      employee_id: "",
      tds: "",
      pf: "",
      esi: "",
      professional_tax: "",
      gratuity: "",
      other_deductions: "",
      effective_from: format(new Date(), "yyyy-MM-dd"),
    },
  });

  const { data: deductions, isLoading } = useQuery({
    queryKey: ["tax-deductions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tax_deductions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (values: any) => {
      const payload = {
        ...values,
        tds: parseFloat(values.tds) || 0,
        pf: parseFloat(values.pf) || 0,
        esi: parseFloat(values.esi) || 0,
        professional_tax: parseFloat(values.professional_tax) || 0,
        gratuity: parseFloat(values.gratuity) || 0,
        other_deductions: parseFloat(values.other_deductions) || 0,
      };

      if (editingId) {
        const { error } = await supabase
          .from("tax_deductions")
          .update(payload)
          .eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("tax_deductions")
          .insert([payload]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tax-deductions"] });
      toast.success(editingId ? "Tax deductions updated" : "Tax deductions created");
      setIsDialogOpen(false);
      setEditingId(null);
      form.reset();
    },
    onError: (error) => {
      toast.error("Failed to save tax deductions: " + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("tax_deductions")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tax-deductions"] });
      toast.success("Tax deductions deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete: " + error.message);
    },
  });

  const handleEdit = (deduction: any) => {
    setEditingId(deduction.id);
    form.reset({
      employee_id: deduction.employee_id,
      tds: deduction.tds.toString(),
      pf: deduction.pf.toString(),
      esi: deduction.esi.toString(),
      professional_tax: deduction.professional_tax.toString(),
      gratuity: deduction.gratuity.toString(),
      other_deductions: deduction.other_deductions.toString(),
      effective_from: deduction.effective_from,
    });
    setIsDialogOpen(true);
  };

  const calculateTotal = (deduction: any) => {
    return (
      parseFloat(deduction.tds) +
      parseFloat(deduction.pf) +
      parseFloat(deduction.esi) +
      parseFloat(deduction.professional_tax) +
      parseFloat(deduction.gratuity) +
      parseFloat(deduction.other_deductions)
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Tax Deductions Management
            </CardTitle>
            <CardDescription>
              Configure TDS, PF, ESI, and other statutory deductions
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingId(null); form.reset(); }}  className="px-6 py-3 h-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Deductions
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit" : "Add"} Tax Deductions
                </DialogTitle>
                <DialogDescription>
                  Configure tax deductions for an employee
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => saveMutation.mutate(data))} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="employee_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employee ID</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter employee ID" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="tds"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>TDS</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" step="0.01" placeholder="0.00" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pf"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PF (Provident Fund)</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" step="0.01" placeholder="0.00" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="esi"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ESI</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" step="0.01" placeholder="0.00" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="professional_tax"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Professional Tax</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" step="0.01" placeholder="0.00" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gratuity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gratuity</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" step="0.01" placeholder="0.00" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="other_deductions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Other Deductions</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" step="0.01" placeholder="0.00" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="effective_from"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Effective From</FormLabel>
                        <FormControl>
                          <Input {...field} type="date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={saveMutation.isPending}>
                      {saveMutation.isPending ? "Saving..." : "Save"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>TDS</TableHead>
                <TableHead>PF</TableHead>
                <TableHead>ESI</TableHead>
                <TableHead>Professional Tax</TableHead>
                <TableHead>Gratuity</TableHead>
                <TableHead>Other</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Effective From</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deductions?.map((deduction) => (
                <TableRow key={deduction.id}>
                  <TableCell>{deduction.employee_id}</TableCell>
                  <TableCell>₹{deduction.tds}</TableCell>
                  <TableCell>₹{deduction.pf}</TableCell>
                  <TableCell>₹{deduction.esi}</TableCell>
                  <TableCell>₹{deduction.professional_tax}</TableCell>
                  <TableCell>₹{deduction.gratuity}</TableCell>
                  <TableCell>₹{deduction.other_deductions}</TableCell>
                  <TableCell className="font-semibold">
                    ₹{calculateTotal(deduction).toFixed(2)}
                  </TableCell>
                  <TableCell>{format(new Date(deduction.effective_from), "PP")}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(deduction)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteMutation.mutate(deduction.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
