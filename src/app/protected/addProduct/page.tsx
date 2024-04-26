'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../reducers/productsSlice';
import Loading from '@/components/loading';
interface FormData {
  title: string;
  description: string;
  price: string;
  category: string;
  brand: string;
  stock: string;
  thumbnail: string;
}

const AddProductForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    stock: '',
    thumbnail: '',
  });
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch();
const router  =  useRouter()
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    debugger
    e.preventDefault();
    // Add code to submit form data to the backend
    console.log('Form submitted:', formData);
    try {
        setLoading(true)
        const res =  await fetch('/api/products',{method:'POST',headers:{"content-type":"application/json"},body:JSON.stringify(formData)})
        if(res.ok){
            const { product } = await res.json();
            dispatch(
                addProduct({
                  id: product.id, // Generate a random ID for the new product
                  ...formData
                })
              );
              setLoading(false)
        router.push('/protected/products')
        }else{
            setLoading(false)
        throw new Error("Failed to create a Product")
        }
    } catch (error) {
        console.log(error)
    }
  
  };
  if (loading === true) {
    return  <Loading />;
  }
  return (
    <div className="max-w-md mx-auto  bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-3">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={2}
            className="p-2 w-full border border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            className="p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
            Thumbnail URL
          </label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            required
            className="p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;