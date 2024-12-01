'use client'; // Dodaj to na górze pliku

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchContent from '@/common/components/SearchComponent'; // Jeśli SearchContent nie jest klientem, to również dodaj 'use client' wewnątrz tego pliku.

export default function Szukaj() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || '';

    return (
        <Suspense fallback={<p>Ładowanie...</p>}>
            <SearchContent initialQuery={initialQuery} />
        </Suspense>
    );
}
