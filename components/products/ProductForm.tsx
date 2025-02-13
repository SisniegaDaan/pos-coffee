import { prisma } from "@/src/lib/prisma";
import ImageUpload from "../ui/ImageUpload";
import { Product } from "@prisma/client";
import Image from "next/image";
import { validateImagePath } from "@/src/utils";

const getCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

export default async function ProductForm({ product }: { product?:Product }) {
  
  const categories = await getCategories();

  return (
    <>
      <div className="space-y-2 my-4">
        <label className="text-slate-800" htmlFor="name">
          Nombre:
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className="block w-full p-3 bg-slate-100"
          placeholder="Nombre Producto"
          defaultValue={product?.name}
        />
      </div>

      <div className="space-y-2 my-4">
        <label className="text-slate-800" htmlFor="price">
          Precio:
        </label>
        <input
          id="price"
          name="price"
          className="block w-full p-3 bg-slate-100"
          placeholder="Precio Producto"
          defaultValue={product?.price}
        />
      </div>

      <div className="space-y-2 my-4">
        <label className="text-slate-800" htmlFor="categoryId">
          Categoría:
        </label>
        <select
          className="block w-full p-3 bg-slate-100"
          id="categoryId"
          name="categoryId"
          defaultValue={product?.categoryId}
        >
          <option value="">-- Seleccione --</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}

        </select>
      </div>

      <ImageUpload image={product?.image}/>

    </>
  );
}
