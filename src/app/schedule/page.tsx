"use client";
import React, { useState } from "react";

interface Appointment {
  time: string;
  patient: string;
  status: string;
}

const AppointmentSchedule: React.FC = () => {
  const [schedule] = useState<Appointment[]>([
    { time: "9 am", patient: "Mike Wilson", status: "Bleaching Treatment" },
    { time: "10 am", patient: "Monica Cole", status: "Teeth Removal" },
    { time: "11 am", patient: "Mike Wilson", status: "Consultation" },
    { time: "12 pm", patient: "Mike Wilson", status: "Cleaning" },
    { time: "1 pm", patient: "Mike Wilson", status: "Fluoride Treatment" },
    { time: "2 pm", patient: "Mike Wilson", status: "Bleaching Treatment" },
    { time: "3 pm", patient: "Mike Wilson", status: "Cleaning" },
    { time: "4 pm", patient: "Mike Wilson", status: "Consultation" },
    { time: "5 pm", patient: "Mike Wilson", status: "Bleaching Treatment" },
  ]);

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
        <div style={styles.headerTime}>Time</div>
        <div style={styles.headerPatient}>Patient</div>
        <div style={styles.headerStatus}>Status</div>
        <div style={styles.headerActions}>
          <button style={styles.editBtn}>Edit</button>
        </div>
      </div>

      <div id="schedule">
        {schedule.map((appt, index) => (
          <div key={index} style={styles.appointmentCard}>
            <div style={styles.appointmentTime}>{appt.time}</div>
            <div style={styles.appointmentPatient}>
              <span style={styles.patientName}>{appt.patient}</span>
              <br />
              <span style={styles.subtext}>{appt.status}</span>
            </div>
            <div style={styles.appointmentStatus}></div>
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
    flexDirection: "column" as "column",
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
    textAlign: "right" as "right",
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
