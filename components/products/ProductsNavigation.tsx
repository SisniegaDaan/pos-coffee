import Link from "next/link"

type ProductNavigationProps = {
    page: number,
    totalPages: number,
    searchTerm: string
}
 

export default function ProductsNavigation({page, totalPages, searchTerm}: ProductNavigationProps) {

    const pageList = Array.from({length: totalPages}, (_, index) => 1 + index);

  return (
    <nav className="flex justify-center py-10">
        <Link 
            href={`/admin/products?page=${page - 1}`}
            className={`${page === 1 ? 'pointer-events-none text-gray-500' : ''}
            bg-white px-4 py-2 text-m text-grey-900 ring-1 ring-insert ring-gray-300 
            focus:z-20 focus:outline-offset-9`}
        >
        &laquo; 
        </Link>

            {pageList.map((number) => (
                <Link 
                    key={number}
                    href={`/admin/products?page=${number}${searchTerm !== '' ? `&search=${searchTerm}` : ''}`}
                    className={`${page === number ? 'font-black' : ''}
                    bg-white px-4 py-2 my-0 text-m text-grey-900 ring-1 ring-insert ring-gray-300 
                    focus:z-20 focus:outline-offset-9`}
                >
                {number}
                </Link>
            ))}    

        <Link 
            href={`/admin/products?page=${page + 1}`}
            className={`${page === totalPages ? 'pointer-events-none text-gray-500' : ''}
            bg-white px-4 py-2 text-m text-grey-900 ring-1 ring-insert ring-gray-300 
            focus:z-20 focus:outline-offset-9`}
        >
        &raquo; 
        </Link>

    </nav>
  )
}
