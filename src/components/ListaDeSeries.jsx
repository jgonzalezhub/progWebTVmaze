/*
 Muestra todas las series que devuelve la búsqueda.
 Recibe:
 - series: array de series de TVMaze
 - onSeleccionarSerie: función para abrir los detalles
 - onAlternarFavorito: función para añadir o quitar de favoritos
 - favoritos: lista actual de favoritos
 */

import { useState } from "react";
import ResumenSerie from "./ResumenSerie.jsx";
import "./ListaDeSeries.css";

/**
 * Muestra todas las series que devuelve la búsqueda.
 * Cuando se hace clic en una serie, muestra su descripción justo debajo.
 */
export default function ListaDeSeries({ series, onAlternarFavorito, favoritos }) {
  const [serieAbierta, setSerieAbierta] = useState(null); // Serie cuyo resumen está visible

  if (!series || series.length === 0) {
    return <p>No hay series para mostrar. Prueba a buscar otra.</p>;
  }

  const manejarClickSerie = (serie) => {
    // Si ya está abierta, la cierra; si no, la abre
    if (serieAbierta && serieAbierta.id === serie.id) {
      setSerieAbierta(null);
    } else {
      setSerieAbierta(serie);
    }
  };

  return (
    <div className="lista-series">
      {series.map((serie) => {
        const esFavorito = favoritos.some((fav) => fav.id === serie.id);
        const abierta = serieAbierta && serieAbierta.id === serie.id;

        return (
          <div key={serie.id} className="serie-item">
            <ResumenSerie
              serie={serie}
              onSeleccionarSerie={() => manejarClickSerie(serie)}
              onAlternarFavorito={onAlternarFavorito}
              esFavorito={esFavorito}
            />

            {/* Si esta serie está abierta, mostramos su resumen */}
            {abierta && (
              <div className="detalle-inline">
                {serie.summary ? (
                  <div dangerouslySetInnerHTML={{ __html: serie.summary }} />
                ) : (
                  <p>Sin descripción disponible.</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
