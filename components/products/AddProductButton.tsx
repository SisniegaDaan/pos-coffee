"use client"

import { useStore } from "@/src/store"
import { Product } from "@prisma/client"
import { useMemo } from "react"

type AddProductButtonProps = {
    product: Product
}

export default function AddProductButton({product}: AddProductButtonProps) {

    const addToOrder = useStore(state => (state.addToOrder));
    

    return (
        <button
            type="button" 
            className="bg-[#a4854e] hover:bg-[#d0ab7c] w-full pt-2 pb-2 mt-3 text-white font-bold"
            onClick={() => addToOrder(product)}>
            Agregar
        </button>
  )
}
