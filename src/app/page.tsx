"use client";
import React, { useState, useEffect } from "react";
import QuickAccessLink from "@/components/dashboard/QuickAccessLink";
import { BarChart } from "@mui/x-charts/BarChart";
import StatCard from "@/components/dashboard/StatCards";
import { getAppointmentsToday } from "./lib/wrapperApi";
import { getAppointmentsCountByWeek } from "./lib/wrapperApi";

interface Appointment {
  name: string;
  date: string;
  time: string;
}
interface Day {
  day: string;
  count: number;
}
// const mockUpcomingAppointments = [
//   { name: "Clyde Franko", date: "Monday 23rd, 2025", time: "8am" },
//   { name: "Nancy Bennetr", date: "Monday 23rd, 2025", time: "12pm" },
//   { name: "Carlos Pine", date: "Monday 23rd, 2025", time: "1pm" },
//   { name: "Benjamin Smith", date: "Monday 23rd, 2025", time: "3pmm" },
// ];

const Page: React.FC = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [name, setName] = useState<string | null>(null);
  const [appointmentsToday, setAppointmentsToday] =
    useState<Appointment[]>(null);
  const [weekAppointmentCount, setWeekAppointmentCount] = useState<Day[]>([]);

  // const [totalAppointments, setTotalAppointments] = useState<number>(0);
  // const [cancelledAppointments, setCancelledAppointments] = useState<number>(0);
  // const [missedAppointments, setMissedAppointments] = useState<number>(0);

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    const name = localStorage.getItem("name");
    setName(name);
  }, []);

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    setCurrentDate(formattedDate);

    const fetchAppointmentsByWeek = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const data = await getAppointmentsCountByWeek(today);
        const graphDataFormat = data.map((day: Day) => day.count);
        setWeekAppointmentCount(graphDataFormat || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointmentsByWeek();
  }, []);

  useEffect(() => {
    const fetchAppointmentsToday = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const data = await getAppointmentsToday(today);
        console.log(data);
        setAppointmentsToday(data || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointmentsToday();
  }, []);

  return (
    <>
      <div className="flex flex-col w-full h-full bg-secondaryDark p-4 gap-4">
        {/* First section */}
        <div className="flex w-full bg-secondaryLight rounded-md gap-4">
          <div className="flex flex-col text-left w-2/3 h-auto px-8 py-5 justify-center  ">
            <p className="mb-3 text-4xl text-[#001F3F]">
              Welcome {name ? name : "Guest"}!
            </p>
            <p className="mb-3 text-xl text-left text-[#001F3F]">
              {currentDate}
            </p>
          </div>
        </div>

        {/* Second section */}
        <div className="flex rounded-md gap-4 bg-secondaryDark">
          <div className="flex flex-col gap-4">
            {/* Stats Section */}
            <div className="flex flex-col bg-secondaryLight rounded-md justify-center items-around p-4">
              <h2 className="self-center text-lg">Today&apos;s Appointments</h2>
              <div className="flex flex-row items-start ">
                <StatCard text="Total" textColor="text-[#001F3F]" number={9} />
                <StatCard
                  text="Cancelled"
                  textColor="text-[#001F3F]"
                  number={3}
                />
                <StatCard text="Missed" textColor="text-[#001F3F]" number={2} />
              </div>
            </div>
            {/*Bar Graph Section */}
            <div className="flex-row justify-center bg-secondaryLight rounded-md p-4">
              <h3 className="w-full mx-auto text-center text-xl text-[#001F3F] font-bold">
                Weekly Appointment Trends
              </h3>
              <BarChart
                xAxis={[
                  {
                    id: "barCategories",
                    data: [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                    ],
                    scaleType: "band",
                  },
                ]}
                series={[
                  {
                    data: weekAppointmentCount,
                  },
                ]}
                width={500}
                height={300}
              />
            </div>
          </div>
          <div className="flex flex-col items-center  bg-secondaryLight rounded-md p-4">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-textDark">
              Upcoming Appointments
            </h2>
            {/* <appointmentsToday className="map"></appointmentsToday> */}
            {/* <div className="bg-white h-[80px] m-2">Monday 23rd, 2025 8am</div>
            <div className="bg-white h-[80px] m-2">Monday 23rd, 2025 8am</div>
            <div className="bg-white h-[80px] m-2">Monday 23rd, 2025 8am</div>
            <div className="bg-white h-[80px] m-2">Monday 23rd, 2025 8am</div> */}
          </div>
          {/* quick links section */}
          <div className="flex flex-col w-full justify-start items-center p-4">
            <h3 className="w-full mx-auto text-center text-xl text-[#001F3F] font-bold">
              Quick Access
            </h3>
            <div className="flex flex-col gap-4 justify-start items-center">
              <QuickAccessLink
                href="/patientEducation"
                text="Patient Education"
              />
              <QuickAccessLink href="/createPatient" text="Create Patient" />
              <QuickAccessLink href="/TREATMENTMASTER???" text="Treatments" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
