/*
 Muestra todas las series guardadas como favoritas.
 */


 export default function ListaDeSeriesFav({ favoritos, onSeleccionarSerie, onAlternarFavorito }) {
  if (!favoritos || favoritos.length === 0) {
    return <p>No tienes series favoritas todavía.</p>;
  }

  return (
    <div className="lista-favoritos">
      <h2>Mis Series Favoritas</h2>

      <div className="contenedor-favoritos">
        {favoritos.map((serie) => (
          <div key={serie.id} className="favorito-item">
            
            {/* Mostrar imagen solo si existe */}
            {serie.image && serie.image.medium && (
              <img
                src={serie.image.medium}
                alt={serie.name || "Imagen de la serie"}
                onClick={() => onSeleccionarSerie(serie)}
              />
            )}

            {/* Mostrar nombre solo si existe */}
            {serie.name && <h3>{serie.name}</h3>}

            {/* Botón para quitar de favoritos */}
            <button onClick={() => onAlternarFavorito(serie)}>Quitar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
