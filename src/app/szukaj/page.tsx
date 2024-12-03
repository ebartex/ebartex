'use client';
import Infobar from "@/common/components/infobar";
import Navbar from "@/common/components/navbar";
import { useEffect, useState, Suspense } from "react";

type Product = {
  nazwa: string;
  // Dodaj inne pola, które mogą być obecne w danych
};

export default function Szukaj() {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Pobieranie danych z API
  const fetchResults = async (query: string) => {
    setLoading(true);

    try {
      const response = await fetch(`https://bapi.ebartex.pl/products/format5.json?Product-nazwa=?${encodeURIComponent(query)}?`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setResults(data.Product);

    } catch {
      // Opcjonalnie: Dodaj tutaj logowanie błędów dla debugowania
    } finally {
      setLoading(false);
    }
  };

  // Obsługuje zmiany zapytania w URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    if (query) {
      fetchResults(query);
    }
  }, []);

  return (
    <>
      <Infobar />
      <Navbar />
      <Suspense fallback={<div>Ładowanie...</div>}>
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
    </>
  );
}
