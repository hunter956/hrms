import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProfessionalDetailsData {
  department: string;
  position: string;
  startDate: string;
  employmentType: string;
  reportingManager: string;
  workLocation: string;
  salary: string;
}

interface ProfessionalDetailsFormProps {
  data: ProfessionalDetailsData;
  onChange: (data: ProfessionalDetailsData) => void;
}

export function ProfessionalDetailsForm({ data, onChange }: ProfessionalDetailsFormProps) {
  const handleInputChange = (field: keyof ProfessionalDetailsData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="department" className="text-sm font-medium">
          Department *
        </Label>
        <Select value={data.department} onValueChange={(value) => handleInputChange("department", value)}>
          <SelectTrigger className="bg-background/90 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300">
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="hr">Human Resources</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="operations">Operations</SelectItem>
            <SelectItem value="legal">Legal</SelectItem>
            <SelectItem value="it">Information Technology</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="position" className="text-sm font-medium">
          Position *
        </Label>
        <Input
          id="position"
          value={data.position}
          onChange={(e) => handleInputChange("position", e.target.value)}
          placeholder="Enter job position"
          className="bg-background/90 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="startDate" className="text-sm font-medium">
          Start Date *
        </Label>
        <Input
          id="startDate"
          type="date"
          value={data.startDate}
          onChange={(e) => handleInputChange("startDate", e.target.value)}
          className="bg-background/90 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="employmentType" className="text-sm font-medium">
          Employment Type
        </Label>
        <Select value={data.employmentType} onValueChange={(value) => handleInputChange("employmentType", value)}>
          <SelectTrigger className="bg-background/90 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300">
            <SelectValue placeholder="Select employment type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full_time">Full Time</SelectItem>
            <SelectItem value="part_time">Part Time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
            <SelectItem value="intern">Intern</SelectItem>
            <SelectItem value="consultant">Consultant</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reportingManager" className="text-sm font-medium">
          Reporting Manager
        </Label>
        <Input
          id="reportingManager"
          value={data.reportingManager}
          onChange={(e) => handleInputChange("reportingManager", e.target.value)}
          placeholder="Enter reporting manager name"
          className="bg-background/90 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="workLocation" className="text-sm font-medium">
          Work Location
        </Label>
        <Input
          id="workLocation"
          value={data.workLocation}
          onChange={(e) => handleInputChange("workLocation", e.target.value)}
          placeholder="Enter work location"
          className="bg-background/90 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
        />
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="salary" className="text-sm font-medium">
          Annual Salary (Optional)
        </Label>
        <Input
          id="salary"
          type="number"
          value={data.salary}
          onChange={(e) => handleInputChange("salary", e.target.value)}
          placeholder="Enter annual salary"
          className="bg-background/90 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
        />
      </div>
    </div>
  );
}