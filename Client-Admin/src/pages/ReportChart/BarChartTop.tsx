import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Order, ResponseListOrder, TopVariant } from '../../Models/chart';
import { PageObject } from '../../Models/Common';
import { GetListOrderYear } from '../../Services/OrderService';
import { PAGE_LIMIT_ORDERS } from '../../Utils/constant';
import { toast } from 'react-toastify';

type Props = {
  data: TopVariant[];
};

const BarChartTop = ({ data }: Props) => {
  // Dữ liệu và cấu hình cho biểu đồ
  const [labels, setLabels] = useState<string[]>([]);
  const [datas, setDatas] = useState<number[]>([]);
  

  const getLabel = () => {
    if (data && Array.isArray(data)) {
      const newLabels = data.map(item => {
        return `${item.variantId}-${item.name}-${item.totalQuantity}`;
      });
      setLabels(newLabels); 
    }
  };

 

  const getdata = () => {
    if (data && Array.isArray(data)) {
      const newLabels = data.map(item => {
        return item.totalQuantity;
      });
      setDatas(newLabels); 
    }
  };

  useEffect(() => {
    getLabel();
    getdata();
  }, [data]); 

  const chartOptions = {
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: false, 
        columnWidth: '50%', 
      },
    },
    dataLabels: {
      enabled: false, 
    },
    xaxis: {
      categories: labels, 
    },
    legend: {
      position: 'top',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  const chartSeries = [
    {
      name: 'data',
      data: datas?datas:[], // Sử dụng dữ liệu từ props để vẽ biểu đồ, kiểm tra data trước
    },
  ];


  return (
    <div>
      {datas && labels && (
        <div><h2>Bar Chart Example</h2>
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={500}
        /></div>
      )}
    </div>
  );
};

export default BarChartTop;
