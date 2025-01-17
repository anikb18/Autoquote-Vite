import { env } from '@/env.mjs';

interface CarImageOptions {
  make: string;
  model: string;
  year?: number;
  angle?: string;
  color?: string;
}

interface CarDetails {
  make: string;
  model: string;
  year: number;
  fuel_type: string;
  transmission: string;
  drive: string;
  city_mpg: number;
  highway_mpg: number;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  class: string;
  imageUrl?: string;
}

const CARS_API_KEY = '979015f2femsh9e2e1e9106c00cap11f09ajsn78da3339b575';
const CARS_API_HOST = 'cars-by-api-ninjas.p.rapidapi.com';
const IMAGIN_CUSTOMER = 'hrjavascript-mastery';
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80';

// Cache for storing car details to avoid repeated API calls
const carCache = new Map<string, CarDetails>();

/**
 * Creates a URL for fetching a car image from the Imagin Studio API
 */
export function createCarImageUrl(car: CarImageOptions, angle: string = ''): string {
  try {
    const url = new URL('https://cdn.imagin.studio/getimage');
    
    // Required parameters
    url.searchParams.append('customer', IMAGIN_CUSTOMER);
    url.searchParams.append('make', car.make);
    url.searchParams.append('modelFamily', car.model.split(' ')[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    
    if (car.year) {
      url.searchParams.append('modelYear', `${car.year}`);
    }
    
    // Optional parameters
    if (angle) url.searchParams.append('angle', angle);
    if (car.color) url.searchParams.append('paintId', car.color);
    
    return url.toString();
  } catch (error) {
    console.error('Error creating car image URL:', error);
    return FALLBACK_IMAGE;
  }
}

/**
 * Fetches car details from the Cars API
 */
export async function fetchCarDetails(options: CarImageOptions): Promise<CarDetails[]> {
  try {
    const { make, model, year } = options;
    const response = await fetch(
      `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?${make ? `make=${make}&` : ''}${model ? `model=${model}&` : ''}${year ? `year=${year}` : ''}`,
      {
        headers: {
          'X-RapidAPI-Key': CARS_API_KEY,
          'X-RapidAPI-Host': CARS_API_HOST,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch car details');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching car details:', error);
    return [];
  }
}

/**
 * Gets car details with image URL, using cache when available
 */
export async function getCarDetailsWithImage(options: CarImageOptions): Promise<CarDetails | null> {
  try {
    const cacheKey = `${options.make}-${options.model}-${options.year}`;
    
    // Check cache first
    if (carCache.has(cacheKey)) {
      return carCache.get(cacheKey)!;
    }

    // Fetch car details
    const cars = await fetchCarDetails(options);
    if (!cars || cars.length === 0) {
      return null;
    }

    // Get the first matching car
    const car = cars[0];

    // Generate image URL
    const imageUrl = createCarImageUrl(options, options.angle);

    // Create car details object with image
    const carDetails: CarDetails = {
      ...car,
      imageUrl: imageUrl
    };

    // Cache the result
    carCache.set(cacheKey, carDetails);

    return carDetails;
  } catch (error) {
    console.error('Error in getCarDetailsWithImage:', error);
    return null;
  }
}

// Available car colors
export const carColors = {
  green: 'radiant-green',
  blue: 'ocean-blue',
  red: 'candy-red',
  black: 'midnight-black',
  white: 'pearl-white',
  silver: 'metallic-silver',
  yellow: 'racing-yellow',
  orange: 'sunset-orange',
  purple: 'royal-purple',
  custom: (hexColor: string) => hexColor
} as const;
