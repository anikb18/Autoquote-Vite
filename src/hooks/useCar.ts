import { useState, useEffect } from 'react';
import { carApi } from '@/services/carApi';

interface CarDetails {
  make: string;
  model: string;
  year: number;
  class?: string;
  fuel_type?: string;
  transmission?: string;
}

interface UseCarProps {
  make: string;
  model: string;
  year: number;
}

const VALID_YEARS = [2024, 2025];
const DEFAULT_CAR = {
  make: 'Toyota',
  model: 'Corolla',
  year: 2025
};

export function useCar({ make, model, year }: UseCarProps) {
  const [carDetails, setCarDetails] = useState<CarDetails[]>([]);
  const [carImage, setCarImage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        // Validate year
        if (!VALID_YEARS.includes(year)) {
          console.warn(`Invalid year ${year}. Using default year ${DEFAULT_CAR.year}`);
          year = DEFAULT_CAR.year;
        }

        // Normalize input
        const normalizedMake = make?.trim().toLowerCase() || DEFAULT_CAR.make;
        const normalizedModel = model?.trim().toLowerCase() || DEFAULT_CAR.model;

        // Fetch car details from your API
        carApi.getCarDetails(normalizedModel)
          .then(details => {
            setCarDetails(details);
            setError(null);
          })
          .catch(err => {
            console.error('Error fetching car details:', err);
            setError('Failed to fetch car details');
            
            // Set default values on error
            setCarDetails([DEFAULT_CAR]);
          });

        // Fetch car image from your API
        carApi.getCarImage(normalizedMake, normalizedModel, year)
          .then(imageUrl => {
            setCarImage(imageUrl);
            setError(null);
          })
          .catch(err => {
            console.error('Error fetching car image:', err);
            setError('Failed to fetch car image');
            
            // Set a placeholder image URL - replace with actual car image API
            setCarImage(`https://picsum.photos/seed/${normalizedMake}-${normalizedModel}-${year}/800/400`);
          });
      } catch (err) {
        console.error('Error fetching car details:', err);
        setError('Failed to fetch car details');
        
        // Set default values on error
        setCarDetails([DEFAULT_CAR]);
        setCarImage(`https://picsum.photos/seed/${DEFAULT_CAR.make}-${DEFAULT_CAR.model}-${DEFAULT_CAR.year}/800/400`);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [make, model, year]);

  const getCarModels = async (make: string) => {
    try {
      setLoading(true);
      const models = await carApi.getCarModels(make);
      setError(null);
      return models;
    } catch (err) {
      console.error('Error fetching car models:', err);
      setError(err as Error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { carDetails, carImage, loading, error, getCarModels };
}
