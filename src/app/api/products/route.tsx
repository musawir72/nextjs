import { NextResponse } from "next/server";

  export async function GET() {
    try {
      const response = await fetch('https://dummyjson.com/products',{
        headers: {
            'Content-Type': 'application/json',
          },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }
      const products = await response.json();
      return NextResponse.json({ products });
    } catch (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json({});
    }
  }

  export async function POST(request:any) {
    const {title,description,price,category,brand,stock,thumbnail} = request.json();
   const res = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title,description,price,category,brand,stock,thumbnail})
      })
       const product =  await res.json()
       return NextResponse.json({ product }); 
    
  }