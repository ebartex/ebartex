'use client';

import Infobar from "@/common/components/infobar";
import Navbar from "@/common/components/navbar";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type Product = {
  nazwa: string;
  // Dodaj inne pola, które mogą być obecne w danych
};

export default function Szukaj() {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || ''; // Pobranie wartości parametru 'q' z URL

  // Pobieranie danych z API
  const fetchResults = async (query: string) => {
    setLoading(true);

    try {
      const response = await fetch(`https://bapi.ebartex.pl/products/format5.json?Product-nazwa=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setResults(data.Product);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Obsługuje zmiany zapytania w URL i wywołuje fetchResults
  useEffect(() => {
    if (query) {
      fetchResults(query);
    }
  }, [query]); // Dodano `query` jako zależność

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Infobar />
      <Navbar />

      <div className="p-4">
        {loading && <p>Loading...</p>}
        {!loading && results.length > 0 && (
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result.nazwa}</li>
            ))}
          </ul>
        )}
        {!loading && results.length === 0 && (
          <p>No results found</p>
        )}
      </div>
    </Suspense>
  );
}
