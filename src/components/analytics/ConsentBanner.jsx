'use client';
import React, { useState } from 'react';

const ConsentBanner = () => {
  const [consentGiven, setConsentGiven] = useState(false);

  const handleAccept = () => {
    setConsentGiven(true);
    // You could store consent status in cookies/localStorage here
  };

  if (consentGiven) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex flex-col md:flex-row items-center justify-between z-50">
      <p className="mb-2 md:mb-0">
        We use cookies to improve your experience. By using our site, you agree to our use of cookies.
      </p>
      <button
        onClick={handleAccept}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Accept
      </button>
    </div>
  );
};

export default ConsentBanner;
