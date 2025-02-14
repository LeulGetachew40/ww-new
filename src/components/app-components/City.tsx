import cityStyles from "./City.module.css";
import { useCityContext } from "../../contexts/CityContext";
import Spinner from "./Spinner";
import BackButton from "../BackButton";

const formatDate = (date: string | null) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date as string));

function City() {
  // TEMP DATA
  const { currentCity, isLoading } = useCityContext();
  const { cityName, date, emoji, notes } = currentCity;
  if (isLoading) return <Spinner />;
  return (
    <div className={cityStyles.city}>
      <div className={cityStyles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={cityStyles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={cityStyles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={cityStyles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;

// to get url parameters - useParams
// to get query parameters - useSearchParams
// to get context - useContext
