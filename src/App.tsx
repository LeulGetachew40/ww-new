import "./App.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import City from "./components/app-components/City";
import CityList from "./components/app-components/CityList";
import CountriesList from "./components/app-components/CountriesList";
import Form from "./components/app-components/Form";

import AppLayout from "./pages/AppLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";

import { CitiesProvider } from "./contexts/CitiesContext";
import { CityProvider } from "./contexts/CityContext";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <AuthProvider>
                <Homepage />
              </AuthProvider>
            }
          />
          <Route path="/product" element={<Product />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route
            path="/login"
            element={
              <AuthProvider>
                <Login />
              </AuthProvider>
            }
          />
          <Route
            path="/app"
            element={
              <AuthProvider>
                <CitiesProvider>
                  <CityProvider>
                    <AppLayout />
                  </CityProvider>
                </CitiesProvider>
              </AuthProvider>
            }
          >
            {/* redirect */}
            <Route index element={<Navigate to={"cities"} replace />} />
            <Route
              path="cities"
              element={
                <CitiesProvider>
                  <CityProvider>
                    <CityList />
                  </CityProvider>
                </CitiesProvider>
              }
            />
            <Route
              path="cities/:cityId"
              element={
                <CitiesProvider>
                  <CityProvider>
                    <City />
                  </CityProvider>
                </CitiesProvider>
              }
            />
            <Route
              path="countries"
              element={
                <CitiesProvider>
                  <CountriesList />
                </CitiesProvider>
              }
            />
            <Route path={"form"} element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
