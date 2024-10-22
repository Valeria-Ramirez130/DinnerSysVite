import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './CrearMesa.css';
import { createTable } from '../../../../API/Mesas'; // Importa la función createTable del archivo mesas.js
import { alertaGeneral } from '../../../../utils/alertasGlobales'; // Importa las alertas
import ListadoMesas from './ListadoMesas';

export function CrearMesa() {
  const [cantidad, setCantidad] = useState(1);
  const [refresh, setRefresh] = useState(false);

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
      alertaGeneral("Error al crear mesas", true); // Alerta de error con SweetAlert2
    } else {
      setRefresh(!refresh);
      alertaGeneral("Mesas creadas correctamente"); // Alerta de éxito con SweetAlert2
    }
  };

  return (
    <>
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
      <ListadoMesas refresh={refresh} />
    </>
  );
}

export default CrearMesa;
