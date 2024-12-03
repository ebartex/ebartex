import { useEffect, useState } from 'react';

type Product = {
  nazwa: string;
  // Dodaj inne pola, które mogą być obecne w danych
};

type WynikiProps = {
  query: string;
};

const Wyniki: React.FC<WynikiProps> = ({ query }) => {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`https://bapi.ebartex.pl/products/format5.json?Product-nazwa=?${encodeURIComponent(query)}?`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setResults(data.Product || []);
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (results.length === 0) {
    return <p>No results found</p>;
  }

  return (
    <ul>
      {results.map((result, index) => (
        <li key={index}>{result.nazwa}</li>
      ))}
    </ul>
  );
};

export default Wyniki;
