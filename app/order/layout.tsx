import OrderSidebar from "../../components/order/OrderSidebar";
import OrderSummary from "../../components/order/OrderSummary";
import ToastNotification from "@/components/ui/ToastNotification";

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
      <>
        <div className="md:flex">

            <OrderSidebar/>
            
            <main className="md:flex-1 h-screen overflow-y-scroll p-8 bg-gray-100">
                {children}
            </main>

            <OrderSummary/>
        </div>

        <ToastNotification />
        
      </>
    );
  }