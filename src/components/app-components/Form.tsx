// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Form.module.css";

import Message from "./Message";
import Spinner from "./Spinner";
import BackButton from "../BackButton";
import Button from "./Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCitiesContext } from "../../contexts/CitiesContext";
import { useUrlPosition } from "../../hooks/useUrlPosition";

// export function convertToEmoji(countryCode: string) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt(0));
//   return String.fromCodePoint(...codePoints);
// }

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const { paramsLat, paramsLng } = useUrlPosition();
  const [geoCodingError, setGeoCodingError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { createCity } = useCitiesContext();
  const navigate = useNavigate();
  useEffect(() => {
    setGeoCodingError(null);
  }, []);
  useEffect(() => {
    async function getReverseGeoCode() {
      try {
        if (!paramsLat && !paramsLng) return;
        setIsLoading(true);

        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${paramsLat}&longitude=${paramsLng}`
        );
        const data = await response.json();

        console.log("data", data);

        if (!data.countryCode) {
          throw new Error("Seems like you didn't click on a valid country");
        }

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
      } catch (error) {
        setGeoCodingError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    }
    getReverseGeoCode();
  }, [paramsLat, paramsLng]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!cityName || !date) return;

    if (paramsLat && paramsLng) {
      const newCity = {
        cityName,
        country,
        emoji: "🌿",
        date: date.toString(),
        notes,
        position: {
          lat: Number(paramsLat),
          lng: Number(paramsLng),
        },
      };
      await createCity(newCity);

      navigate("/app/cities");
    }
  }

  if (isLoading) return <Spinner />;

  if (!paramsLat && !paramsLng)
    return <Message message={"Start by clicking somewhere on the map"} />;

  if (geoCodingError) {
    console.log("geoCodingError", geoCodingError);
    return <Message message={geoCodingError} />;
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDate(new Date(e.target.value))
          }
          value={date.toString()}
        /> */}
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => {
            if (date) {
              setDate(date);
            }
          }}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button
          btnClass="primary"
          handleClick={(e) => {
            console.log("e", e);
          }}
        >
          + Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
