import { prisma } from "@/src/lib/prisma";
import Heading from "@/components/ui/Heading";
import OrderCard from "@/components/order/OrderCard";
import { revalidatePath } from "next/cache";

async function getPendingOrders() {
  const orders = await prisma.order.findMany({
    where: {
      status: false,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return orders;
}

const revalidateOrders = async() => {
  "use server"
  revalidatePath("/admin/orders");
}

export default async function page() {

  const orders = await getPendingOrders();

  return (
    <>
      <Heading>Administración de órdenes</Heading>

      <form action={revalidateOrders}>
        <input 
          type="submit" 
          className="bg-[#a4854e] text-white px-10 py-3 text-lg text-center font-bold cursor-pointer w-full lg:w-auto" 
          value="Actualizar órdenes" />
      </form>

      {orders.length ? (

        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-20">
          { orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))} 
        </div>

      ) : "No hay órdenes pendientes"
      }
    </>
  )
}
