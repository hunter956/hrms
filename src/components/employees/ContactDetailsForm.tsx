import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ContactDetailsData {
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

interface ContactDetailsFormProps {
  data: ContactDetailsData;
  onChange: (data: ContactDetailsData) => void;
}

export function ContactDetailsForm({ data, onChange }: ContactDetailsFormProps) {
  const handleInputChange = (field: keyof ContactDetailsData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-8">
      {/* Primary Contact Information */}
      <div>
        <h3 className="text-lg font-semibold text-primary mb-4">Primary Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter email address"
              className="bg-background/90 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={data.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="Enter phone number"
              className="bg-background/90 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div>
        <h3 className="text-lg font-semibold text-primary mb-4">Address</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium">
              Street Address
            </Label>
            <Textarea
              id="address"
              value={data.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Enter street address"
              className="bg-background/90 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-medium">
                City
              </Label>
              <Input
                id="city"
                value={data.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                placeholder="Enter city"
                className="bg-background/90 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state" className="text-sm font-medium">
                State/Province
              </Label>
              <Input
                id="state"
                value={data.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                placeholder="Enter state/province"
                className="bg-background/90 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode" className="text-sm font-medium">
                ZIP/Postal Code
              </Label>
              <Input
                id="zipCode"
                value={data.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                placeholder="Enter ZIP code"
                className="bg-background/90 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div>
        <h3 className="text-lg font-semibold text-primary mb-4">Emergency Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="emergencyContactName" className="text-sm font-medium">
              Emergency Contact Name
            </Label>
            <Input
              id="emergencyContactName"
              value={data.emergencyContactName}
              onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
              placeholder="Enter emergency contact name"
              className="bg-background/90 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyContactPhone" className="text-sm font-medium">
              Emergency Contact Phone
            </Label>
            <Input
              id="emergencyContactPhone"
              type="tel"
              value={data.emergencyContactPhone}
              onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
              placeholder="Enter emergency contact phone"
              className="bg-background/90 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}