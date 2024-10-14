import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { getProducts } from 'lib/shopify';

export const metadata = {
  title: 'Products',
  description: 'Browse our collection of products.'
};

export default async function ProductsPage() {
  // Fetch products from Shopify
  const products = await getProducts({});

  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold">Our Products</h1>
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : (
        <p>No products available at the moment.</p>
      )}
    </section>
  );
}
