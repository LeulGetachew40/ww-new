import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchParams] = useSearchParams();
  const paramsLat = searchParams.get("lat");
  const paramsLng = searchParams.get("lng");
  return { paramsLat, paramsLng };
}
