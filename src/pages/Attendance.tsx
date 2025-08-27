import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock, Download, Filter } from "lucide-react";

interface AttendanceRecord {
  id: string;
  employeeName: string;
  position: string;
  checkIn: string;
  checkOut?: string;
  status: "present" | "late" | "absent" | "overtime";
  totalHours?: number;
  date: string;
}

const attendanceRecords: AttendanceRecord[] = [
  {
    id: "1",
    employeeName: "Maria Santos",
    position: "Front Desk Manager",
    checkIn: "08:00",
    checkOut: "17:00",
    status: "present",
    totalHours: 9,
    date: "2024-11-27"
  },
  {
    id: "2",
    employeeName: "John Dela Cruz",
    position: "Head Chef",
    checkIn: "09:15",
    checkOut: "18:30",
    status: "late",
    totalHours: 9.25,
    date: "2024-11-27"
  },
  {
    id: "3",
    employeeName: "Sarah Wilson",
    position: "Housekeeping Supervisor",
    checkIn: "-",
    checkOut: "-",
    status: "absent",
    totalHours: 0,
    date: "2024-11-27"
  },
  {
    id: "4",
    employeeName: "Robert Garcia",
    position: "Server",
    checkIn: "07:45",
    checkOut: "19:30",
    status: "overtime",
    totalHours: 11.75,
    date: "2024-11-27"
  },
  {
    id: "5",
    employeeName: "Lisa Reyes",
    position: "Receptionist",
    checkIn: "08:30",
    checkOut: "17:30",
    status: "present",
    totalHours: 9,
    date: "2024-11-27"
  }
];

const Attendance = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-success text-success-foreground";
      case "late":
        return "bg-warning text-warning-foreground";
      case "absent":
        return "bg-danger text-danger-foreground";
      case "overtime":
        return "bg-secondary-accent text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatHours = (hours?: number) => {
    if (!hours) return "-";
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const todayStats = {
    present: attendanceRecords.filter(r => r.status === "present" || r.status === "late" || r.status === "overtime").length,
    absent: attendanceRecords.filter(r => r.status === "absent").length,
    late: attendanceRecords.filter(r => r.status === "late").length,
    overtime: attendanceRecords.filter(r => r.status === "overtime").length
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Attendance</h1>
            <p className="text-muted-foreground">Track employee attendance and working hours</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Today's Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Present</p>
                  <p className="text-2xl font-bold text-success">{todayStats.present}</p>
                </div>
                <div className="h-10 w-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Absent</p>
                  <p className="text-2xl font-bold text-danger">{todayStats.absent}</p>
                </div>
                <div className="h-10 w-10 bg-danger/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-danger" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Late</p>
                  <p className="text-2xl font-bold text-warning">{todayStats.late}</p>
                </div>
                <div className="h-10 w-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overtime</p>
                  <p className="text-2xl font-bold text-secondary-accent">{todayStats.overtime}</p>
                </div>
                <div className="h-10 w-10 bg-secondary-accent/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-secondary-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Records */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Today's Attendance - November 27, 2024</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceRecords.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                        {getInitials(record.employeeName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-foreground">{record.employeeName}</h4>
                      <p className="text-sm text-muted-foreground">{record.position}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Check In</p>
                      <p className="font-medium text-foreground">{record.checkIn}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Check Out</p>
                      <p className="font-medium text-foreground">{record.checkOut || "-"}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Total Hours</p>
                      <p className="font-medium text-foreground">{formatHours(record.totalHours)}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Status</p>
                      <Badge className={getStatusColor(record.status)}>
                        {record.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Attendance;