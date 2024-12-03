import { useEffect, useState } from "react";

type Product = {
  nazwa: string;
  // Dodaj inne pola, które mogą być obecne w danych
};

type WynikiProps = {
  query: string;
};

const Wyniki: React.FC<WynikiProps> = ({ query }) => {
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
      if (data && Array.isArray(data.Product)) {
        setResults(data.Product);
      } else {
        setResults([]); // Ustaw puste wyniki, jeśli struktura danych jest nieprawidłowa
      }
    } catch (error) {
      console.error("Błąd podczas pobierania danych:", error);
      setResults([]); // Ustaw puste wyniki w przypadku błędu
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchResults(query);
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
