'use client';

import { ErrorBoundary } from 'react-error-boundary';

import LandingPage from './LandingPage/page';

function FallbackComponent({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="text-center p-4 text-red-500">
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        Try Again
      </button>
    </div>
  );
}

export default function Home() {
 

  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
     <LandingPage />
    </ErrorBoundary>
  );
}