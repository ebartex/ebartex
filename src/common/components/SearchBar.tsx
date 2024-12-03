'use client';
import { useState, Suspense } from 'react';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchBar: React.FC = () => {
    const searchParams = useSearchParams();
    const initialSearchTerm = searchParams.get('q') || ''; // Pobranie wartości parametru 'q' z URL

    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      router.push(`/szukaj?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <Suspense fallback={<div>Ładowanie...</div>}>
    <div className="flex-1 mx-4 relative">
      <form onSubmit={handleSearchSubmit} className="w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Szukaj..."
          className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:outline-4 focus:outline-slate-400"
        />
        <button
          type="submit"
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
        >
          <Search size={20} />
        </button>
      </form>
    </div>
    </Suspense>
  );
};

export default SearchBar;
