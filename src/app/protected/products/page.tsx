'use client';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import ProductTable from '@/components/ProductTable';
import { Product } from '@/types';
import Loading from '../../../components/loading';
import { useAppDispatch, useAppSelector  } from '../../../store';
import { fetchProducts, deleteProduct } from '../../../reducers/productsSlice';
const DashboardOverview: React.FC = () => {
  debugger
  const { products, status, error } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(products.length== 0){
      dispatch(fetchProducts());
    }
   
  }, [dispatch]);
  if (status === 'loading') {
    return  <Loading />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  return (
    <div className='mt-4'>
     <h1 className="text-center text-3xl font-semibold text-gray-800 mb-6">Products Listing</h1>
      
    
        <ProductTable products={products} /> 
    
    </div>
  );
};

export default DashboardOverview;