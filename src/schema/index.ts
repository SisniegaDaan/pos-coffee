import { z } from 'zod'

export const OrderSchema = z.object({
    name: z.string().min(1, 'Tu nombre es obligatorio'),
    total: z.number(),
    order: z.array(z.object({
         id: z.number(),
         name: z.string(),
         price: z.number(),
         quantity: z.number(),
         subtotal: z.number()
    })).min(1, 'Ingresa al menos un producto')
});

export const OrderIdSchema = z.object({
    orderId: z.string()
        .transform((value) => parseInt(value))
        .refine((value) => value > 0, {message: "Error en el ID"})
})

export const ProductSearchSchema = z.object({
    searchTerm: z.string()
            .trim()
            .min(1, "Ingresa un valor para buscar")
})

export const ProductFormSchema = z.object({
    name: z.string().trim().min(1, "Ingresa el nombre del producto"),
    price: z.string().trim().transform((value) => parseFloat(value)).or(z.number()).refine((value) => value > 0,{message: "Ingesa una cantidad positiva"}),
    categoryId: z.string().trim().transform((value) => parseInt(value)).or(z.number()).refine((value) => value > 0, {message: "Selecciona una categoria válida"}),
    image: z.string().min(1, "Inserta una imagen para este producto")  
})