import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { nuevaCategoria } from "../../../../../API/Categorias"; // Asegúrate de que la ruta sea correcta
import "./Categoria.css";

export default function Categoria() {
  // Estado para manejar el valor del input y mensajes de error/success
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Manejar cambios en el input
  const handleChange = (e) => {
    setNombreCategoria(e.target.value);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nombreCategoria.trim()) {
      const categoria = { Categoria: nombreCategoria.trim() };
      try {
        const result = await nuevaCategoria(categoria);
        if (result) {
          setSuccess("Categoría creada correctamente.");
          setError("");
          setNombreCategoria("");
          window.location.reload(); // Recargar la página
        } else {
          setSuccess("");
          setError("Error al crear la categoría.");
        }
      } catch (error) {
        console.error("Error al crear la categoría:", error);
        setSuccess("");
        setError("Error al crear la categoría.");
      }
    } else {
      setError("El nombre de la categoría no puede estar vacío.");
    }
  };

  return (
    <div className="contenedor-principal">
      <div className="formulario-header">
        <h1 className="header-text">Crear Categoría</h1>
      </div>
      <Form className="formulario-productos" onSubmit={handleSubmit}>
        <Form.Group controlId="formNombre">
          <Form.Label>Nombre de Categoría</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite categoría"
            name="categoria"
            value={nombreCategoria}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="button-submit">
          Crear Categoría
        </Button>
      </Form>
    </div>
  );
}
