import { Bar } from 'react-chartjs-2';
import { Product } from '../utils/api';

interface ChartProps {
  products: Product[];
}

const Chart: React.FC<ChartProps> = ({ products }) => {
  // Count products by category
  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: 'Product Count',
        data: Object.values(categoryCounts),
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }]
    },
  };

  return (
    <div>
      <h2>Product Count by Category</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Chart