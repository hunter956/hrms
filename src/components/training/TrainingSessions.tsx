import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Calendar, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";

const TrainingSessions = () => {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      title: "Leadership Development Program",
      type: "Workshop",
      date: "2024-04-15",
      time: "09:00 AM",
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
      time: "02:00 PM",
      duration: "4 hours",
      location: "Training Center",
      trainer: "Sarah Johnson",
      capacity: 30,
      enrolled: 28,
      status: "Scheduled",
    },
  ]);

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Training session created successfully");
  };

  const getStatusColor = (status: string) => {
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

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Training Sessions</CardTitle>
            <CardDescription>Create and schedule training programs</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Session
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Training Session</DialogTitle>
                <DialogDescription>
                  Schedule a new training session for employees
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateSession}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Session Title</Label>
                    <Input id="title" placeholder="e.g., Leadership Development" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="type">Type</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="course">Course</SelectItem>
                          <SelectItem value="seminar">Seminar</SelectItem>
                          <SelectItem value="webinar">Webinar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="trainer">Trainer</Label>
                      <Input id="trainer" placeholder="Trainer name" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="time">Time</Label>
                      <Input id="time" type="time" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input id="duration" placeholder="e.g., 3 hours" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="e.g., Conference Room A" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input id="capacity" type="number" placeholder="Max participants" required />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Session description" rows={3} />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Session</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
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
                <TableCell className="font-medium">{session.title}</TableCell>
                <TableCell>{session.type}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(session.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {session.time}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{session.duration}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-3 w-3" />
                    {session.location}
                  </div>
                </TableCell>
                <TableCell>{session.trainer}</TableCell>
                <TableCell>
                  {session.enrolled}/{session.capacity}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(session.status)}>
                    {session.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TrainingSessions;
