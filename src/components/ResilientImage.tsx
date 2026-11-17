import { useState } from 'react';
import { Mountain } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  loading?: 'eager' | 'lazy';
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackLabel = 'Desa Wisata Lereng Asri',
  loading = 'lazy',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#E6EDE4] via-[#DCE6D8] to-[#CFDCCA] text-[#1B5E3A] p-6 text-center ${className}`}
      >
        <Mountain className="w-10 h-10 mb-2 opacity-75" strokeWidth={1.5} aria-hidden="true" />
        <p className="font-display text-base font-semibold text-[#162419]">{fallbackLabel}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
