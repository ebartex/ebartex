// Importy i typy
import Navbar from '@/common/components/navbar';
import ProductDetails from '@/common/components/ui/product/productDetails';
import { Suspense } from 'react';

type ProductResponse = {
  Product: {
    nazwa: string; // Nazwa produktu
    photo_512: string; // URL zdjęcia produktu
    // Dodaj inne właściwości produktu, jeśli są potrzebne
  }[];
};

type PostPageProps = {
  params: {
    id: string;
    slug: string;
  };
};

// Komponent strony produktu
const Product = async ({ params }: PostPageProps) => {
  const { id } = params;

  // Pobieranie danych z API
  const response = await fetch(
    `https://bapi.ebartex.pl/products/format5.json?Product-tw_id=${id}`,
    { next: { revalidate: 5 } } // Użycie ISR jeśli wymagane
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
};

// Eksportowanie komponentu
export default Product;
