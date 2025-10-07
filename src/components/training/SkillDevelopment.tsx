import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Target, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const SkillDevelopment = () => {
  const [skills, setSkills] = useState([
    {
      id: 1,
      employee: "Alice Johnson",
      skillName: "Project Management",
      currentLevel: "Intermediate",
      targetLevel: "Advanced",
      progress: 65,
      lastAssessed: "2024-03-15",
      trainingCompleted: 3,
      status: "In Progress",
    },
    {
      id: 2,
      employee: "Bob Smith",
      skillName: "Data Analysis",
      currentLevel: "Beginner",
      targetLevel: "Intermediate",
      progress: 40,
      lastAssessed: "2024-03-10",
      trainingCompleted: 2,
      status: "In Progress",
    },
    {
      id: 3,
      employee: "Carol Davis",
      skillName: "Leadership",
      currentLevel: "Advanced",
      targetLevel: "Expert",
      progress: 85,
      lastAssessed: "2024-03-20",
      trainingCompleted: 5,
      status: "On Track",
    },
  ]);

  const [editingSkill, setEditingSkill] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [notification, setNotification] = useState("");

  const [formData, setFormData] = useState({
    employee: "",
    skillName: "",
    currentLevel: "",
    targetLevel: "",
    progress: "",
    trainingCompleted: "",
  });

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleCreateSkill = (e) => {
    e.preventDefault();
    
    const newSkill = {
      id: skills.length + 1,
      employee: formData.employee,
      skillName: formData.skillName,
      currentLevel: formData.currentLevel,
      targetLevel: formData.targetLevel,
      progress: parseInt(formData.progress),
      lastAssessed: new Date().toISOString().split('T')[0],
      trainingCompleted: parseInt(formData.trainingCompleted),
      status: parseInt(formData.progress) >= 70 ? "On Track" : "In Progress",
    };
    
    setSkills([...skills, newSkill]);
    setIsCreateDialogOpen(false);
    setFormData({
      employee: "",
      skillName: "",
      currentLevel: "",
      targetLevel: "",
      progress: "",
      trainingCompleted: "",
    });
    showNotification("Skill development goal created successfully");
  };

  const handleEditSkill = (skill) => {
    setEditingSkill(skill);
    setFormData({
      employee: skill.employee,
      skillName: skill.skillName,
      currentLevel: skill.currentLevel,
      targetLevel: skill.targetLevel,
      progress: skill.progress.toString(),
      trainingCompleted: skill.trainingCompleted.toString(),
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateSkill = (e) => {
    e.preventDefault();
    
    setSkills(skills.map(skill => 
      skill.id === editingSkill.id 
        ? {
            ...skill,
            employee: formData.employee,
            skillName: formData.skillName,
            currentLevel: formData.currentLevel,
            targetLevel: formData.targetLevel,
            progress: parseInt(formData.progress),
            trainingCompleted: parseInt(formData.trainingCompleted),
            status: parseInt(formData.progress) >= 70 ? "On Track" : "In Progress",
            lastAssessed: new Date().toISOString().split('T')[0],
          }
        : skill
    ));
    
    setIsEditDialogOpen(false);
    setEditingSkill(null);
    setFormData({
      employee: "",
      skillName: "",
      currentLevel: "",
      targetLevel: "",
      progress: "",
      trainingCompleted: "",
    });
    showNotification("Skill development goal updated successfully");
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "secondary";
      case "Intermediate":
        return "default";
      case "Advanced":
        return "default";
      case "Expert":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 max-w-5xl mx-auto">
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {notification}
        </div>
      )}
      
      <Card className="border-[#e2e8f0] bg-gradient-to-br from-white to-[#f9fafb] shadow-lg">
        <CardHeader className="border-b border-[#e2e8f0] bg-gradient-to-r from-[#f9fafb] to-white">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Skill Development Tracking</CardTitle>
              <CardDescription>Monitor employee skill progression and development goals</CardDescription>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Target className="mr-2 h-4 w-4" />
                  Set Development Goals
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Set Development Goal</DialogTitle>
                  <DialogDescription>
                    Create a new skill development goal for an employee
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="employee">Employee Name</Label>
                    <Input 
                      id="employee" 
                      value={formData.employee}
                      onChange={(e) => setFormData({...formData, employee: e.target.value})}
                      placeholder="e.g., John Doe" 
                      required 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="skillName">Skill Name</Label>
                    <Input 
                      id="skillName" 
                      value={formData.skillName}
                      onChange={(e) => setFormData({...formData, skillName: e.target.value})}
                      placeholder="e.g., Project Management" 
                      required 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="currentLevel">Current Level</Label>
                      <Select value={formData.currentLevel} onValueChange={(value) => setFormData({...formData, currentLevel: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                          <SelectItem value="Expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="targetLevel">Target Level</Label>
                      <Select value={formData.targetLevel} onValueChange={(value) => setFormData({...formData, targetLevel: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                          <SelectItem value="Expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="progress">Progress (%)</Label>
                      <Input 
                        id="progress" 
                        type="number"
                        min="0"
                        max="100"
                        value={formData.progress}
                        onChange={(e) => setFormData({...formData, progress: e.target.value})}
                        placeholder="0-100" 
                        required 
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="trainingCompleted">Training Sessions Completed</Label>
                      <Input 
                        id="trainingCompleted" 
                        type="number"
                        min="0"
                        value={formData.trainingCompleted}
                        onChange={(e) => setFormData({...formData, trainingCompleted: e.target.value})}
                        placeholder="0" 
                        required 
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateSkill}>Create Goal</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Skill</TableHead>
                  <TableHead>Current Level</TableHead>
                  <TableHead>Target Level</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Training Completed</TableHead>
                  <TableHead>Last Assessed</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {skills.map((skill) => (
                  <TableRow key={skill.id}>
                    <TableCell className="font-medium whitespace-nowrap">{skill.employee}</TableCell>
                    <TableCell className="whitespace-nowrap">{skill.skillName}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Badge variant={getLevelColor(skill.currentLevel)}>
                        {skill.currentLevel}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Badge variant={getLevelColor(skill.targetLevel)}>
                        {skill.targetLevel}
                      </Badge>
                    </TableCell>
                    <TableCell className="min-w-[180px]">
                      <div className="flex items-center gap-2">
                        <Progress value={skill.progress} className="w-20" />
                        <span className="text-sm">{skill.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{skill.trainingCompleted} sessions</TableCell>
                    <TableCell className="whitespace-nowrap">{new Date(skill.lastAssessed).toLocaleDateString()}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Badge variant={skill.status === "On Track" ? "default" : "secondary"}>
                        {skill.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Button variant="ghost" size="sm" onClick={() => handleEditSkill(skill)}>
                        <TrendingUp className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Update Development Goal</DialogTitle>
                <DialogDescription>
                  Update the skill development goal details
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-employee">Employee Name</Label>
                  <Input 
                    id="edit-employee" 
                    value={formData.employee}
                    onChange={(e) => setFormData({...formData, employee: e.target.value})}
                    placeholder="e.g., John Doe" 
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-skillName">Skill Name</Label>
                  <Input 
                    id="edit-skillName" 
                    value={formData.skillName}
                    onChange={(e) => setFormData({...formData, skillName: e.target.value})}
                    placeholder="e.g., Project Management" 
                    required 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-currentLevel">Current Level</Label>
                    <Select value={formData.currentLevel} onValueChange={(value) => setFormData({...formData, currentLevel: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                        <SelectItem value="Expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-targetLevel">Target Level</Label>
                    <Select value={formData.targetLevel} onValueChange={(value) => setFormData({...formData, targetLevel: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                        <SelectItem value="Expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-progress">Progress (%)</Label>
                    <Input 
                      id="edit-progress" 
                      type="number"
                      min="0"
                      max="100"
                      value={formData.progress}
                      onChange={(e) => setFormData({...formData, progress: e.target.value})}
                      placeholder="0-100" 
                      required 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-trainingCompleted">Training Sessions Completed</Label>
                    <Input 
                      id="edit-trainingCompleted" 
                      type="number"
                      min="0"
                      value={formData.trainingCompleted}
                      onChange={(e) => setFormData({...formData, trainingCompleted: e.target.value})}
                      placeholder="0" 
                      required 
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateSkill}>Update Goal</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Card>
    </div>
  );
};

export default SkillDevelopment;