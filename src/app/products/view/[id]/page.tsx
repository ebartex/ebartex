// app/products/[id]/page.js
import React from 'react';

// Funkcja asynchroniczna do pobrania danych
async function getProductData(id) {
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
const Product = async ({ params }) => {
  const { id } = params;
  try {
    const product = await getProductData(id);

    if (!product || !product.Product[0].nazwa) {
      return <div>Produkt nie został znaleziony.</div>;
    }

    return (
      <div>
        <h1>{product.Product[0].nazwa}</h1>
      </div>
    );
  } catch (error) {
    return <div>Wystąpił błąd: {error.message}</div>;
  }
};

export default Product;
