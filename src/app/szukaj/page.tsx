'use client';
import Image from "next/image";
import Navbar from "@/common/components/navbar";
import { useSearchParams } from "next/navigation";
import '@/styles/globals.css';
import { fetchBapi } from "@/common/api/fetchBapi";
import { useState, useEffect } from "react";
import Link from "next/link";
import Infobar from "@/common/components/infobar";

export default function Szukaj() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    const [loading, setLoading] = useState<boolean>(true);
    const [results, setResults] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchBapi(
                    `https://bapi.ebartex.pl/products/format5.json?Product-nazwa=?${initialQuery}?`, 
                    { revalidate: 5 }
                );
                setResults(data.Product || []);
            } catch (err) {
                setError('Wystąpił błąd podczas pobierania danych.');
            } finally {
                setLoading(false);
            }
        };

        if (initialQuery) {
            fetchData();
        } else {
            setResults([]);
            setLoading(false);
        }
    }, [initialQuery]);

    return (
        <>
            <Infobar />  
            <Navbar />
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-bold my-4">Wyniki wyszukiwania</h1>

                {/* Obsługa stanu ładowania, błędu lub wyników */}
                <div className="w-full">
                    <aside className="hidden md:block bg-white p-4"></aside>
                    <main className="p-4 bg-gray-100">
                        {loading ? (
                            <p>Ładowanie wyników...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : results.length > 0 ? (
                            <div className="bg-white grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-0 w-full">
                                {results.map((item: any) => (
                                    <Link
                                        key={item.tw_id}
                                        href={`/products/view/${item.tw_id}/${encodeURIComponent(
                                            item.nazwa.toLowerCase().replace(/\s+/g, '-')
                                        )}`}
                                        className="p-4 border border-slate-200 flex flex-col items-center hover:bg-slate-100 transition-colors"
                                    >
                                        <Image
                                            src={item.photo_512 || "https://via.placeholder.com/150"}
                                            alt={item.nazwa}
                                            className="w-32 h-32 object-cover mb-4"
                                        />
                                        <span className="text-center">{item.nazwa}</span>
                                        <p className="text-gray-600 mt-2">ID: {item.tw_id}</p>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p>Brak wyników.</p>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
}
