import axios from 'axios';

interface CarImageResponse {
  url: string;
  alt: string;
}

interface CarDetails {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
}

const API_KEY = '979015f2femsh9e2e1e9106c00cap11f09ajsn78da3339b575';
const API_HOST = 'cars-by-api-ninjas.p.rapidapi.com';
const BASE_URL = 'https://cars-by-api-ninjas.p.rapidapi.com/v1';

export async function getCarDetails(make: string, model: string, year: number): Promise<CarDetails | null> {
  try {
    const options = {
      method: 'GET',
      url: `${BASE_URL}/cars`,
      params: { make, model, year: year.toString() },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST
      }
    };

    const response = await axios.request(options);
    const data = response.data;

    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }

    return null;
  } catch (error) {
    console.error('Error fetching car details:', error);
    return null;
  }
}

export async function getCarImage(make: string, model: string, year: number): Promise<{ url: string; alt: string }> {
  try {
    const options = {
      method: 'GET',
      url: `${BASE_URL}/cars/3d-view`,
      params: { make, model, year: year.toString() },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
        'Accept': 'image/jpeg, image/png, image/webp'
      },
      responseType: 'blob' as const
    };

    const response = await axios.request(options);
    const url = URL.createObjectURL(response.data);

    return {
      url,
      alt: `${year} ${make} ${model}`
    };
  } catch (error) {
    console.error('Error getting car image:', error);
    return {
      url: '/images/car-placeholder.jpg',
      alt: `${year} ${make} ${model}`
    };
  }
}
