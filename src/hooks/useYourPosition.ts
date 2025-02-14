import { useState } from "react";
import { MapPositionInterface } from "./useGeolocation";
export function useYourPosition() {
  const [yourPosition, setYourPosition] = useState<MapPositionInterface>();
  return { yourPosition, setYourPosition };
}
