import Heading from "@/components/ui/Heading";
import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";

export default function page() {
  return (
    <>
      <Heading>Crea un producto nuevo</Heading>
      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>

  )
}
