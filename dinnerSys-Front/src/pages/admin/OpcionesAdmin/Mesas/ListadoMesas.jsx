import React, { useState, useEffect } from 'react';
import { getTables } from '../../../../API/Mesas';
import './ListadoMesas.css'; // Importamos estilos si los hubiera

export function ListadoMesas({refresh}) {
  const [mesas, setMesas] = useState([]);

  useEffect(() => {
    async function fetchMesas() {
      const mesasData = await getTables();
      if (mesasData) {
        setMesas(mesasData);
      }
    }
    fetchMesas();
  }, [refresh]);

  return (
    <div className="listado-mesas">
      <h2>Listado de Mesas</h2>
      <ul>
        {mesas.map((mesa, index) => (
          <li key={index}>{mesa.mesaId}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListadoMesas;
