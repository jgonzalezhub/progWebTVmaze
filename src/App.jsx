import { useState } from "react";
import "./App.css";
import "./index.css";

// Importamos los componentes
import BarraDeBusqueda from "./components/BarraDeBusqueda.jsx";
import ListaDeSeries from "./components/ListaDeSeries.jsx";
import ListaDeSeriesFav from "./components/ListaDeSeriesFav.jsx";
import DetallesDeSerie from "./components/DetallesDeSerie.jsx";

// Hook personalizado para guardar favoritos en localStorage
import { useLocalStorage } from "./hooks/useLocalStorage.jsx";

function App() {
  // ESTADOS GLOBALES
  const [series, setSeries] = useState([]); // Resultados de búsqueda
  const [cargando, setCargando] = useState(false); // Indicador de carga
  const [error, setError] = useState(null); // Mensajes de error
  const [serieSeleccionada, setSerieSeleccionada] = useState(null); // Serie seleccionada
  const [favoritos, setFavoritos] = useLocalStorage("favoritos", []); // Lista de favoritos persistente

  // FUNCIÓN PRINCIPAL PARA BUSCAR SERIES EN LA API
  async function buscarSeries(nombreSerie) {
    if (!nombreSerie) return; // si no hay texto, no hace nada

    setCargando(true);
    setError(null);

    try {
      // Hacemos la petición a la API de TVMaze
      const respuesta = await fetch(
        `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(nombreSerie)}`
      );

      if (!respuesta.ok) throw new Error("Error al buscar las series.");

      // Convertimos la respuesta a JSON
      const datos = await respuesta.json();

      // Extraemos solo la parte que nos interesa (el objeto show)
      const listaDeSeries = datos.map((item) => item.show);

      // Guardamos las series en el estado
      setSeries(listaDeSeries);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  // FUNCIONES DE FAVORITOS
  function alternarFavorito(serie) {
    const existe = favoritos.some((fav) => fav.id === serie.id);
    if (existe) {
      // Si ya está, la quitamos
      setFavoritos(favoritos.filter((fav) => fav.id !== serie.id));
    } else {
      // Si no está, la agregamos
      setFavoritos([...favoritos, serie]);
    }
  }

  // MOSTRAR Y CERRAR DETALLES
  function mostrarDetalles(serie) {
    setSerieSeleccionada(serie);
  }

  function cerrarDetalles() {
    setSerieSeleccionada(null);
  }

  //RENDERIZADO DE LA INTERFAZ
  return (
    <div className="app">
      {/* HEADER PRINCIPAL */}
      <header className="app-header">
        <h1 className="app-title">Buscador de Series (TVMaze)</h1>
        <BarraDeBusqueda onSearch={buscarSeries} />
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="app-main">
        {/* Estado de carga o error */}
        {cargando && (
          <div className="loading-state">
            <p>🎭 Buscando series...</p>
          </div>
        )}
        
        {error && (
          <div className="error-state">
            <p>{error}</p>
          </div>
        )}

        {/* Resultados de Búsqueda */}
        <section className="content-section">
          <h2 className="section-title">Resultados de Búsqueda</h2>
          <ListaDeSeries
            series={series}
            onAlternarFavorito={alternarFavorito}
            favoritos={favoritos}
            onSeleccionarSerie={mostrarDetalles}
          />
        </section>

        {/* Series Favoritas */}
        <section className="content-section">
          <h2 className="section-title">Mis Series Favoritas</h2>
          <ListaDeSeriesFav
            favoritos={favoritos}
            onSeleccionarSerie={mostrarDetalles}
            onAlternarFavorito={alternarFavorito}
          />
        </section>
      </main>

      {/* Modal con detalles */}
      {serieSeleccionada && (
        <DetallesDeSerie
          serie={serieSeleccionada}
          onCerrar={cerrarDetalles}
          onAlternarFavorito={alternarFavorito}
          esFavorita={favoritos.some((fav) => fav.id === serieSeleccionada.id)}
        />
      )}
    </div>
  );
}

export default App;