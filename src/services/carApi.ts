import axios from 'axios';

const RAPID_API_KEY = '979015f2femsh9e2e1e9106c00cap11f09ajsn78da3339b575';
const RAPID_API_HOST = 'cars-by-api-ninjas.p.rapidapi.com';

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

export const carApi = {
  async getCarDetails(model: string): Promise<CarDetails[]> {
    try {
      const response = await axios.get(`https://${RAPID_API_HOST}/v1/cars`, {
        params: { model },
        headers: {
          'x-rapidapi-key': RAPID_API_KEY,
          'x-rapidapi-host': RAPID_API_HOST,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching car details:', error);
      throw error;
    }
  },

  async getCarImage(make: string, model: string, year: number): Promise<string> {
    // Using a placeholder image service - you can replace this with a real car image API
    return `https://cdn.imagin.studio/getimage?customer=autoquote&make=${make}&modelFamily=${model}&modelYear=${year}&angle=1`;
  },

  async getCarModels(make: string): Promise<CarDetails[]> {
    try {
      const response = await axios.get(`https://${RAPID_API_HOST}/v1/cars`, {
        params: { make },
        headers: {
          'x-rapidapi-key': RAPID_API_KEY,
          'x-rapidapi-host': RAPID_API_HOST,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching car models:', error);
      throw error;
    }
  }
};
