import { useState } from 'react';

const useErrorBoundary = () => {
  const [error, setError] = useState<Error | null>(null);

  const ErrorBoundaryComponent = () => {
    if (error) {
      return (
        <div className="text-red-500 p-4">
          <p>Error: {error.message}</p>
          <button onClick={() => setError(null)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
            Reset
          </button>
        </div>
      );
    }
    return null;
  };

  return { ErrorBoundaryComponent, setError };
};

export default useErrorBoundary;