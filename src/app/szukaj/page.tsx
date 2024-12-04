'use client';

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Infobar from "@/common/components/infobar";
import Navbar from "@/common/components/navbar";
import Link from "next/link";
import Image from "next/image";
type Product = {
  nazwa: string
  photo_512: string,
  tw_id: number
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
      fetch(`https://bapi.ebartex.pl/products/format5.json?Product-nazwa=?${encodeURIComponent(query)}?&Product-cenad=!0.0`)
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
    <div className="flex flex-col md:flex-row">
      <aside className="hidden md:flex md:w-1/6 md:bg-gray-200 p-4">

      </aside>
      <main className="flex-1 p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Wyniki wyszukiwania</h1>
      </header>
      <section>

        <ul className="space-y-2">
        {results.length > 0 ? (
        <div className="bg-white grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-0 w-full">
          {results.map((result) => (
                                    <Link
                                    key={result.tw_id}
                                    href={`/products/view/${result.tw_id}/${encodeURIComponent(
                                        result.nazwa.toLowerCase().replace(/\s+/g, '-')
                                    )}`}
                                    className="p-4 border border-slate-200 flex flex-col items-center hover:bg-slate-100 transition-colors"
                                >
                                    <Image
                                        width={100}
                                        height={100}
                                        src={result.photo_512 || "https://via.placeholder.com/150"}
                                        alt={result.nazwa}
                                        className="w-32 h-32 object-cover mb-4"
                                    />
                                    <span className="text-center">{result.nazwa}</span>
                                    <p className="text-gray-600 mt-2">ID: {result.tw_id}</p>
                                </Link>            

          ))}
        </div>
      ) : (
        <p>No results found</p>
      )}

        </ul>
      </section>
    </main>

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
