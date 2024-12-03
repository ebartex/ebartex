'use client';

import { Suspense } from 'react';
import Infobar from "@/common/components/infobar";
import Navbar from "@/common/components/navbar";
import Wyniki from "./Wyniki";
import { useSearchParams } from "next/navigation";

export default function Szukaj() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <>
      <Infobar />
      <Navbar />
      <div className="p-4">
        <Suspense fallback={<div>Ładowanie wyników...</div>}>
          <Wyniki query={query} />
        </Suspense>
      </div>
    </>
  );
}
