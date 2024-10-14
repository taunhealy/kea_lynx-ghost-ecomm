import { useQuery } from "@tanstack/react-query";
import { getProducts } from "lib/shopify";
import { Product } from 'lib/shopify/types'

export default function Presets() {
    const { data: products, isLoading, error} = useQuery<Product[]>({
        queryKey: ['presets'],
        queryFn: () => getProducts({ query: 'tag:Presets'}),

    });

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loaidng products</div>

    return (
        <div className="presets-grid">
            {products?.map((product) => (
                <div key={product.id} className="preset-card">
                    <div className="preset-card-header">{product.title}</div>
                    <div className="preset-card-body">
                        <img src={product.featuredImage?.url} alt={product.title} />
                    </div>
                    <div className="preset-card-footer">
                        {product.priceRange.maxVariantPrice.amount} {product.priceRange.maxVariantPrice.currencyCode}
                    </div>
                </div>
            ))}
        </div>
    )
}
