import { useEffect, useState } from "react";
import mapStyles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { MapPositionInterface, getPosition } from "../../hooks/useGeolocation";
import { useNavigate } from "react-router-dom";
import { useCitiesContext } from "../../contexts/CitiesContext";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import User from "../User";
const Map = () => {
  const [mapPosition, setMapPosition] = useState<MapPositionInterface>({
    lat: 20,
    lng: 30,
  });

  const [yourPosition, setYourPosition] = useState<MapPositionInterface>({
    lat: 0,
    lng: 0,
  });
  const { cities } = useCitiesContext();

  const { paramsLat, paramsLng } = useUrlPosition();

  const navigate = useNavigate();

  // when the component loads, center the map to the user's current location
  useEffect(() => {
    async function getCurrentLocation() {
      const position = await getPosition();
      setMapPosition({
        lat: (position as MapPositionInterface).lat,
        lng: (position as MapPositionInterface).lng,
      });
      setYourPosition({
        lat: (position as MapPositionInterface).lat,
        lng: (position as MapPositionInterface).lng,
      });
    }
    getCurrentLocation();
    navigate("/app/cities");
  }, []);

  useEffect(() => {
    if (paramsLat && paramsLng)
      setMapPosition({
        lat: Number(paramsLat),
        lng: Number(paramsLng),
      });
  }, [paramsLat, paramsLng]);

  return (
    <div className={mapStyles.mapContainer}>
      <User />
      <MapContainer
        center={!paramsLat && !paramsLng ? yourPosition : mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={mapStyles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {cities.map(({ position, cityName, emoji }, index) => {
          return (
            <Marker position={position} key={index}>
              <Popup>
                {cityName} {emoji}
              </Popup>
            </Marker>
          );
        })}

        <ChangeView position={mapPosition} />
        <HandleClickMap />
      </MapContainer>
    </div>
  );
};
function ChangeView({ position }: { position: MapPositionInterface }) {
  const map = useMap();
  if (!position) {
    return null;
  }
  map.flyTo(position, map.getZoom(), { animate: true, duration: 1.5 });
  return null;
}
function HandleClickMap() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      // will render the form component and also change the url search params
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}

export default Map;
