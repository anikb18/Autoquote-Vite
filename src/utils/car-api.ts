export interface CarData {
  make: string;
  model: string;
  year: number;
}

export interface CarImageConfig {
  angle?: string;
  color?: string;
}

export const CAR_ANGLES = {
  FRONT: '5',
  SIDE: '23',
  BACK: '29',
  TOP: '13'
} as const;

export const CAR_COLORS = {
  GREEN: 'radiant-green',
  RED: 'red',
  BLUE: 'blue',
  BLACK: 'black',
  WHITE: 'white',
  SILVER: 'silver'
} as const;

export async function fetchCarData(model: string) {
  try {
    const response = await fetch(
      `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=${model}`,
      {
        headers: {
          'X-RapidAPI-Key': '979015f2femsh9e2e1e9106c00cap11f09ajsn78da3339b575',
          'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching car data:', error);
    return null;
  }
}

export const generateCarImageUrl = (
  car: CarData,
  config: CarImageConfig = {}
) => {
  const url = new URL('https://cdn.imagin.studio/getimage');
  const { angle = CAR_ANGLES.FRONT, color = CAR_COLORS.GREEN } = config;

  url.searchParams.append('customer', 'hrjavascript-mastery');
  url.searchParams.append('make', car.make);
  url.searchParams.append('modelFamily', car.model.split(' ')[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${car.year}`);
  url.searchParams.append('angle', angle);
  url.searchParams.append('paintId', color);

  return url.toString();
};
