"use client"

import ProductForm from "./ProductForm"
import { useParams } from "next/navigation"
import { toast } from "react-toastify"
import { ProductFormSchema } from "@/src/schema"
import { CldImage } from 'next-cloudinary';
import updateProduct from '@/actions/update-product-action';
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache"

export default function AddProductForm({children}: {children: React.ReactNode}) {
    
  const route = useRouter();
  const params = useParams();

  const productId = +params.id!;

    const handleSubmit = async(formData: FormData) => {
      // Validando formulario
      const result = ProductFormSchema.safeParse({
        name: formData.get('name'),
        price: formData.get('price'),
        categoryId: formData.get('categoryId'),
        image: formData.get('image')
      })

      if(!result.success){
        result.error.issues.forEach((issue) => {
          toast.error(issue.message)
        })
      }

      // Editar mediante action el producto
      const response = await updateProduct(productId, result.data);
      if(response.success){
        toast.success('¡Producto actualizado correctamente!')
      }

      route.push('/admin/products');      
    }

  return (
    <div className="bg-white py-10 px-5 mx-auto rounded-md shadow-md max-w-3xl">
        <form action={handleSubmit}>

            {children}

            <input 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-800 text-white w-full 
                mt-5 p-3 uppercase font-bold cursor-pointer shadow-md"
                value={'Editar producto'} />

        </form>
        

    </div>
  )
}