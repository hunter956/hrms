import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Plus, Edit, Trash2, DollarSign } from "lucide-react";
import { format } from "date-fns";

export default function SalaryStructure() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      employee_id: "",
      basic_salary: "",
      hra: "",
      transport_allowance: "",
      medical_allowance: "",
      special_allowance: "",
      other_allowances: "",
      effective_from: format(new Date(), "yyyy-MM-dd"),
    },
  });

  const { data: structures, isLoading } = useQuery({
    queryKey: ["salary-structures"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("salary_structures")
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
        basic_salary: parseFloat(values.basic_salary) || 0,
        hra: parseFloat(values.hra) || 0,
        transport_allowance: parseFloat(values.transport_allowance) || 0,
        medical_allowance: parseFloat(values.medical_allowance) || 0,
        special_allowance: parseFloat(values.special_allowance) || 0,
        other_allowances: parseFloat(values.other_allowances) || 0,
      };

      if (editingId) {
        const { error } = await supabase
          .from("salary_structures")
          .update(payload)
          .eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("salary_structures")
          .insert([payload]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["salary-structures"] });
      toast.success(editingId ? "Salary structure updated" : "Salary structure created");
      setIsDialogOpen(false);
      setEditingId(null);
      form.reset();
    },
    onError: (error) => {
      toast.error("Failed to save salary structure: " + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("salary_structures")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["salary-structures"] });
      toast.success("Salary structure deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete: " + error.message);
    },
  });

  const handleEdit = (structure: any) => {
    setEditingId(structure.id);
    form.reset({
      employee_id: structure.employee_id,
      basic_salary: structure.basic_salary.toString(),
      hra: structure.hra.toString(),
      transport_allowance: structure.transport_allowance.toString(),
      medical_allowance: structure.medical_allowance.toString(),
      special_allowance: structure.special_allowance.toString(),
      other_allowances: structure.other_allowances.toString(),
      effective_from: structure.effective_from,
    });
    setIsDialogOpen(true);
  };

  const calculateTotal = (structure: any) => {
    return (
      parseFloat(structure.basic_salary) +
      parseFloat(structure.hra) +
      parseFloat(structure.transport_allowance) +
      parseFloat(structure.medical_allowance) +
      parseFloat(structure.special_allowance) +
      parseFloat(structure.other_allowances)
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Salary Structure Management
            </CardTitle>
            <CardDescription>
              Define salary components for employees
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingId(null); form.reset(); }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Structure
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit" : "Add"} Salary Structure
                </DialogTitle>
                <DialogDescription>
                  Define salary components for an employee
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
                      name="basic_salary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Basic Salary</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" step="0.01" placeholder="0.00" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hra"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>HRA</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" step="0.01" placeholder="0.00" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="transport_allowance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Transport Allowance</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" step="0.01" placeholder="0.00" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="medical_allowance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Medical Allowance</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" step="0.01" placeholder="0.00" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="special_allowance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Allowance</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" step="0.01" placeholder="0.00" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="other_allowances"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Other Allowances</FormLabel>
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
                <TableHead>Basic</TableHead>
                <TableHead>HRA</TableHead>
                <TableHead>Transport</TableHead>
                <TableHead>Medical</TableHead>
                <TableHead>Special</TableHead>
                <TableHead>Other</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Effective From</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {structures?.map((structure) => (
                <TableRow key={structure.id}>
                  <TableCell>{structure.employee_id}</TableCell>
                  <TableCell>₹{structure.basic_salary}</TableCell>
                  <TableCell>₹{structure.hra}</TableCell>
                  <TableCell>₹{structure.transport_allowance}</TableCell>
                  <TableCell>₹{structure.medical_allowance}</TableCell>
                  <TableCell>₹{structure.special_allowance}</TableCell>
                  <TableCell>₹{structure.other_allowances}</TableCell>
                  <TableCell className="font-semibold">
                    ₹{calculateTotal(structure).toFixed(2)}
                  </TableCell>
                  <TableCell>{format(new Date(structure.effective_from), "PP")}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(structure)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteMutation.mutate(structure.id)}
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
