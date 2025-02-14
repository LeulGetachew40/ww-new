import { Link } from "react-router-dom";
import CityInterface from "../../utils/cityInterface";
import cityItemStyles from "./CityItem.module.css";
import { useCityContext } from "../../contexts/CityContext";
import { useCitiesContext } from "../../contexts/CitiesContext";
import { MouseEvent } from "react";
interface CityItemProps {
  city: CityInterface;
}

const CityItem = ({ city }: CityItemProps) => {
  const { currentCity } = useCityContext();
  const { deleteCity } = useCitiesContext();
  const date = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(city.date));

  return (
    <li>
      <Link
        to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
        className={`${cityItemStyles.cityItem} ${
          currentCity.id === city.id ? cityItemStyles["cityItem--active"] : ""
        }`}
      >
        <span className={cityItemStyles.emoji}>{city.emoji}</span>
        <h3 className={cityItemStyles.name}>{city.cityName}</h3>
        <span className={cityItemStyles.date}>{date}</span>
        <button
          className={cityItemStyles.deleteBtn}
          onClick={(e: MouseEvent) => {
            e.preventDefault();
            if (city.id) deleteCity(city.id?.toString());
          }}
        >
          x
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
