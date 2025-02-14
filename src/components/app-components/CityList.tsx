import cityListStyles from "./CityList.module.css";
import Spinner from "./Spinner";
// import CityInterface from "../../utils/cityInterface";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCitiesContext } from "../../contexts/CitiesContext";
// interface CityListProps {
//   citiesList: CityInterface[];
//   isLoading: boolean;
// }

const CityList = () => {
  const { isLoading, cities: citiesList } = useCitiesContext();
  if (isLoading) return <Spinner />;
  if (citiesList.length === 0)
    return <Message message="Click on the map and start touring ..." />;
  return (
    <ul className={cityListStyles.cityList}>
      {citiesList.map((city) => {
        return <CityItem city={city} key={city.id} />;
      })}
    </ul>
  );
};

export default CityList;
