'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function PageLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    // next/navigation does not have route change events directly like next/router.
    // We can simulate it by watching pathname and searchParams changes.
    // This will trigger loading state when navigation starts.
    handleStart(); // Start loading on initial render

    const timeoutId = setTimeout(() => {
      handleComplete(); // Complete loading after a short delay to ensure UI updates
    }, 300); // Adjust delay as needed

    return () => clearTimeout(timeoutId);
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <div className="page-loader-overlay">
      <div className="spinner"></div>
    </div>
  );
} 