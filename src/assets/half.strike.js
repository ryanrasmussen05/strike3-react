import React from 'react';

/* eslint-disable max-len */
export const HalfStrikeSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <clipPath id="half-strike-clip-path">
      <rect x="0" y="0" width="100" height="200" />
    </clipPath>

    <g clipPath="url(#half-strike-clip-path)">
      <circle cx="100" cy="100" r="90" fill="#ff3629" />
      <line x1="50" y1="50" x2="150" y2="150" strokeWidth="16" stroke="#ffffff" strokeLinecap="round" />
      <line x1="50" y1="150" x2="150" y2="50" strokeWidth="16" stroke="#ffffff" strokeLinecap="round" />
    </g>
  </svg>
);
