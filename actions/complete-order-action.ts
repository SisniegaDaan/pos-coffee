"use server"

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
import { OrderIdSchema } from "@/src/schema"

export default async function completeOrder(formData: FormData){

    const data = {
        orderId: formData.get('order_id')
    }

    // Validando el formulario con zod
    const result = OrderIdSchema.safeParse(data);

    if(result.success){

        try {

            await prisma.order.update({
                where: {
                    id: result.data.orderId
                },
                data: {
                    status: true,
                    orderReadyAt: new Date(Date.now())
                }
            })

            revalidatePath('/admin/orders');
            
        } catch (error) {
            
        }
    }
}