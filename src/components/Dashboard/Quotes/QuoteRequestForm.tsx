// src/components/QuoteRequestForm.tsx
import { useState } from 'react';
import { useAuth } from '@/features/auth/AuthProvider';
import { fetchQuotes, submitQuoteRequest } from '@/services/quoteService';

export function QuoteRequestForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    trim: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitQuoteRequest(user.id, vehicleDetails);
      // Show success message or redirect
    } catch (error) {
      console.error('Error creating quote request:', error);
      // Show error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="make" className="block text-sm font-medium">
          Make
        </label>
        <input
          type="text"
          id="make"
          value={vehicleDetails.make}
          onChange={(e) => setVehicleDetails(prev => ({ ...prev, make: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      {/* Add similar fields for model, year, and trim */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-primary text-white rounded-md"
      >
        {loading ? 'Submitting...' : 'Submit Quote Request'}
      </button>
    </form>
  );
}