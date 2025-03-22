"use client";

import React, { useEffect, useState } from "react";

interface Appointment {
  date: string;
  patientName: string;
  treatmentMaster: string;
  doctorName: string;
}

const AppointmentSchedule: React.FC = () => {
  const [schedule, setSchedule] = useState<Appointment[]>([]);
  // loading state commented out to clear the error
  // const [loading, setLoading] = useState<boolean>(true);

  // Fetch appointments from the backend API
  useEffect(() => {
    const fetchAppointments = async () => {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/schedule`;
      console.log("Fetching from:", apiUrl);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/schedule`,
          {
            method: "GET",
            headers: {
              Authorization: `JWT ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();

        if (response.ok) {
          setSchedule(data);
        } else {
          console.error("Error fetching appointments:", data.message);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.dateGroup}>
          <span style={styles.date}>Feb 25, 2025</span>
          <button style={styles.weekBtn}>Week</button>
        </div>
        <span style={styles.newAppt}>New Appt.</span>
      </div>

      <div style={styles.scheduleHeader}>
        <div style={styles.headerTime}>Date and Time</div>
        <div style={styles.headerPatient}>Patient</div>
        <div style={styles.headerStatus}>Doctor</div>
        <div style={styles.headerActions}>
          <button style={styles.editBtn}>Edit</button>
        </div>
      </div>

      <div id="schedule">
        {schedule.map((appt, index) => (
          <div key={index} style={styles.appointmentCard}>
            <div style={styles.appointmentTime}>{appt.date}</div>
            <div style={styles.appointmentPatient}>
              <span style={styles.patientName}>{appt.patientName}</span>
              <br />
              <span style={styles.subtext}>{appt.treatmentMaster}</span>
            </div>
            <div style={styles.appointmentStatus}>{appt.doctorName}</div>
            <div style={styles.appointmentActions}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

//CSS
const styles = {
  container: {
    width: "100%",
    margin: "0 auto",
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  dateGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "5px",
  },
  date: {
    fontWeight: "normal",
  },
  weekBtn: {
    backgroundColor: "#555",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  newAppt: {
    fontSize: "14px",
    color: "#555",
    cursor: "pointer",
  },
  scheduleHeader: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
    padding: "10px 15px",
    borderRadius: "5px 5px 0 0",
    fontWeight: "bold",
  },
  headerTime: {
    width: "15%",
  },
  headerPatient: {
    width: "40%",
  },
  headerStatus: {
    width: "30%",
  },
  headerActions: {
    width: "15%",
    textAlign: "right" as const,
  },
  appointmentCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.05)",
  },
  appointmentTime: {
    width: "15%",
  },
  appointmentPatient: {
    width: "40%",
  },
  appointmentStatus: {
    width: "30%",
  },
  appointmentActions: {
    width: "15%",
  },
  editBtn: {
    backgroundColor: "#333",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  patientName: {
    fontWeight: "bold",
  },
  subtext: {
    fontSize: "12px",
    color: "gray",
  },
};

export default AppointmentSchedule;
