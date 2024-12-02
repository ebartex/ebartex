// app/products/view/[id]/page.tsx
import React from 'react';

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
const Product = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    const product = await getProductData(id);

    if (!product || !product.nazwa) {
      return <div>Produkt nie został znaleziony.</div>;
    }

    return (
      <div>
        <h1>{product.nazwa}</h1>
      </div>
    );
  } catch (error) {
    return <div>Wystąpił błąd: {error.message}</div>;
  }
};

export default Product;
