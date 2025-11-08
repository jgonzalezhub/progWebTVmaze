/*
    Muestra una tarjeta con el resumen de una serie.
    Al hacer clic en la imagen muestra los detalles.
 */

export default function ResumenSerie({ serie, onSeleccionarSerie, onAlternarFavorito, esFavorito }) {
  if (!serie) return null; // Si no hay datos de la serie, no se muestra nada

  return (
    <div className="resumen-serie">
      
      {/* Mostrar la imagen solo si existe */}
      {serie.image && serie.image.medium && (
        <img
          src={serie.image.medium}
          alt={serie.name || "Imagen de la serie"}
          onClick={() => onSeleccionarSerie(serie)}
        />
      )}

      {/* Mostrar el nombre solo si existe */}
      {serie.name && <h3>{serie.name}</h3>}

      {/* Botón de favorito */}
      <button onClick={() => onAlternarFavorito(serie)}>
        {esFavorito ? "★ Quitar de favoritos" : "☆ Añadir a favoritos"}
      </button>
    </div>
  );
}