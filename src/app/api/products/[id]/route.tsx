import { NextResponse } from "next/server";

export async function PUT(request:any,{ params }: { params: any }){
    const {title,description,price,category,brand,stock,thumbnail} = request.json();
    const {id} = params

    fetch(`https://dummyjson.com/products/${id}`, {
        method: 'PUT', /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title,description,price,category,brand,stock,thumbnail
        })
      })

      return NextResponse.json({message:"Product Updated"},{status:200})
}

export async function DELETE(request: Request,{ params }: { params: { id: any } }){
  console.log(params)
        const id = params.id


   const response =  await fetch(`https://dummyjson.com/products/${id}`, {
    method: 'DELETE',
    })

    const product =  await response.json()
    return Response.json({ product })
}