//Será el encargado de permitir al usuario escribir una serie y ejecutar la búsqueda.

import { useState } from "react";
import "./BarraDeBusqueda.css";


export default function BarraDeBusqueda({ onSearch }) {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
    const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(terminoBusqueda);
  }
    return (
    <form onSubmit={handleSubmit}>
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
