import { OrderWithProducts } from "@/src/types"
import { formatCurrency } from "@/src/utils"
import completeOrder from "@/actions/complete-order-action"

type OrderCardProps = {
    order: OrderWithProducts
}

export default function OrderCard({ order }: OrderCardProps) {

    return (
        <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-white px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4"
        >
            <p className='text-2xl font-medium text-gray-900'>{order.name} </p>
            <p className='text-lg font-medium text-gray-900'>Productos Ordenados:</p>
            <dl className="mt-6 space-y-4">

                { order.orderProducts.map((product) => (

                    <div key={product.id} className="">
                        <p><span className="font-bold">{`x${product.quantity} `}</span>{product.product.name}</p>
                    </div>
                ))}
        
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">Total a Pagar:</dt>
                    <dd className="text-base font-medium text-gray-900">{formatCurrency(order.total)}</dd>
                </div>
            </dl>

            <form action={completeOrder}>
                <input type="hidden" value={order.id} name="order_id" />
                <input
                    type="submit"
                    className="bg-[#3c2c14] hover:bg-[#a4854e] text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                    value='Marcar Orden Completada'
                />
            </form>
        </section>
    )
}