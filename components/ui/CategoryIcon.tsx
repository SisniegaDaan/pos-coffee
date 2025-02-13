//Al usar useParams el componente se debe ejecutar en el cliente.
"use client"

// Este componente recibe mediante props la categoria a mostrar.
import { Category } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

// Se declaran los tipos de los props del componente.
type CategoryIconProps = {
    category: Category // Prisma genera también un tipo de dato para ese modelo.
}


export default function CategoryIcon({category}: CategoryIconProps) {
    // Se aplica destructuring a CategoryIconProps para señalar los props. 

    // Se usa este hook cuando se quiere acceder a params de la url desde un coomponente.
    const params = useParams<{category: string}>();

    return (
        <Link
            className={`${category.slug === params.category? 'bg-[#a4854e] text-white': 'hover:bg-gray-100'} flex items-center gap-10 w-100 p-3 border-gray-200
            border-t last-of-type:border-b cursor-pointer font-semibold`}
            href={`/order/${category.slug}`}
        >
            <Image 
                width={54}
                height={54}
                src={`/icon_${category.slug}.svg`} 
                alt="Icono de categoría"/>
            {category.name}
        </Link>
    )
}
