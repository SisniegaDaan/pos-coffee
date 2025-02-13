import { formatCurrency } from "@/src/utils";
import { Product } from "@prisma/client";
import Image from "next/image";
import AddProductButton from "./AddProductButton";
import { validateImagePath } from "@/src/utils";


export default function ProductCard({product}: {product: Product}) {

    const {name, price, image} = product

    return (
        <div className="bg-white boder shadow-xl border-slate-500">

            <Image 
                width={400}
                height={500}
                src={`${validateImagePath(image)}`}
                alt={`Imagen de producto - ${name}`} />

            <div className="p-3">
                <h3 className="text-2xl font-bold">
                    {name}
                </h3>
                <p className="text-4xl font-black text-[#fcbc44]">
                    {formatCurrency(price)}
                </p>
                <AddProductButton product={product}/>
            </div>
        </div>
    )
}
