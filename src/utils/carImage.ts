interface CarDetails {
  make: string;
  model: string;
  year: number;
}

export function createCarImage(car: CarDetails, angle: string): string {
  // This is a placeholder URL - you'll need to replace it with your actual car image service
  return `https://cdn.autoquote24.com/cars/${car.year}/${car.make}/${car.model}/angle_${angle}.webp`;
}
