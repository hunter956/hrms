import { useState } from "react";
import { Upload, FileText, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DocumentUploadProps {
  onUpload: (documentUrls: string[]) => void;
  uploadedDocuments: string[];
}

export function DocumentUpload({ onUpload, uploadedDocuments }: DocumentUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        // Validate file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
          toast({
            title: "File too large",
            description: `${file.name} is larger than 10MB. Please choose a smaller file.`,
            variant: "destructive",
          });
          continue;
        }

        // Generate unique file name
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        // Simulate file upload for now (until storage buckets are set up)
        // In a real implementation, this would upload to Supabase Storage
        const simulatedUrl = `https://example.com/documents/${fileName}`;
        uploadedUrls.push(simulatedUrl);
        
        // Add a small delay to simulate upload
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      const allDocuments = [...uploadedDocuments, ...uploadedUrls];
      onUpload(allDocuments);

      if (uploadedUrls.length > 0) {
        toast({
          title: "Upload successful",
          description: `${uploadedUrls.length} document(s) uploaded successfully.`,
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "An error occurred while uploading documents.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset the input
      event.target.value = "";
    }
  };

  const removeDocument = async (documentUrl: string) => {
    try {
      // Update state (remove from local list)
      const updatedDocuments = uploadedDocuments.filter(url => url !== documentUrl);
      onUpload(updatedDocuments);

      toast({
        title: "Document removed",
        description: "Document has been removed from the list.",
      });
    } catch (error) {
      console.error("Remove error:", error);
      toast({
        title: "Remove failed",
        description: "Failed to remove document. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getFileName = (url: string) => {
    const parts = url.split("/");
    const fileName = parts[parts.length - 1];
    // Remove the timestamp prefix for display
    return fileName.replace(/^\d+-[a-z0-9]+-/, "");
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-primary mb-4">Document Upload</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Upload employee documents such as ID proofs, certificates, resumes, etc. (Max 10MB per file)
        </p>
      </div>

      {/* Upload Area */}
      <Card className="border-2 border-dashed border-border/50 hover:border-primary/50 transition-colors">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Upload className="h-12 w-12 text-muted-foreground mb-4" />
          <div className="text-center">
            <Label htmlFor="file-upload" className="cursor-pointer">
              <span className="text-lg font-medium text-primary hover:text-primary/80 transition-colors">
                Click to upload documents
              </span>
            </Label>
            <p className="text-sm text-muted-foreground mt-2">
              or drag and drop files here
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PDF, DOC, DOCX, JPG, PNG (max 10MB each)
            </p>
          </div>
          <input
            id="file-upload"
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="hidden"
            disabled={isUploading}
          />
          <Button
            variant="outline"
            className="mt-4"
            disabled={isUploading}
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            {isUploading ? "Uploading..." : "Choose Files"}
          </Button>
        </CardContent>
      </Card>

      {/* Uploaded Documents List */}
      {uploadedDocuments.length > 0 && (
        <div>
          <h4 className="text-md font-medium text-foreground mb-3">
            Uploaded Documents ({uploadedDocuments.length})
          </h4>
          <div className="space-y-2">
            {uploadedDocuments.map((documentUrl, index) => (
              <Card key={index} className="bg-muted/20">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium truncate max-w-xs">
                      {getFileName(documentUrl)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(documentUrl, "_blank")}
                      className="hover:bg-accent/50"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDocument(documentUrl)}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}