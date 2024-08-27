// Categorias.js
import { BACK_URL } from "../utils/Constants.js";
import axios from "axios";

// getCategorias --> Función para obtener todas las categorías
export const getCategorias = async () => {
  try {
    const response = await axios.get(`${BACK_URL}/categorias/getCategorias`);
    return response.status === 200 ? response.data : null;
  } catch (error) {
    console.error(
      "Error al obtener las categorías:",
      error.response?.data || error.message
    );
    return null;
  }
};

// nuevaCategoria --> Función para crear una nueva categoría
export const nuevaCategoria = async (objCategoria) => {
  try {
    const response = await axios.post(
      `${BACK_URL}/categorias/createCategoria`,
      objCategoria
    );
    return response.status === 201; // Devuelve true si la respuesta es 201 Created
  } catch (error) {
    console.error(
      "Error al crear la categoría:",
      error.response?.data || error.message
    );
    return false; // Devuelve false en caso de error
  }
};
// modificarCategoria --> Función para modificar una categoría existente
export const modificarCategoria = async (categoriaId, objCategoria) => {
  try {
    const response = await axios.put(
      `${BACK_URL}/categorias/updateCategoria/${categoriaId}`,
      objCategoria
    );
    return response.status === 201 ? true : false;
  } catch (error) {
    console.error(
      "Error al modificar la categoría:",
      error.response?.data || error.message
    );
    return false; // Asegúrate de manejar el error de manera adecuada
  }
};

// eliminarCategoria --> Función para eliminar una categoría existente
export const eliminarCategoria = async (categoriaId) => {
  try {
    const response = await axios.delete(
      `${BACK_URL}/categorias/deleteCategoria/${categoriaId}`
    );
    return response.status === 200 ? true : false;
  } catch (error) {
    console.error(
      "Error al eliminar la categoría:",
      error.response?.data || error.message
    );
    return false; // Asegúrate de manejar el error de manera adecuada
  }
};
