// src/app/szukaj/page.tsx
'use client';

import Infobar from "@/common/components/infobar";
import Navbar from "@/common/components/navbar";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Wyniki from "./wyniki";

export default function Szukaj() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || ''; // Pobranie wartości parametru 'q' z URL

  return (
    <>
      <Infobar />
      <Navbar />

      <Suspense fallback={<p>Loading results...</p>}>
        <Wyniki query={query} />
      </Suspense>
    </>
  );
}
