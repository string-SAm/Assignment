import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface LineChartData {
  data?: number[];
}

interface LineChartProps {
  data: LineChartData;
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    const ctx = chartRef.current;

    if (!ctx || !data.data) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // Fixed labels
        datasets: [{
          label: '',
          data: data.data,
          backgroundColor: 'transparent',
          borderColor: '#2a7ae3',
          pointBorderColor: 'transparent',
          pointBorderWidth: 1,
          tension: 0.4
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            display: false
          },
          y: {
            display: false
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div style={{ height: '100px', transition: "all .3s" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default LineChart;
