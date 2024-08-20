import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './CrearMesa.css';
import { createTable } from '../../../../API/Mesas'; // Importa la función createTable del archivo mesas.js

export function CrearMesa() {
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState('');
  const [mensajeColor, setMensajeColor] = useState('');

  const incrementarCantidad = () => {
    setCantidad(cantidad + 1);
  };

  const decrementarCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isAnyError = false;
    for (let i = 0; i < cantidad; i++) {
      const isCreated = await createTable(); // Llama a la función createTable
      if (!isCreated) {
        isAnyError = true;
        break;
      }
    }
    if (isAnyError) {
      setMensaje('Error al crear mesas');
      setMensajeColor('#DC3545'); // Color rojo
    } else {
      setMensaje('Mesas creadas correctamente');
      setMensajeColor('#21b55f'); // Color verde
      // Recarga la página después de 1 segundo
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div className="crear-mesas">
      <div className="crear-mesas__header">
        <h2 className="crear-mesas__title">Crear Mesas</h2>
      </div>
      <div className="crear-mesas__content">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="cantidadMesas">
            <Form.Label>Cantidad de Mesas:</Form.Label>
            <Form.Control
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(parseInt(e.target.value))}
            />
          </Form.Group>
          <div className="crear-mesas__buttons">
            <Button variant="secondary" type="button" onClick={decrementarCantidad}>
              -
            </Button>
            <Button variant="secondary" type="button" onClick={incrementarCantidad}>
              +
            </Button>
          </div>
          <Button variant="primary" type="submit" className="crear-mesas__submit">
            Crear Mesas
          </Button>
          {mensaje && (
            <div style={{ color: mensajeColor, marginTop: '10px' }}>
              {mensaje}
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}

export default CrearMesa;
