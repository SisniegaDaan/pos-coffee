"use client"
import { useStore } from '@/src/store'
import React, { useMemo } from 'react'
import { toast } from 'react-toastify'
import ProductDetails from '../products/ProductDetails';
import { formatCurrency } from '@/src/utils'
import { createOrder } from '@/actions/create-order-action';
import { OrderSchema } from '@/src/schema';

export default function OrderSummary() {

  // Importando la orden desde el store global
  const order = useStore(state => state.order);
  const clearOrder = useStore(state => state.clearOrder);

  // Calculando el valor del total...
  const total = useMemo(() => order.reduce((total, item) => (total + item.quantity * item.price), 0), [order])

  const handleCreateOrder = async (formData: FormData) => {

      const data = {
        name: formData.get('name'),
        total,
        order
      }

      // Validación de campos con ZOD (npm i zod).
      const result = OrderSchema.safeParse(data);

      if(!result.success){

        // Mostrar mensaje de error con Toast...
        result.error.issues.forEach((issue) => {
          toast.error(issue.message);
        });
        
        return;
      }

      // Actions ayudan a ejecutar las inserciones a la base de datos desde el servidor...   
      const response = await createOrder(data);

      // Revisando validación del servidor
      if(response?.errors){
        response.errors.forEach((issue:any) => {
          toast.error(issue.message);
        })

        return;
      }

      toast.success("Pedido registrado correctamente");

      // Reiniciar carrito
      clearOrder();

  }


  return (
    <div className="flex flex-col md:w-96 h-screen p-5 relative">
      <h1 className="text-4xl font-black mb-5">Mi pedido</h1>

      {order.length === 0 ? 
        
        <p className="flex flex-1 items-center justify-center">No hay productos aún.</p>
        
        : 
        
        <div className="flex-1 overflow-y-scroll mb-10">
          { order.map(item => (
          <ProductDetails key={item.id} item={item} />
          ))}
        </div>
        }

        <div className="w-80 bottom-10 left-8">
          <h2 className="text-center font-bold">Total: { formatCurrency(total) }</h2>
          
          <form action={handleCreateOrder}>
            <input 
              type="text"
              placeholder="Ingresa tu nombre..." 
              className="bg-white border border-gray-100 p-2 w-full my-5"
              name="name"
            />
            <button className="w-full bg-[#3c2c14] text-white font-bold text-center p-2 rounded-md">
              Confirmar orden
            </button>
          </form>
        </div>
      
    </div>
  )
}
