import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { TopVariant } from '../../Models/Chart';

type Props = {
  data: TopVariant[];
};

const PieChartTop = ({ data }: Props) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [datas, setDatas] = useState<number[]>([]);

  const getLabel = () => {
    if (data && Array.isArray(data)) {
      const newLabels = data.map(item => `${item.variantId}-${item.name}-${item.totalQuantity}`);
      setLabels(newLabels);
    }
  };

  const getdata = () => {
    if (data && Array.isArray(data)) {
      const newData = data.map(item => item.totalQuantity);
      setDatas(newData);
    }
  };

  useEffect(() => {
    getLabel();
    getdata();
  }, [data]);

  // Dữ liệu và cấu hình cho biểu đồ
  const chartOptions = {
    chart: {
      type: 'donut',
    },
    labels: labels,
    responsive: [
      {
        breakpoint: 1000,
        options: {
          chart: {
            width: 1000,
          },
          legend: {
            position: 'bottom' 
            
          },
        },
      },
    ],
    legend: {
      position: 'bottom', // Đặt vị trí chú thích ở dưới
    },
  };

  const chartSeries = datas;

  return (
    <div>
      <h2>Sơ đồ tròn</h2>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="donut"
        height={500} // Giảm chiều cao nếu cần
      />
    </div>
  );
};

export default PieChartTop;
