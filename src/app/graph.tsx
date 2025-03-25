import React from "react";
import Chart from "react-apexcharts";

const Graph: React.FC = () => {
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
      name: "Completed Appointments",
      data: [44, 55, 57, 56, 61],
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
