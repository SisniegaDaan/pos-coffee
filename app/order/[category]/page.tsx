import ProductCard from '@/components/products/ProductCard';
import { prisma } from '@/src/lib/prisma';
import Heading from '@/components/ui/Heading';


// Consultar productos por la categoría actual...
async function getProducts(category: string) {

    const products = await prisma.product.findMany({
        where: {
            category: {
                slug: category
            }
        }
    });
    
    return products

}

export default async function OrderPageCategory({params}: {params: {category: string}}) {
    
    const {category} = await params;

    const products = await getProducts(category);

    return (
        <div>
            <Heading>Elige tus productos</Heading>
            <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4 items-start">
            {products.map( product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>    
        </div>
        
    )
}