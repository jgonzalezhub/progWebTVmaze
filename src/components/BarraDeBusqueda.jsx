/*
Es el componente donde el usuario puede escribir el nombre de una serie y realizar la búsqueda.
Contiene un campo de texto y un botón, y al enviarse, comunica el término de búsqueda al componente principal (App.jsx)
*/


import { useState } from "react";
import "./BarraDeBusqueda.css";

export default function BarraDeBusqueda({ onSearch }) {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(terminoBusqueda);
  };

  return (
    <form onSubmit={handleSubmit} className="barra-busqueda">
      <input
        type="text"
        placeholder="Escribe el nombre de una serie"
        value={terminoBusqueda}
        onChange={(e) => setTerminoBusqueda(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
}
