'use client'
import { HiOutlineTrash } from "react-icons/hi"
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../reducers/productsSlice';
export default function RemoveProduct ({id}){
    const dispatch = useDispatch();
    const removeProdcut = async()=> {
        const confirmed = confirm('Are you sure?')
        debugger
        if(confirmed){
                const res =  await fetch(`/api/products/${id}`,{method:'DELETE'}) 
                const { product } = await res.json();
                dispatch(
                    deleteProduct({
                      id: product.id,
                    })
                  );
        }
    }
   
    return <button onClick={removeProdcut} className="text-red-400">
       <HiOutlineTrash size={24} />
  </button>
}