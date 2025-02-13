import Heading from "@/components/ui/Heading";
import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import { prisma } from "@/src/lib/prisma";
import { notFound, redirect } from "next/navigation";

const getProductById = async(id: number) => {
    const product = await prisma.product.findUnique({
        where: { id }
    })

    if(!product){
        notFound();
    }

    return product
}


export default async function page({ params }: { params: { id: string }}) {

    const product = await getProductById(+params.id);

  return (
    <>
        <Heading>Edición de productos: </Heading>
        <EditProductForm>
            <ProductForm product={product}/>
        </EditProductForm>

    
    </>
  

)
}
