import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Calendar, Clock, MapPin } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TrainingSessions = () => {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      title: "Leadership Development Program",
      type: "Workshop",
      date: "2024-04-15",
      time: "09:00",
      duration: "3 hours",
      location: "Conference Room A",
      trainer: "John Smith",
      capacity: 20,
      enrolled: 15,
      status: "Scheduled",
    },
    {
      id: 2,
      title: "Technical Skills Training",
      type: "Course",
      date: "2024-04-18",
      time: "14:00",
      duration: "4 hours",
      location: "Training Center",
      trainer: "Sarah Johnson",
      capacity: 30,
      enrolled: 28,
      status: "Scheduled",
    },
  ]);

  const [editingSession, setEditingSession] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [notification, setNotification] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    trainer: "",
    date: "",
    time: "",
    duration: "",
    location: "",
    capacity: "",
  });

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleCreateSession = (e) => {
    e.preventDefault();
    
    const newSession = {
      id: sessions.length + 1,
      title: formData.title,
      type: formData.type,
      date: formData.date,
      time: formData.time,
      duration: formData.duration,
      location: formData.location,
      trainer: formData.trainer,
      capacity: parseInt(formData.capacity),
      enrolled: 0,
      status: "Scheduled",
    };
    
    setSessions([...sessions, newSession]);
    setIsCreateDialogOpen(false);
    setFormData({
      title: "",
      type: "",
      trainer: "",
      date: "",
      time: "",
      duration: "",
      location: "",
      capacity: "",
    });
    showNotification("Training session created successfully");
  };

  const handleEditSession = (session) => {
    setEditingSession(session);
    setFormData({
      title: session.title,
      type: session.type,
      trainer: session.trainer,
      date: session.date,
      time: session.time,
      duration: session.duration,
      location: session.location,
      capacity: session.capacity.toString(),
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateSession = (e) => {
    e.preventDefault();
    
    setSessions(sessions.map(session => 
      session.id === editingSession.id 
        ? {
            ...session,
            title: formData.title,
            type: formData.type,
            date: formData.date,
            time: formData.time,
            duration: formData.duration,
            location: formData.location,
            trainer: formData.trainer,
            capacity: parseInt(formData.capacity),
          }
        : session
    ));
    
    setIsEditDialogOpen(false);
    setEditingSession(null);
    setFormData({
      title: "",
      type: "",
      trainer: "",
      date: "",
      time: "",
      duration: "",
      location: "",
      capacity: "",
    });
    showNotification("Training session updated successfully");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Scheduled":
        return "default";
      case "Completed":
        return "secondary";
      case "Cancelled":
        return "destructive";
      default:
        return "default";
    }
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 max-w-5xl mx-auto">
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {notification}
        </div>
      )}
      
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Training Sessions</CardTitle>
            <CardDescription>Create and schedule training programs</CardDescription>
          </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Session
              </Button>
            </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Training Session</DialogTitle>
                <DialogDescription>
                  Schedule a new training session for employees
                </DialogDescription>
              </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Session Title</Label>
                    <Input 
                      id="title" 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="e.g., Leadership Development" 
                      required 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="type">Type</Label>
                      <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Workshop">Workshop</SelectItem>
                          <SelectItem value="Course">Course</SelectItem>
                          <SelectItem value="Seminar">Seminar</SelectItem>
                          <SelectItem value="Webinar">Webinar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="trainer">Trainer</Label>
                      <Input 
                        id="trainer" 
                        value={formData.trainer}
                        onChange={(e) => setFormData({...formData, trainer: e.target.value})}
                        placeholder="Trainer name" 
                        required 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="date">Date</Label>
                      <Input 
                        id="date" 
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        required 
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="time">Time</Label>
                      <Input 
                        id="time" 
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                        required 
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input 
                        id="duration" 
                        value={formData.duration}
                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                        placeholder="e.g., 3 hours" 
                        required 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        placeholder="e.g., Conference Room A" 
                        required 
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input 
                        id="capacity" 
                        type="number"
                        value={formData.capacity}
                        onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                        placeholder="Max participants" 
                        required 
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateSession}>Create Session</Button>
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
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Trainer</TableHead>
                  <TableHead>Enrolled/Capacity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium whitespace-nowrap">{session.title}</TableCell>
                    <TableCell className="whitespace-nowrap">{session.type}</TableCell>
                    <TableCell className="min-w-[200px]">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-1 h-3 w-3" />
                          {new Date(session.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {formatTime(session.time)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{session.duration}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
                        {session.location}
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{session.trainer}</TableCell>
                    <TableCell className="whitespace-nowrap">{session.enrolled}/{session.capacity}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(session.status)}>
                        {session.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Button variant="ghost" size="sm" onClick={() => handleEditSession(session)}>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Training Session</DialogTitle>
                <DialogDescription>
                  Update the training session details
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-title">Session Title</Label>
                  <Input 
                    id="edit-title" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g., Leadership Development" 
                    required 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-type">Type</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Workshop">Workshop</SelectItem>
                        <SelectItem value="Course">Course</SelectItem>
                        <SelectItem value="Seminar">Seminar</SelectItem>
                        <SelectItem value="Webinar">Webinar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-trainer">Trainer</Label>
                    <Input 
                      id="edit-trainer" 
                      value={formData.trainer}
                      onChange={(e) => setFormData({...formData, trainer: e.target.value})}
                      placeholder="Trainer name" 
                      required 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-date">Date</Label>
                    <Input 
                      id="edit-date" 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-time">Time</Label>
                    <Input 
                      id="edit-time" 
                      type="time" 
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-duration">Duration</Label>
                    <Input 
                      id="edit-duration" 
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      placeholder="e.g., 3 hours" 
                      required 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-location">Location</Label>
                    <Input 
                      id="edit-location" 
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="e.g., Conference Room A" 
                      required 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-capacity">Capacity</Label>
                    <Input 
                      id="edit-capacity" 
                      type="number" 
                      value={formData.capacity}
                      onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                      placeholder="Max participants" 
                      required 
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateSession}>Update Session</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
      </CardContent>
    </Card>
    </div>
  );
};

export default TrainingSessions;
