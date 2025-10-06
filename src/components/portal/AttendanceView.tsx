import { useState } from "react";
import { Calendar } from "lucide-react";

const generateAttendanceRecords = (userId) => {
  const records = [];
  const statuses = ['present', 'absent', 'half-day', 'leave'];
  const today = new Date();
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Skip weekends for more realistic data
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    const status = i === 0 ? 'present' : statuses[Math.floor(Math.random() * statuses.length)];
    const hasCheckIn = status !== 'absent' && status !== 'leave';
    
    let checkInTime = null;
    let checkOutTime = null;
    let totalHours = null;
    
    if (hasCheckIn) {
      const checkInHour = 9 + Math.floor(Math.random() * 2);
      const checkInMinute = Math.floor(Math.random() * 60);
      checkInTime = `${String(checkInHour).padStart(2, '0')}:${String(checkInMinute).padStart(2, '0')}`;
      
      if (status === 'half-day') {
        const checkOutHour = checkInHour + 4;
        const checkOutMinute = Math.floor(Math.random() * 60);
        checkOutTime = `${String(checkOutHour).padStart(2, '0')}:${String(checkOutMinute).padStart(2, '0')}`;
        totalHours = 4 + Math.random() * 0.5;
      } else if (status === 'present') {
        const checkOutHour = 17 + Math.floor(Math.random() * 3);
        const checkOutMinute = Math.floor(Math.random() * 60);
        checkOutTime = `${String(checkOutHour).padStart(2, '0')}:${String(checkOutMinute).padStart(2, '0')}`;
        totalHours = 8 + Math.random() * 2;
      }
    }
    
    records.push({
      id: `att-${i}`,
      employee_id: userId,
      date: date.toISOString().split('T')[0],
      check_in_time: checkInTime,
      check_out_time: checkOutTime,
      status: status,
      total_hours: totalHours
    });
  }
  
  return records;
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

const getStatusColor = (status) => {
  switch (status) {
    case 'present':
      return 'text-green-700 bg-green-50 border border-green-200';
    case 'absent':
      return 'text-red-700 bg-red-50 border border-red-200';
    case 'half-day':
      return 'text-yellow-700 bg-yellow-50 border border-yellow-200';
    case 'leave':
      return 'text-blue-700 bg-blue-50 border border-blue-200';
    default:
      return 'text-gray-700 bg-gray-50 border border-gray-200';
  }
};

export default function AttendanceView({ userId = "EMP001" }) {
  const [attendanceRecords] = useState(() => generateAttendanceRecords(userId));
  const [isLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
              <Calendar className="h-6 w-6" />
              My Attendance
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              View your attendance records for the last 30 days
            </p>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="text-center py-8 text-gray-600">
                Loading attendance records...
              </div>
            ) : attendanceRecords && attendanceRecords.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Check In</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Check Out</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Work Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceRecords.map((record) => (
                      <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {formatDate(record.date)}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {record.check_in_time || "-"}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {record.check_out_time || "-"}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(record.status)}`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {record.total_hours ? `${record.total_hours.toFixed(2)}h` : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No attendance records found. Your attendance will appear here once marked.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}