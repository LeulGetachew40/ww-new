import { useCitiesContext } from "../../contexts/CitiesContext";
// import CountryItemInterface from "../../utils/countryInterface";
import CountryItem from "./CountryItem";
import countryListStyles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
// interface CountriesListProps {
//   countries: CountryItemInterface[];
//   isLoading: boolean;
// }
const CountriesList = () => {
  const { isLoading, countries } = useCitiesContext();
  if (isLoading) return <Spinner />;
  if (countries.length === 0)
    return (
      <Message message="Start visiting cities and polpulate the countries list" />
    );

  return (
    <ul className={countryListStyles.countryList}>
      {countries.map((country) => {
        return <CountryItem key={country.id} country={country} />;
      })}
    </ul>
  );
};

export default CountriesList;
