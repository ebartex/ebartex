'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Styl paska ładowania

// Konfiguracja NProgress
NProgress.configure({ showSpinner: false });

export default function NProgressHandler() {
  const pathname = usePathname(); // Użycie usePathname do śledzenia zmiany ścieżki

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    // Rozpoczęcie i zakończenie ładowania przy każdej zmianie ścieżki
    handleStart();
    handleStop();
  }, [pathname]); // Zależność od zmiany ścieżki

  return null; // Komponent nie renderuje niczego
}