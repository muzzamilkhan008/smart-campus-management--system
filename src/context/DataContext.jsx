import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialStudents,
  initialTeachers,
  initialDepartments,
  initialCourses,
  initialAttendanceRecords,
  initialEvents,
  initialNotifications,
  initialAnnouncements,
  initialFees,
  initialBooks,
  initialTickets,
  initialFacilities
} from '../data/initialData';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Helpers to load or fall back to initial data
  const loadLocal = (key, fallback) => {
    try {
      const saved = localStorage.getItem(`campus_${key}`);
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      console.error(`Error reading ${key} from localStorage`, e);
      return fallback;
    }
  };

  const [students, setStudents] = useState(() => loadLocal('students', initialStudents));
  const [teachers, setTeachers] = useState(() => loadLocal('teachers', initialTeachers));
  const [departments, setDepartments] = useState(() => loadLocal('departments', initialDepartments));
  const [courses, setCourses] = useState(() => loadLocal('courses', initialCourses));
  const [attendance, setAttendance] = useState(() => loadLocal('attendance', initialAttendanceRecords));
  const [events, setEvents] = useState(() => loadLocal('events', initialEvents));
  const [notifications, setNotifications] = useState(() => loadLocal('notifications', initialNotifications));
  const [announcements, setAnnouncements] = useState(() => loadLocal('announcements', initialAnnouncements));
  const [fees, setFees] = useState(() => loadLocal('fees', initialFees));
  const [books, setBooks] = useState(() => loadLocal('books', initialBooks));
  const [tickets, setTickets] = useState(() => loadLocal('tickets', initialTickets));
  const [facilities, setFacilities] = useState(() => loadLocal('facilities', initialFacilities));

  // Sync to localStorage
  useEffect(() => { localStorage.setItem('campus_students', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('campus_teachers', JSON.stringify(teachers)); }, [teachers]);
  useEffect(() => { localStorage.setItem('campus_departments', JSON.stringify(departments)); }, [departments]);
  useEffect(() => { localStorage.setItem('campus_courses', JSON.stringify(courses)); }, [courses]);
  useEffect(() => { localStorage.setItem('campus_attendance', JSON.stringify(attendance)); }, [attendance]);
  useEffect(() => { localStorage.setItem('campus_events', JSON.stringify(events)); }, [events]);
  useEffect(() => { localStorage.setItem('campus_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('campus_announcements', JSON.stringify(announcements)); }, [announcements]);
  useEffect(() => { localStorage.setItem('campus_fees', JSON.stringify(fees)); }, [fees]);
  useEffect(() => { localStorage.setItem('campus_books', JSON.stringify(books)); }, [books]);
  useEffect(() => { localStorage.setItem('campus_tickets', JSON.stringify(tickets)); }, [tickets]);
  useEffect(() => { localStorage.setItem('campus_facilities', JSON.stringify(facilities)); }, [facilities]);

  // CRUD Functions

  // Student CRUD
  const addStudent = (newStudent) => {
    const studentWithId = {
      ...newStudent,
      id: `STU-${Math.floor(1000 + Math.random() * 9000)}`,
      admissionDate: new Date().toISOString().split('T')[0],
      attendance: 100.0,
      status: 'Active',
      cgpa: newStudent.cgpa || 3.50,
      avatar: newStudent.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
    };
    setStudents(prev => [studentWithId, ...prev]);
    return studentWithId;
  };

  const updateStudent = (id, updatedFields) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updatedFields } : s));
  };

  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  // Teacher CRUD
  const addTeacher = (newTeacher) => {
    const teacherWithId = {
      ...newTeacher,
      id: `FAC-${Math.floor(2000 + Math.random() * 9000)}`,
      joiningDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      courses: newTeacher.courses ? (Array.isArray(newTeacher.courses) ? newTeacher.courses : [newTeacher.courses]) : [],
      avatar: newTeacher.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
    };
    setTeachers(prev => [teacherWithId, ...prev]);
    return teacherWithId;
  };

  const updateTeacher = (id, updatedFields) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, ...updatedFields } : t));
  };

  const deleteTeacher = (id) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
  };

  // Attendance
  const markAttendanceRecord = (studentId, courseCode, status, date = new Date().toISOString().split('T')[0]) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    setAttendance(prev => {
      const existingIndex = prev.findIndex(a => a.studentId === studentId && a.courseCode === courseCode && a.date === date);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], status };
        return updated;
      } else {
        return [{
          id: `ATT-${Date.now().toString().slice(-4)}`,
          studentId,
          studentName: student.name,
          courseCode,
          date,
          status,
          department: student.department
        }, ...prev];
      }
    });
  };

  // Events CRUD
  const addEvent = (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: `EVT-${Date.now().toString().slice(-4)}`,
      attendees: 0,
      status: 'Upcoming',
      banner: newEvent.banner || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80"
    };
    setEvents(prev => [eventWithId, ...prev]);
    return eventWithId;
  };

  const deleteEvent = (id) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  // Announcements
  const addAnnouncement = (newAnnouncement) => {
    const announcementWithId = {
      ...newAnnouncement,
      id: `ANC-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements(prev => [announcementWithId, ...prev]);
    return announcementWithId;
  };

  // Fees
  const updateFeeStatus = (id, status, paidAmount) => {
    setFees(prev => prev.map(f => {
      if (f.id === id) {
        return {
          ...f,
          status,
          paidFee: paidAmount || f.totalFee,
          pendingFee: status === 'Paid' ? '$0' : f.pendingFee,
          lastPaymentDate: new Date().toISOString().split('T')[0]
        };
      }
      return f;
    }));
  };

  // Books
  const toggleBookCheckout = (bookId, studentName = 'Alex Morgan') => {
    setBooks(prev => prev.map(b => {
      if (b.id === bookId) {
        const newAvailable = b.available > 0 ? b.available - 1 : b.available + 1;
        return {
          ...b,
          available: newAvailable,
          status: newAvailable === 0 ? 'Issued Out' : newAvailable <= 2 ? 'Low Stock' : 'Available'
        };
      }
      return b;
    }));
  };

  // Support Tickets
  const addTicket = (newTicket) => {
    const ticketWithId = {
      ...newTicket,
      id: `TCK-${Math.floor(800 + Math.random() * 100)}`,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTickets(prev => [ticketWithId, ...prev]);
    return ticketWithId;
  };

  const updateTicketStatus = (id, status) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  // Notifications
  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Reset to original demo dataset
  const resetDemoData = () => {
    setStudents(initialStudents);
    setTeachers(initialTeachers);
    setDepartments(initialDepartments);
    setCourses(initialCourses);
    setAttendance(initialAttendanceRecords);
    setEvents(initialEvents);
    setNotifications(initialNotifications);
    setAnnouncements(initialAnnouncements);
    setFees(initialFees);
    setBooks(initialBooks);
    setTickets(initialTickets);
    setFacilities(initialFacilities);
    localStorage.clear();
  };

  return (
    <DataContext.Provider value={{
      students, addStudent, updateStudent, deleteStudent,
      teachers, addTeacher, updateTeacher, deleteTeacher,
      departments,
      courses,
      attendance, markAttendanceRecord,
      events, addEvent, deleteEvent,
      notifications, markNotificationRead, deleteNotification,
      announcements, addAnnouncement,
      fees, updateFeeStatus,
      books, toggleBookCheckout,
      tickets, addTicket, updateTicketStatus,
      facilities,
      resetDemoData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
