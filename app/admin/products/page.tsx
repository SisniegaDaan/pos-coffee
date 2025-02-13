import Link from "next/link"
import Heading from "@/components/ui/Heading"
import ProductTable from "@/components/products/ProductTable"
import ProductSearch from "@/components/products/ProductSearch"
import { prisma } from "@/src/lib/prisma"
import ProductsNavigation from "@/components/products/ProductsNavigation"

async function productsCount(searchTerm: string){
  return await prisma.product.count({
    where: {
      name: {
        contains: searchTerm,
        mode: 'insensitive'
      }
    }
  });
}

async function getProducts(page: number = 1, pageSize: number = 10, searchTerm: string = '') {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: 'insensitive'
      }
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
    include: {
      category: true
    }
  })

  return products
}

export default async function page({searchParams}: {searchParams: Promise<{page:string, search: string}>}) {

  // Buscando params dentro del servidor
  const { page, search} = await searchParams;
  
  const productsPage = await +page || 1;
  const searchTerm = await search || ''
  const pageSize = 10;

  // Cuando existen multiples promsas independientes podemos realizarlas ambas en paralelo...
  // promise #1: const products = await getProducts(page, pageSize);
  // promise #2: const totalProducts = await productsCount();

  const [products, totalProducts] = await Promise.all([getProducts(productsPage, pageSize, searchTerm), productsCount(searchTerm)])
  const totalPages = Math.ceil(totalProducts / pageSize)

  return (
    <div>
      <Heading>Administración de productos</Heading>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <div className="mb-5 lg:w-1/3 lg:mb-0 ">
          <ProductSearch totalProducts={totalProducts} searchTerm={searchTerm} />
          <span className="text-sm italic ml-2">
            {`${totalProducts} results${searchTerm !== '' ? ` from ${searchTerm}.`: '.'}`}
          </span>
        </div>
        <Link 
          href="/admin/products/new" 
          className="bg-[#a4854e] text-white w-full text-center lg:w-auto py-3 px-10 font-bold cursor-pointer">
          New product
        </Link>
      </div>
      <div>
        <ProductTable products={products} />
        <ProductsNavigation page={productsPage} totalPages={totalPages} searchTerm={searchTerm} />
      </div>
    </div>


  )
}
