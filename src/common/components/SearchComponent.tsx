'use client';

import { useEffect, useState } from 'react';

type SearchContentProps = {
    initialQuery: string;
};

function SearchContent({ initialQuery }: SearchContentProps) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://bapi.ebartex.pl/products/format5.json?Product-nazwa=?${initialQuery}?`);
            const data = await response.json();
            setData(data.Product || []);
        };

        if (initialQuery) {
            fetchData();
        }
    }, [initialQuery]);

    return (
        <div>
            {data ? (
                <p>Załadowane dane: {JSON.stringify(data)}</p>
            ) : (
                <p>Ładowanie...</p>
            )}
        </div>
    );
}

export default SearchContent;
