"use client";
import React, { useState, useEffect } from "react";
import QuickAccessLink from "@/components/dashboard/QuickAccessLink";
import { BarChart } from "@mui/x-charts/BarChart";
import StatCard from "@/components/dashboard/StatCards";
import { getAppointmentsCountByWeek } from "./lib/wrapperApi";
import UpcomingAppointment from "@/components/dashboard/UpcomingAppointment";

interface Appointment {
  name: string;
  date: string;
  time: string;
}
interface Day {
  day: string;
  count: number;
}

const Page: React.FC = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [name, setName] = useState<string | null>(null);
  const [appointmentsToday, setAppointmentsToday] = useState<Appointment[]>([]);
  const [weekAppointmentCount, setWeekAppointmentCount] = useState<Day[]>([]);
  const [jwt, setJwt] = useState<string | null>(null);

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
    const jwt = localStorage.getItem("token");
    setName(name);
    setJwt(jwt);
  }, []);

  useEffect(() => {
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
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/appointment/utils/upcoming`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          const sliced = data.slice(0, 4);
          setAppointmentsToday(sliced);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointmentsToday();
  }, [jwt]);

  return (
    <>
      <div className="flex flex-col w-full h-full bg-secondaryDark p-4 gap-4">
        {/* First section */}
        <div className="flex w-full bg-secondaryLight rounded-md gap-4 max-w-7xl">
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
        <div className="flex rounded-md gap-4 bg-secondaryDark max-w-7xl">
          <div className="flex flex-col gap-4">
            {/* Stats Section */}
            <div className="flex flex-col bg-secondaryLight rounded-md justify-center items-around p-4">
              <h2 className="self-center text-xl font-bold text-textDark">
                Today&apos;s Appointments
              </h2>
              <div className="flex flex-row items-start ">
                <StatCard text="Total" textColor="text-textDark" number={9} />
                <StatCard
                  text="Cancelled"
                  textColor="text-textDark"
                  number={3}
                />
                <StatCard text="Missed" textColor="text-textDark" number={2} />
              </div>
            </div>
            {/*Bar Graph Section */}
            <div className="flex-row justify-center bg-secondaryLight rounded-md p-4">
              <h3 className="w-full mx-auto text-center text-xl text-[#001F3F] font-bold">
                Weekly Appointment Trends
              </h3>
              <BarChart
                borderRadius={5}
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
                    color: "#3d5767",
                  },
                ]}
                width={500}
                height={300}
              />
            </div>
          </div>
          <div className="flex flex-col items-center  bg-secondaryLight rounded-md p-4">
            <h2 className="mb-2 text-xl font-bold text-textDark">
              Upcoming Appointments
            </h2>

            {/* Upcoming Appointments */}
            <div className="flex flex-col gap-2 w-full">
              {appointmentsToday.length > 0 &&
                appointmentsToday.map((appointment, index) => (
                  <UpcomingAppointment key={index} appointment={appointment} />
                ))}
            </div>
          </div>
          {/* quick links section */}
          <div className="flex flex-col justify-start items-center p-4 bg-secondaryLight rounded-md">
            <h3 className="w-full text-center text-xl text-textDark font-bold mb-2">
              Quick Access
            </h3>
            <div className="flex flex-col gap-4 justify-start items-center">
              <QuickAccessLink
                href="/costestimator"
                text="Cost Estimation"
              />
              <QuickAccessLink href="/patient/createPatient" text="Create Patient" />
              <QuickAccessLink href="/treatmentMaster" text="Treatments" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
