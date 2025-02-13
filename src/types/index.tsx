import { Order, OrderProduct, Product } from "@prisma/client"

// Type de OrderIten dentro del carrito
export type OrderItem = Pick<Product, 'id' | 'name' | 'price'> & {
    quantity: number,
    subtotal: number
}

export type OrderWithProducts = Order & {
    orderProducts: (OrderProduct & {
        product: Product
    })[]
}