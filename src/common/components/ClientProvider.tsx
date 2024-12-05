// components/ClientProvider.tsx
'use client';

import NProgressHandler from './NProgressHandler';

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NProgressHandler />
      {children}
    </>
  );
}
