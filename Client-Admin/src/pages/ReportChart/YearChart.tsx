import React from "react";
import Chart from "react-apexcharts";
import { YearReport } from "../../Models/Chart";

interface MonthlyTotalChartProps {
  data: YearReport[]; // Dữ liệu đầu vào
}

const YearChart: React.FC<MonthlyTotalChartProps> = ({ data }) => {

  // Chuẩn bị dữ liệu cho ApexCharts
  const chartOptions = {
    chart: {
      id: "monthly-total-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: data.map((d) => "Tháng "+d.oderMonth), // Gắn tháng vào trục x
      title: {
        text: "Tháng",
      },
    },
    yaxis: {
      title: {
        text: "Tổng tiền (VND)",
      },
    },
    tooltip: {
      y: {
        formatter: (value: number) => `${value.toLocaleString()} VND`, // Format tiền VND
      },
    },
    colors: ["#008FFB"], // Màu sắc cột
    title: {
      text: "Tổng tiền theo từng tháng trong năm",
      align: "center",
    },
  };

  const chartSeries = [
    {
      name: "Tổng tiền",
      data: data.map((d) => d.totalAmount), // Gắn tổng tiền vào cột
    },
  ];

  return (
    <div>
      <Chart options={chartOptions} series={chartSeries} type="bar" height={600} />
    </div>
  );
};

export default YearChart;
