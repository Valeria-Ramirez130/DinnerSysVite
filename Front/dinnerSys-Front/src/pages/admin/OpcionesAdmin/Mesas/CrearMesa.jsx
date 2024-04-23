import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './CrearMesa.css';

export function CrearMesa() {
  const [cantidad, setCantidad] = useState(1);

  const incrementarCantidad = () => {
    setCantidad(cantidad + 1);
  };

  const decrementarCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Creando ${cantidad} mesas...`);
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
        </Form>
      </div>
    </div>
  );
}

export default CrearMesa;
