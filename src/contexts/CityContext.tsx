import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import CityInterface from "../utils/cityInterface";
import { useParams } from "react-router-dom";

interface CityProviderInterface {
  children: ReactNode;
}
interface CityProviderValueInterface {
  currentCity: CityInterface;
  isLoading: boolean;
}

interface InitialStateInterface {
  city: CityInterface | object;
  isLoading: boolean;
  error: unknown | null;
}

const CityContext = createContext<CityProviderValueInterface | null>(null);

export function CityProvider({ children }: CityProviderInterface) {
  const initialState: InitialStateInterface = {
    city: {},
    isLoading: false,
    error: null,
  };

  const reducer = function (
    state: InitialStateInterface,
    action:
      | { type: "city/loaded"; value: CityInterface }
      | { type: "loading" }
      | { type: "error"; value: unknown }
  ) {
    switch (action.type) {
      case "loading":
        return { ...state, isLoading: true };
      case "city/loaded":
        return { ...state, city: action.value, isLoading: false };
      case "error":
        return { ...state, error: action.value };
      default:
        throw new Error("Invalid action type");
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { cityId } = useParams();

  useEffect(() => {
    async function fetchCityInfo(id: string) {
      try {
        if (!id) return;
        if (id === (state.city as CityInterface).id) return;
        dispatch({ type: "loading" });
        const response = await fetch(`http://localhost:8080/cities/${id}`);
        const city = await response.json();
        dispatch({ type: "city/loaded", value: city });
      } catch (error) {
        dispatch({ type: "error", value: error });
        throw new Error("Error occured while fetching city data");
      }
    }
    fetchCityInfo(cityId?.toString() as string);
  }, [cityId]);

  return (
    <CityContext.Provider
      value={{
        currentCity: state.city as CityInterface,
        isLoading: state.isLoading,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}
// move the function to a new file to remove the warning
export function useCityContext() {
  const context = useContext(CityContext);
  if (!context)
    throw new Error("useCityContext was placed outside CityContextProvider");
  return context;
}
