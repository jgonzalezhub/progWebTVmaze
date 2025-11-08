import { useState, useEffect } from "react";

/**
 Hook personalizado para guardar y recuperar datos desde localStorage.
  
  - Guarda automáticamente los cambios en el almacenamiento local del navegador.
  - Permite mantener la información (por ejemplo, series favoritas)
    incluso si el usuario recarga o cierra la página.
 
  @param {string} clave Nombre de la clave bajo la cual se guardarán los datos en localStorage.
  @param {*} valorInicial Valor inicial si no hay datos guardados todavía.
  @returns {[any, function]} Devuelve un array con el valor guardado y una función para actualizarlo.
 */
export function useLocalStorage(clave, valorInicial) {
  // Estado que contendrá el valor (por ejemplo, lista de favoritos)
  const [valor, setValor] = useState(() => {
    try {
      // Intentamos leer el valor desde localStorage
      const valorGuardado = localStorage.getItem(clave);

      // Si existe algo guardado, lo convertimos desde texto (JSON)
      return valorGuardado ? JSON.parse(valorGuardado) : valorInicial;
    } catch (error) {
      console.error("Error leyendo desde localStorage:", error);
      return valorInicial;
    }
  });

  // Cada vez que cambie el valor, lo guardamos en localStorage automáticamente
  useEffect(() => {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
    } catch (error) {
      console.error("Error guardando en localStorage:", error);
    }
  }, [clave, valor]);

  // Devolvemos el valor actual y la función para actualizarlo (igual que useState)
  return [valor, setValor];
}