import React from 'react';

const Planet = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0v2m0 16v2m8-10h-2m-12 0H4m15.364-6.364l-1.414 1.414M5.636 18.364l-1.414-1.414M18.364 18.364l-1.414-1.414M5.636 5.636l-1.414 1.414"
      />
    </svg>
  );
};

export default Planet;
