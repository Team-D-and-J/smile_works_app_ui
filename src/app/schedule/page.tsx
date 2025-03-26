"use client";

import React, { useEffect, useState } from "react";
import { getAPI, putAPI } from "@/utils/fetchApi";
import { useRouter } from "next/navigation";
import moment from "moment";

interface Appointment {
  _id: string;
  date: string;
  patientName: string;
  treatmentMaster: string;
  doctorName: string;
  status: string;
  time: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Confirmed":
      return "bg-blue-500";
    case "Arrived":
      return "bg-green-500";
    case "Cancelled":
      return "bg-yellow-400 text-black";
    case "No show":
      return "bg-red-500";
    default:
      return "bg-gray-400";
  }
};

const AppointmentSchedule: React.FC = () => {
  const router = useRouter();
  const today = moment().format("YYYY-MM-DD");
  const [schedule, setSchedule] = useState<Record<string, Appointment[]>>({});
  const [view, setView] = useState<"day" | "week">("day");
  const [selectedDate, setSelectedDate] = useState(today);

  const fetchSchedule = async () => {
    try {
      const filter =
        view === "day"
          ? { view: "day", date: selectedDate }
          : { view: "week", start: selectedDate };

      const query = { filter };
      const data = await getAPI("/schedule", query);
      setSchedule(data);
    } catch (error) {
      console.error("Failed to fetch schedule", error);
      setSchedule({});
    }
  };

  const handleCancel = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirmed) return;

    try {
      await putAPI(`/appointment/${id}`, { status: "Cancelled" });
      fetchSchedule();
    } catch (error) {
      console.error("Cancellation failed", error);
    }
  };

  const handleNewAppointment = () => {
    router.push("/schedule/appointment");
  };

  const goToPreviousWeek = () => {
    const newDate = moment(selectedDate).subtract(7, "days").format("YYYY-MM-DD");
    setSelectedDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = moment(selectedDate).add(7, "days").format("YYYY-MM-DD");
    setSelectedDate(newDate);
  };

  useEffect(() => {
    fetchSchedule();
  }, [view, selectedDate]);

  const weekRange = `${moment(selectedDate)
    .startOf("week")
    .format("MMM D")} - ${moment(selectedDate).endOf("week").format("MMM D, YYYY")}`;

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div>
          {view === "day" ? (
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border p-1 rounded text-sm"
            />
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={goToPreviousWeek} className="px-2 py-1 text-sm bg-gray-200 rounded">
                ◀
              </button>
              <span className="font-medium">{weekRange}</span>
              <button onClick={goToNextWeek} className="px-2 py-1 text-sm bg-gray-200 rounded">
                ▶
              </button>
            </div>
          )}

          <button
            onClick={() => setView(view === "day" ? "week" : "day")}
            className="mt-1 ml-2 bg-gray-700 text-white text-sm px-3 py-1 rounded"
          >
            {view === "day" ? "Week View" : "Day View"}
          </button>
        </div>

        <button
          onClick={handleNewAppointment}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          New Appointment
        </button>
      </div>

      <div className="flex justify-between bg-gray-100 p-3 font-semibold rounded-t">
        <div className="w-1/6">Time</div>
        <div className="w-2/6">Patient</div>
        <div className="w-1/3 text-center">Doctor</div>
        <div className="w-1/6 text-right">Actions</div>
      </div>

      {Object.keys(schedule).length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          {view === "day"
            ? "No appointments scheduled for this day."
            : "No appointments scheduled this week."}
        </p>
      )}

      {Object.entries(schedule).map(([dateKey, appointments]) =>
        Array.isArray(appointments)
          ? appointments
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((appt, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 mb-2 border rounded shadow-sm"
                >
                  <div className="w-1/6">
                    {view === "week"
                      ? `${moment(appt.date).format("dddd")} - ${appt.time}`
                      : appt.time}
                  </div>

                  <div className="w-2/6">
                    <div className="font-semibold">{appt.patientName}</div>
                    <div className="text-sm text-gray-500">{appt.treatmentMaster}</div>
                  </div>

                  <div className="w-1/3 text-center">
                    <div>{appt.doctorName}</div>
                    <div className="text-xs mt-1">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-white ${getStatusColor(
                          appt.status
                        )}`}
                      >
                        {appt.status}
                      </span>
                    </div>
                  </div>

                  <div className="w-1/6 text-right">
                    <button
                      onClick={() => handleCancel(appt._id)}
                      className="bg-yellow-500 text-black px-3 py-1 rounded text-sm hover:bg-yellow-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))
          : null
      )}
    </div>
  );
};

export default AppointmentSchedule;
