import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import Pokedex from "./Pages/Pokedex";
import PokemonId from "./Pages/PokemonId";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const darkMode = useSelector((store) => store.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <main className='min-h-screen font-["Inter"]'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/pokedex" element={<Pokedex />}></Route>
          <Route path="/pokedex/:pokemonName" element={<PokemonId />}></Route>
          <Route path="/*" element={<Pokedex />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
