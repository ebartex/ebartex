// app/products/view/[id]/page.tsx
import ProductImageGallery from '@/common/components/ProductImageGallery';
import React from 'react';
type tParams = Promise<{id: string}>;

// Funkcja asynchroniczna do pobrania danych
async function getProductData(id: string) {
  const response = await fetch(`https://bapi.ebartex.pl/products/format5.json?Product-tw_id=${id}`, {
    cache: 'no-store', // Zapewnia, że dane są zawsze świeże
  });

  if (!response.ok) {
    throw new Error('Nie udało się pobrać danych produktu');
  }

  const data = await response.json();
  return data;
}

// Komponent funkcjonalny
const Product = async ({ params }: { params: tParams } ) => {
  const {id} = await params;

    const product = await getProductData(id);
    console.log(product.Product[0]);
    if (!product || !product.Product[0].nazwa) {
      return <div>Produkt nie został znaleziony.</div>;
    }

    return (
      <div>
        <h1>{product.Product[0].nazwa}</h1>
        <ProductImageGallery imageSrc={product.Product[0].photo_512 || []} />
      </div>
    );

};

export default Product;
