import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const attendanceData = [
  { day: 'Mon', present: 42, absent: 3, late: 2 },
  { day: 'Tue', present: 45, absent: 2, late: 1 },
  { day: 'Wed', present: 43, absent: 4, late: 3 },
  { day: 'Thu', present: 46, absent: 1, late: 2 },
  { day: 'Fri', present: 44, absent: 3, late: 4 },
  { day: 'Sat', present: 38, absent: 7, late: 2 },
  { day: 'Sun', present: 35, absent: 10, late: 2 }
];

export function AttendanceChart() {
  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Weekly Attendance</CardTitle>
        <p className="text-sm text-muted-foreground">Employee attendance for this week</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={attendanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="present" stackId="attendance" fill="hsl(var(--success))" name="Present" />
            <Bar dataKey="late" stackId="attendance" fill="hsl(var(--warning))" name="Late" />
            <Bar dataKey="absent" stackId="attendance" fill="hsl(var(--danger))" name="Absent" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}