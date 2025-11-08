/*
Muestra la información completa de una serie específica seleccionada por el usuario desde la lista.
Incluye descripción, género, fecha, calificación, etc.

 */
import "./DetallesDeSerie.css";


export default function DetallesDeSerie({ serie, onCerrar, onAlternarFavorito, esFavorita }) {
  if (!serie) return null;

  return (
    <div className="modal-detalles">
      <div className="modal-contenido">
        <button className="cerrar" onClick={onCerrar}>✖</button>

        {serie.name && <h2>{serie.name}</h2>}

        {serie.image && serie.image.medium && (
          <img
            src={serie.image.medium}
            alt={serie.name || "Imagen de la serie"}
          />
        )}

        {serie.summary && (
          <div
            className="descripcion"
            dangerouslySetInnerHTML={{ __html: serie.summary }}
          />
        )}

        {serie.genres && serie.genres.length > 0 && (
          <p><strong>Géneros:</strong> {serie.genres.join(", ")}</p>
        )}

        {serie.language && (
          <p><strong>Idioma:</strong> {serie.language}</p>
        )}

        {serie.rating && serie.rating.average && (
          <p><strong>Rating:</strong> {serie.rating.average}</p>
        )}

        {/* Botón de favorito dentro del modal */}
        <button onClick={() => onAlternarFavorito(serie)}>
          {esFavorita ? "Quitar de favoritos" : "Añadir a favoritos"}
        </button>
      </div>
    </div>
  );
}
