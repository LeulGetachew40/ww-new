import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import CityInterface from "../utils/cityInterface";
import CountryInterface from "../utils/countryInterface";

interface CitiesContextInterface {
  children: ReactNode;
}

interface CitiesProviderValueInterface {
  cities: CityInterface[];
  isLoading: boolean;
  // setCities: (cities: CityInterface[]) => void;
  // setIsLoading: (isLaoding: boolean) => void;
  countries: CountryInterface[];
  // setCountries: (countries: CountryInterface[]) => void;
  // setError: (error: unknown) => void;
  // error: unknown;
  createCity: (newCity: CityInterface) => void;
  deleteCity: (id: string) => void;
  dispatch: React.ActionDispatch<[action: ActionType]>;
}

// type AccumulatedCountry = Omit<CountryInterface, "id"> & { id?: number };
interface InitialStateInterface {
  cities: CityInterface[];
  countries: CountryInterface[];
  isLoading: boolean;
  error: unknown | null;
}

type ActionType =
  | { type: "loading" }
  | { type: "cities/loaded"; value: CityInterface[] }
  | { type: "countries/loaded" }
  | { type: "error"; value: unknown }
  | { type: "city/create"; value: CityInterface }
  | { type: "city/delete"; value: string };

// 1 - Create Context
const CitiesContext = createContext<CitiesProviderValueInterface | null>(null);

// 2 - Create Provider
export function CitiesProvider({ children }: CitiesContextInterface) {
  const initialState: InitialStateInterface = {
    cities: [],
    countries: [],
    error: null,
    isLoading: false,
  };
  const reducer = function (state: InitialStateInterface, action: ActionType) {
    switch (action.type) {
      case "loading":
        return { ...state, isLoading: true };
      case "cities/loaded":
        return { ...state, cities: action.value, isLoading: false };
      case "countries/loaded":
        return {
          ...state,
          countries: state.cities.reduce(
            (acc: CountryInterface[], curr: CityInterface) => {
              if (
                !acc
                  .map((country) => country.country)
                  .find((country) => curr.country === country)
              ) {
                return [
                  ...acc,
                  { id: curr.id, emoji: curr.emoji, country: curr.country },
                ];
              } else {
                return acc;
              }
            },
            []
          ),

          isLoading: false,
        };
      case "city/create":
        return {
          ...state,
          cities: [...state.cities, action.value],
          isLoading: false,
        };
      case "city/delete":
        return {
          ...state,
          cities: state.cities.filter(
            (city) => city.id?.toString() !== action.value
          ),
          isLoading: false,
        };
      case "error":
        return { ...state, error: action.value };
      default:
        throw new Error("Invalid action type");
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const response = await fetch("http://localhost:8080/cities");
        const cities = await response.json();
        dispatch({ type: "cities/loaded", value: cities });
        dispatch({ type: "countries/loaded" });
      } catch (error) {
        dispatch({
          type: "error",
          value: error,
        });
      }
    }
    fetchCities();
  }, []);

  async function createCity(newCity: CityInterface) {
    try {
      dispatch({ type: "loading" });
      const response = await fetch("http://localhost:8080/cities", {
        body: JSON.stringify(newCity),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const cities = await response.json();
      dispatch({ type: "city/create", value: cities });
    } catch (error) {
      dispatch({ type: "error", value: error });
    }
  }
  async function deleteCity(id: string) {
    try {
      dispatch({ type: "loading" });
      await fetch(`http://localhost:8080/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/delete", value: id });
      // setCities((cities) => {
      //   return cities.filter((city) => {
      //     return city.id?.toString() !== id;
      //   });
      // });
    } catch (error) {
      // throw new Error((error as Error).message);
      dispatch({ type: "error", value: error });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        createCity,
        deleteCity,
        dispatch,
        cities: state.cities,
        isLoading: state.isLoading,
        countries: state.countries,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

// 3 - Use context and return context

// move the function to a new file to remove the warning

export function useCitiesContext() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error("useCitiesContext is placed outside CitiesProvider");

  return context;
}
