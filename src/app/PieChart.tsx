import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const PieChart: React.FC = () => {
  const chartOptions: ApexOptions = {
    series: [9, 12, 14, 16, 18, 8],
    colors: ["#5CB338", "#D71313", "#2A004E" , "#16423C", "#9B4444", "#567189"],
    chart: {
      height: 420,
      width: "100%",
      type: "pie",
    },
    stroke: {
      colors: ["white"],
      lineCap: "butt",
    },

    labels: ["Monday",  "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",],
    dataLabels: {
      enabled: true,
      formatter: (val, { seriesIndex, w }) => `${w.config.series[seriesIndex]}`, // Show numbers inside pie chart
    },

    tooltip: {
      y: {
        formatter: (value) => `${value} appointments`, // Show numbers in tooltip
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center", 
      floating: false,
      fontSize: "12px",  // Reduce font size
      itemMargin: {
      horizontal: 4, // Space between labels
      vertical: 10,    // Remove extra vertical margin
      },
      fontFamily: "Inter, sans-serif",
    },
  };
  return (
    <div id="pie-chart">
      <Chart options={chartOptions} series={chartOptions.series} type="pie" height={420} />
    </div>
  );
};

export default PieChart;
