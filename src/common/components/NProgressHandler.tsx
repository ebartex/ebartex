'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Styl paska ładowania

NProgress.configure({ showSpinner: false });

export default function NProgressHandler() {
  const pathname = usePathname(); // Monitorowanie ścieżek

  useEffect(() => {
    const productPagePattern = /^\/products\/[^/]+\/[^/]+$/;

    if (productPagePattern.test(pathname)) {
      NProgress.start(); // Start tylko dla pasujących ścieżek
    } else {
      NProgress.done();
    }

    return () => {
      NProgress.done();
    };
  }, [pathname]);

  return null; // Komponent nie renderuje nic
}
