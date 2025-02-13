"use server"

import { ProductFormSchema } from "@/src/schema";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function updateProduct(productId: number, data: unknown){

        const result = ProductFormSchema.safeParse(data);
        if(!result.success){
            return {errors: result.error.issues};
        }

        try {
            const response = await prisma.product.update({
                where: {id: productId}, 
                data: result.data});

            revalidatePath("/admin/products");
            return {success: true, data: response}
                
        } catch (error) {
            return {errors: error}
        
        }

}