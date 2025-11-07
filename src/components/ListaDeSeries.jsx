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

export default function ListaDeSeries({ series, onAlternarFavorito, favoritos }) {
  const [serieAbierta, setSerieAbierta] = useState(null); // Serie cuyo resumen está visible

  if (!series || series.length === 0) // No hay series para mostrar
  {
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

  // Renderizar la lista de series
  return (
    <div className="lista-series">
      {series.map((serie) => {
        const esFavorito = favoritos.some((fav) => fav.id === serie.id);// Comprobar si la serie está en favoritos
        const abierta = serieAbierta && serieAbierta.id === serie.id;// Comprobar si esta serie está abierta

        return (
          <div key={serie.id} className="serie-item">
            <ResumenSerie
              serie={serie}// Datos básicos de la serie
              onSeleccionarSerie={() => manejarClickSerie(serie)}// Función para abrir/cerrar el resumen
              onAlternarFavorito={onAlternarFavorito}// Función para añadir/quitar de favoritos
              esFavorito={esFavorito}// Indica si es favorita
            />

            {/* Si esta serie está abierta, mostramos su resumen */}
            {abierta && (
              <div className="detalle-inline">
                {serie.summary ? (// Mostrar el resumen con HTML
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
