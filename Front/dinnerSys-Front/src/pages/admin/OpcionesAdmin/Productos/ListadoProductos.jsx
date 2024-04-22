import React, { useEffect, useState } from 'react';
import { Table, InputGroup, FormControl, Button, Container } from 'react-bootstrap';
import { getProducts, deleteProduct } from '../../../../API/Productos';
import './ListadoProductos.css';
import Alert from '../../../../components/Alert/Alert'; // Importa el componente de Alert

export function ListadoProductos() {
  const [registros, setRegistros] = useState([]);
  const [filtros, setFiltros] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    categoria: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const realProducts = await getProducts();
      if (realProducts) {
        setRegistros(realProducts);
      }
    };
    fetchData();
  }, []);

  const handleClickEliminar = async (id) => {
    setRegistroSeleccionado(id); // Guardar el ID del producto seleccionado
    setShowAlert(true); // Mostrar la alerta
  };

  const confirmarEliminar = () => {
    deleteProduct(registroSeleccionado)
      .then(res => {
        if (res) {
          setRegistros(registros.filter(registro => registro.ProductoId !== registroSeleccionado));
        } else {
          setAlertMessage("Error al eliminar el producto");
        }
      })
      .catch(error => {
        console.error("Error al llamar a deleteProduct:", error);
        setAlertMessage("Error al eliminar el producto");
      });
    setShowAlert(false); // Ocultar la alerta después de eliminar
  };
  
  const handleCloseAlert = () => setShowAlert(false);

  const registrosFiltrados = registros.filter(registro =>
    !registro.Inactivo &&
    registro.ProductoId.toString().includes(filtros.id) &&
    registro.Nombre.toLowerCase().includes(filtros.nombre.toLowerCase()) &&
    registro.Descripcion.toLowerCase().includes(filtros.descripcion.toLowerCase()) &&
    registro.Categoria.toLowerCase().includes(filtros.categoria.toLowerCase())
  );

  return (
    <div className="listado-productos-container">
      <div className="listado-productos-header">
        <h1>Listado de Productos</h1>
      </div>
      <Container>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Filtrar por ID..."
            value={filtros.id}
            onChange={(e) => setFiltros({ ...filtros, id: e.target.value })}
          />
          <FormControl
            placeholder="Filtrar por nombre..."
            value={filtros.nombre}
            onChange={(e) => setFiltros({ ...filtros, nombre: e.target.value })}
          />
          <FormControl
            placeholder="Filtrar por descripción..."
            value={filtros.descripcion}
            onChange={(e) => setFiltros({ ...filtros, descripcion: e.target.value })}
          />
          <FormControl
            placeholder="Filtrar por categoría..."
            value={filtros.categoria}
            onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value })}
          />
        </InputGroup>

        <div className="listado-productos-scroll-container">
          <Table striped bordered hover className="listado-productos-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {registrosFiltrados.map(producto => (
                <tr key={producto.ProductoId}>
                  <td>{producto.ProductoId}</td>
                  <td>{producto.Nombre}</td>
                  <td>{producto.Descripcion}</td>
                  <td>{producto.Categoria}</td>
                  <td>{producto.Precio}</td>
                  <td>
                    <Button
                      className="listado-productos-button listado-productos-button-update"
                      onClick={() => console.log("Actualizar producto:", producto)}
                    >
                      Actualizar
                    </Button>
                    <Button
                      className="listado-productos-button listado-productos-button-delete"
                      onClick={() => handleClickEliminar(producto.ProductoId)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    {/* Renderizar la alerta si showAlert es true */}
    {showAlert && (
        <div className="alert-overlay">
          <Alert message={alertMessage} onClose={handleCloseAlert} />
          <div className="confirmation-container">
            <p>¿Está seguro que desea eliminar el producto?</p>
            <Button variant="danger" onClick={confirmarEliminar}>Si</Button>
            <Button variant="secondary" onClick={handleCloseAlert}>No</Button>
          </div>
        </div>
      )}
    </div>
  );
}
