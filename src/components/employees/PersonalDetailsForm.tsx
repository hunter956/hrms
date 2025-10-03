import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PersonalDetailsData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  maritalStatus: string;
}

interface PersonalDetailsFormProps {
  data: PersonalDetailsData;
  onChange: (data: PersonalDetailsData) => void;
}

export function PersonalDetailsForm({ data, onChange }: PersonalDetailsFormProps) {
  const handleInputChange = (field: keyof PersonalDetailsData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="firstName" className="text-sm font-medium">
          First Name *
        </Label>
        <Input
          id="firstName"
          value={data.firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
          placeholder="Enter first name"
          className="bg-background/90 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName" className="text-sm font-medium">
          Last Name *
        </Label>
        <Input
          id="lastName"
          value={data.lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
          placeholder="Enter last name"
          className="bg-background/90 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth" className="text-sm font-medium">
          Date of Birth
        </Label>
        <Input
          id="dateOfBirth"
          type="date"
          value={data.dateOfBirth}
          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
          className="bg-background/90 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender" className="text-sm font-medium">
          Gender
        </Label>
        <Select value={data.gender} onValueChange={(value) => handleInputChange("gender", value)}>
          <SelectTrigger className="bg-background/90 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
            <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nationality" className="text-sm font-medium">
          Nationality
        </Label>
        <Input
          id="nationality"
          value={data.nationality}
          onChange={(e) => handleInputChange("nationality", e.target.value)}
          placeholder="Enter nationality"
          className="bg-background/90 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="maritalStatus" className="text-sm font-medium">
          Marital Status
        </Label>
        <Select value={data.maritalStatus} onValueChange={(value) => handleInputChange("maritalStatus", value)}>
          <SelectTrigger className="bg-background/90 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300">
            <SelectValue placeholder="Select marital status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="single">Single</SelectItem>
            <SelectItem value="married">Married</SelectItem>
            <SelectItem value="divorced">Divorced</SelectItem>
            <SelectItem value="widowed">Widowed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}