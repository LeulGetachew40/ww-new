export interface MapPositionInterface {
  lat: number;
  lng: number;
}
export function getPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation)
      reject(new Error("Your browser doesn't support the Geolocation API"));
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve({ lat: coords.latitude, lng: coords.longitude });
      },
      (error) => {
        reject(new Error(error.message));
      },
      { maximumAge: 0, timeout: 10000 }
    );
  });
}
