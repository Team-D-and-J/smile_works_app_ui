import Chart from "react-apexcharts";
import React, { useEffect, useState } from "react";
import { getAppointmentsCountByWeek } from "@/app/lib/wrapperApi";

const Graph: React.FC = () => {

  const [confirmedAppointments, setConfirmedAppointments] = useState<number[]>([0, 0, 0, 0, 0]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  console.log("Fetching appointment data...");
  const fetchAppointments = async () => {
    try {
      const today = new Date().toISOString().split("T")[0]; // Get today's date

      const data = await getAppointmentsCountByWeek(today);
      
      console.log("Fetched Data:", data); // Debug API response

      const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      const countByDay = daysOrder.map(day => {
        const entry = data.find((item: { day: string; count: number }) => item.day === day);
        return entry ? entry.count : 0;
      });

      setConfirmedAppointments(countByDay);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchAppointments();
}, []);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    yaxis: {
      title: {
        text: "# (patients)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `$ ${val} thousands`,
      },
    },
  };

  const series = [
    {
      name: "Confirmed Appointments",
      data: confirmedAppointments,
    },
    {
      name: "Canceled Appointments",
      data: [76, 85, 101, 98, 87,],
    },
    {
      name: "Missed Appointments",
      data: [35, 41, 36, 26, 45],
    },
  ];

  return <Chart options={options} series={series} type="bar" height={350} />;
};

export default Graph;
