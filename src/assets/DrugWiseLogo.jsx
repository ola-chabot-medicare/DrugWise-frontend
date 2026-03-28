import { useId } from 'react';

export default function DrugWiseLogo({ size = 40, className = '' }) {
  const uid = useId().replace(/:/g, '');
  const gradId = `shield-grad-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={gradId} x1="24" y1="2" x2="24" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
      </defs>

      {/* Shield shape — rounded top corners, tapers to point at bottom */}
      <path
        d="M24 2 L8 8 C7 8 6 9 6 10 L6 26 C6 35 14 42 24 46 C34 42 42 35 42 26 L42 10 C42 9 41 8 40 8 Z"
        fill={`url(#${gradId})`}
      />

      {/* Medical cross — centered, white */}
      <rect x="20.5" y="13" width="7" height="20" rx="2" fill="white" />
      <rect x="14" y="19.5" width="20" height="7" rx="2" fill="white" />

      {/* Pill shape at bottom of shield */}
      <rect x="17" y="37" width="14" height="5" rx="2.5" fill="white" opacity="0.9" />
    </svg>
  );
}
