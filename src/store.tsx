import { create } from 'zustand'
import { OrderItem } from './types'
import { Product } from '@prisma/client';


interface Store {
    order: OrderItem[],
    addToOrder: (product: Product) => void,
    increaseQuantity: (id: Product['id']) => void,
    decreaseQuantity: (id: Product['id']) => void,
    removeItem: (id: Product['id']) => void ,
    clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToOrder: (product) => {
        
        const {image, categoryId, ...data} = product;
        let order: OrderItem[] = []

        // Si dentro de la orden ya se encuentra un item con el mismo ID...
        if(get().order.find(item => item.id === product.id)) {

            // Se actualiza la cantidad
            order = get().order.map(item => item.id === product.id ?
                
                { ...item, 
                    quantity: item.quantity + 1, 
                    subtotal: (item.quantity + 1) * product.price }   
                
                :
                
                item
            )
        
        } else {

            // Si no, agregar item nuevo
            order = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }

        set(() => ({
            order // order: order
        }));

        console.log(get().order);
    },
    increaseQuantity: (id) => {

        // Buscaremos el id del ProductDetail en el store de order para incrementar su catidad...
        set(state => ({
            
            order: state.order.map(item => item.id === id ? 
                
                { ...item, 
                    quantity: item.quantity + 1,
                    subtotal: (item.quantity + 1) * item.price }
            
            : 
            
            item 
        )
            
        }))
    },
    decreaseQuantity: (id) => {
        
        let order: OrderItem[]

        order = get().order.map(item => item.id === id ? 
            
            { ...item, 
                quantity: item.quantity - 1,
                subtotal: (item.quantity - 1) * item.price } 
            
            : 

            item

        ).filter(item => item.quantity > 0) // Elimina los items con cantidad 0...

        set(() => ({
            order
        }))
    
    },
    removeItem: (id) => {
        set(state => ({
            order: state.order.filter(item => item.id !== id)
        }))
    },
    clearOrder: () => {
        set(() => ({
            order: []
        }))
    }}
));