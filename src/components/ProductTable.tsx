import { useState, useEffect } from 'react';
import { Product } from '@/types';
import RemoveProduct from './RemoveBtn';
import { HiPencilAlt, HiDocumentAdd } from 'react-icons/hi';
import Link from 'next/link';

interface ProductTableProps {
  products: Product[];
}

const ProductTable: React.FC<any> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [brandFilter, setBrandFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleCategoryFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setCategoryFilter(value);
    filterProducts(value, brandFilter, searchQuery);
  };

  const handleBrandFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setBrandFilter(value);
    filterProducts(categoryFilter, value, searchQuery);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
    filterProducts(categoryFilter, brandFilter, value);
  };

  const filterProducts = (category: string, brand: string, search: string) => {
    let filtered = products.filter((product:any) => {
      return (
        (category === '' || product.category.toLowerCase().includes(category.toLowerCase())) &&
        (brand === '' || product.brand.toLowerCase().includes(brand.toLowerCase())) &&
        (search === '' ||
          product.title.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase()))
      );
    });
    setFilteredProducts(filtered);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProducts.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Extract unique categories and brands for select options
  const categories: any = [];
  products.forEach((product:any) => {
    if (categories.indexOf(product.category) === -1) {
      categories.push(product.category);
    }
  });

  const brands: any = [];
  products.forEach((product:any) => {
    if (brands.indexOf(product.brand) === -1) {
      brands.push(product.brand);
    }
  });

  return (
    <>
      <div className="mb-4 flex flex-col md:flex-row justify-between mx-auto max-w-screen-lg">
        <div className="md:w-1/4 mb-2 md:mb-0">
          <select
            className="w-full px-4 py-2 border rounded"
            value={categoryFilter}
            onChange={handleCategoryFilterChange}
          >
            <option value="">Filter by category</option>
            {categories.map((category:any, index:any) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="md:w-1/4 mb-2 md:mb-0">
          <select
            className="w-full px-4 py-2 border rounded"
            value={brandFilter}
            onChange={handleBrandFilterChange}
          >
            <option value="">Filter by brand</option>
            {brands.map((brand:any, index:any) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div className="md:w-1/4 mb-2 md:mb-0">
          <input
            type="text"
            placeholder="Search by title or description"
            className="w-full px-4 py-2 border rounded"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
        <div>
          <button className="bg-stone-400 px-3 py-2 rounded text-white shadow-md hover:bg-stone-500">
            <Link href="/protected/addProduct">
              <div className="flex items-center">
                <HiDocumentAdd size={24} className="mr-1" />
                Add Product
              </div>
            </Link>
          </button>
        </div>
      </div>

      <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4 hidden md:table-cell">Category</th>
              <th className="py-2 px-4 hidden md:table-cell">Brand</th>
              <th className="py-2 px-4 hidden md:table-cell">Stock</th>
              <th className="py-2 px-4">Thumbnail</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentItems.map((product, index) => (
              <tr key={index} className="border-t">
                <td className="py-4 px-6 border-b border-gray-200">{product.title}</td>
                <td className="py-4 px-6 border-b border-gray-200">{product.price}</td>
                <td className="py-4 px-6 hidden md:table-cell border-b border-gray-200">{product.category}</td>
                <td className="py-4 px-6 hidden md:table-cell border-b border-gray-200">{product.brand}</td>
                <td className="py-4 px-6 hidden md:table-cell border-b border-gray-200">{product.stock}</td>
                <td className="py-4 px-6 border-b border-gray-200">
                  <img src={product.thumbnail} alt={product.title} className="w-12 h-12 object-cover" />
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  <RemoveProduct id={product.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="flex justify-center mt-4">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className={`px-3 py-1 mr-2 border rounded ${currentPage === number ? 'bg-gray-200' : ''}`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductTable;