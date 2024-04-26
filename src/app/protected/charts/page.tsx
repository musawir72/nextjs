'use client'
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import Loading from '@/components/loading';
import { useAppDispatch, useAppSelector } from '../../../store';
import { fetchProducts } from '../../../reducers/productsSlice';

const DashboardOverview: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, status, error } = useAppSelector((state) => state.products);
  const linearChartRef = useRef<HTMLCanvasElement>(null);
  const productCountChartRef = useRef<HTMLCanvasElement>(null);
  const linearChartInstance = useRef<Chart | null>(null);
  const productCountChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      renderCharts();
    }
  }, [status, products]);

  const renderCharts = () => {
    destroyCharts(); // Destroy existing charts before rendering new ones
    renderProductCountChart();
    renderLinearMetricGraph();
  };

  const destroyCharts = () => {
    if (linearChartInstance.current) {
      linearChartInstance.current.destroy();
      linearChartInstance.current = null;
    }
    if (productCountChartInstance.current) {
      productCountChartInstance.current.destroy();
      productCountChartInstance.current = null;
    }
  };

  const renderProductCountChart = () => {
    const counts: { [key: string]: number } = {};
    products.forEach((product: any) => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });

    const categories = Object.keys(counts);
    const countsData = Object.values(counts);

    const productCountChartCtx = productCountChartRef.current?.getContext('2d');
    if (productCountChartCtx) {
      productCountChartInstance.current = new Chart(productCountChartCtx, {
        type: 'bar',
        data: {
          labels: categories,
          datasets: [{
            label: 'Product Count',
            data: countsData,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  };

  const renderLinearMetricGraph = () => {
    const linearMetricData = Array.from({ length: 12 }, (_, i) => Math.floor(Math.random() * 5) + 1);

    const linearChartCtx = linearChartRef.current?.getContext('2d');
    if (linearChartCtx) {
      linearChartInstance.current = new Chart(linearChartCtx, {
        type: 'line',
        data: {
          labels: Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`),
          datasets: [{
            label: 'Average Rating',
            data: linearMetricData,
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            fill: false
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 5
            }
          }
        }
      });
    }
  };

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col m-auto mt-8 md:flex-row min-w-32">
    <div className="flex-1 ml-2 mr-2 md:mr-4 mb-4 md:mb-0">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Average Rating Over Time</h2>
        <canvas ref={linearChartRef} className='min-24 sm-2'></canvas>
      </div>
    </div>
    <div className="flex-1 ml-2 mr-2 md:ml-4">
      <div className="mb-5">
        <h2 className="text-lg font-semibold mb-2">Product Count by Category</h2>
        <canvas ref={productCountChartRef} className='min-24 sm-2'></canvas>
      </div>
    </div>
  </div>
  


  );
};

export default DashboardOverview;