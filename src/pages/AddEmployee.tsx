import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalDetailsForm } from "@/components/employees/PersonalDetailsForm";
import { ProfessionalDetailsForm } from "@/components/employees/ProfessionalDetailsForm";
import { ContactDetailsForm } from "@/components/employees/ContactDetailsForm";
import { DocumentUpload } from "@/components/employees/DocumentUpload";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function AddEmployee() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");
  const [isLoading, setIsLoading] = useState(false);
  
  const [personalData, setPersonalData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    maritalStatus: "",
  });

  const [professionalData, setProfessionalData] = useState({
    department: "",
    position: "",
    startDate: "",
    employmentType: "",
    reportingManager: "",
    workLocation: "",
    salary: "",
  });

  const [contactData, setContactData] = useState({
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });

  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([]);

  const handleSaveEmployee = async () => {
    setIsLoading(true);
    try {
      // For now, we'll simulate saving until the database is set up
      toast({
        title: "Success",
        description: "Employee profile created successfully! Database integration will be available once tables are set up.",
      });

      // Navigate back to employees page
      navigate("/employees");
    } catch (error) {
      console.error("Error saving employee:", error);
      toast({
        title: "Error",
        description: "Failed to save employee. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      personalData.firstName &&
      personalData.lastName &&
      contactData.email &&
      professionalData.department &&
      professionalData.position &&
      professionalData.startDate
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate("/employees")}
          className="hover:bg-[#e0f2fe] hover:text-[#1e293b] transition-all duration-300 hover:scale-[1.02]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Employees
        </Button>
        <div className="relative">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Add New Employee
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Create a comprehensive employee profile
          </p>
          <div className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-primary/10 rounded-full blur-xl"></div>
        </div>
      </div>

      <Card className="bg-gradient-card shadow-elevated border border-border/50">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Employee Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="personal">Personal Details</TabsTrigger>
              <TabsTrigger value="professional">Professional Details</TabsTrigger>
              <TabsTrigger value="contact">Contact Details</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <PersonalDetailsForm
                data={personalData}
                onChange={setPersonalData}
              />
            </TabsContent>

            <TabsContent value="professional" className="space-y-6">
              <ProfessionalDetailsForm
                data={professionalData}
                onChange={setProfessionalData}
              />
            </TabsContent>

            <TabsContent value="contact" className="space-y-6">
              <ContactDetailsForm
                data={contactData}
                onChange={setContactData}
              />
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <DocumentUpload
                onUpload={(documentUrls) => setUploadedDocuments(documentUrls)}
                uploadedDocuments={uploadedDocuments}
              />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-border/50">
            <Button
              variant="outline"
              onClick={() => navigate("/employees")}
              className="hover:bg-[#e0f2fe] hover:text-[#1e293b] transition-all duration-300 hover:scale-[1.02]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEmployee}
              disabled={!isFormValid() || isLoading}
              className="bg-gradient-primary shadow-primary hover:shadow-elevated hover:scale-105 transition-all duration-300 px-6"
            >
              {isLoading ? (
                "Saving..."
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Employee
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}