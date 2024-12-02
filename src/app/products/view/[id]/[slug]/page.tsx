// Importy i typy

import Navbar from '@/common/components/navbar';
import ProductDetails from '@/common/components/ui/product/productDetails';
import { NextPage } from 'next';

type PostPageProps = {
  params: {
    id: string;
    slug: string;
  };
}

// Główna funkcja komponentu
const Product: NextPage<PostPageProps> = async ({ params }) => {
  const { id } = params;

  // Pobieranie danych
  const response = await fetch(
    `https://bapi.ebartex.pl/products/format5.json?Product-tw_id=${id}`,
    { next: { revalidate: 5 } }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch product data: ${response.statusText}`);
  }

  const product: ProductResponse = await response.json();

  if (!product.Product || product.Product.length === 0) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="product">
        <h1>{product.Product[0].nazwa}</h1>
   
        <ProductDetails details={product} />
      </div>
    </div>
  );
}


export default Product;