'use client';

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Infobar from "@/common/components/infobar";
import Navbar from "@/common/components/navbar";

type Product = {
  nazwa: string;
  // Dodaj inne pola, które mogą być obecne w danych
};

function SearchResults() {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const query = searchParams.get('q') || ''; // Pobranie wartości parametru 'q' z URL

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetch(`https://bapi.ebartex.pl/products/format5.json?Product-nazwa=?${encodeURIComponent(query)}?`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          return response.json();
        })
        .then((data) => {
          setResults(data.Product);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [query]); // Dodano `query` jako zależność

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      {results.length > 0 ? (
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result.nazwa}</li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}

export default function Szukaj() {
  return (
    <Suspense fallback={<div>Ładowanie wyników wyszukiwania...</div>}>
      <Infobar />
      <Navbar />
      <SearchResults />
    </Suspense>
  );
}
