"use client";

import { ProductSearchSchema } from "@/src/schema";
import { useRouter } from "next/navigation"; // Redirección en cliente
import { toast } from "react-toastify";

export default function ProductSearch({
  totalProducts = 0,
  searchTerm = "",
}: {
  totalProducts: number;
  searchTerm: string;
}) {
  const route = useRouter();

  const handleSearch = (formData: FormData) => {
    // Validando los datos
    const result = ProductSearchSchema.safeParse({
      searchTerm: formData.get("search"),
    });

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });

      return;
    }

    route.push(`/admin/products?search=${result.data.searchTerm}`);
  };

  return (
    <form className="flex gap-3" action={handleSearch}>
      <input
        type="text"
        placeholder="Buscar producto"
        name="search"
        className="p-2 placeholder-gray-400 w-full"
      />
      <input
        type="submit"
        value={"Buscar"}
        className="bg-[#a4854e] p-2 font-bold text-white cursor-pointer"
      />
    </form>
  );
}
