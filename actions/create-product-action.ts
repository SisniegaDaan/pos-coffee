"use server"

import { prisma } from "@/src/lib/prisma";
import { ProductFormSchema } from "@/src/schema";

export const createProduct = async(data: unknown) => {

    console.log("Recibiendo data")
    console.log(data)

    const result = ProductFormSchema.safeParse(data);
    if(!result.success){
        return {errors: result.error.issues};
    }

    try {
        const response = await prisma.product.create({data: result.data});
        return {success: true, data: response}
        
    } catch (error) {
        return {errors: error}
        
    }
    
}