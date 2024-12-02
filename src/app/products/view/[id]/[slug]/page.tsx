import { fetchBapi } from '@/common/api/fetchBapi';
import Navbar from '@/common/components/navbar';
import ProductDetails from '@/common/components/ui/product/productDetails';
import ProductImage from '@/common/components/ui/product/productImage';
type PostPageProduct = {
  params: {
    id: string,
    slug: string
  }
}
export default async function Product({ params }:  PostPageProduct ) {
  // Ensure params is awaited before accessing id and slug
  const { id, slug } = params;

  // Fetch product details based on the ID (and slug if needed)
  const product = await fetchBapi(`https://bapi.ebartex.pl/products/format5.json?Product-tw_id=${id}`, { revalidate: 5 });

  return (
    <div>
      <Navbar />
      <div className="product">
      {product.Product[0].nazwa}
      <ProductImage image={product.Product[0].photo_512} />
      <ProductDetails details={product} />
      </div>
    </div>
  );
}
 