import React from 'react';

// A small illustrated stand-in for a food photo — built from layered blobs
// in the dish's palette, so every dish gets a distinct "plate" without
// using any real photography.
function Plate({ dish }) {
  const [c1, c2, c3, c4] = dish.palette;
  const rounded = dish.plate === 'round';

  return (
    <div className={`plate ${rounded ? 'plate--round' : 'plate--square'}`}>
      <div className="plate__rim">
        <svg
          className="plate__food"
          viewBox="0 0 320 320"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <clipPath id={`clip-${dish.id}`}>
              {rounded ? (
                <circle cx="160" cy="160" r="140" />
              ) : (
                <rect x="24" y="24" width="272" height="272" rx="28" />
              )}
            </clipPath>
          </defs>
          <g clipPath={`url(#clip-${dish.id})`}>
            <rect width="320" height="320" fill={c4} />
            <path d="M20 200 Q160 120 300 190 L320 320 L0 320 Z" fill={c2} opacity="0.9" />
            <ellipse cx="120" cy="140" rx="70" ry="52" fill={c1} opacity="0.9" />
            <ellipse cx="215" cy="120" rx="46" ry="40" fill={c3} opacity="0.95" />
            <circle cx="110" cy="205" r="10" fill={c3} opacity="0.8" />
            <circle cx="145" cy="220" r="7" fill={c1} opacity="0.7" />
            <circle cx="180" cy="200" r="9" fill={c2} opacity="0.6" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default Plate;
