import React, { useEffect, useState } from 'react';
import { Table, InputGroup, FormControl, Button, Container, Form } from 'react-bootstrap';
import { getProducts, deleteProduct, updateProduct } from '../../../../API/Productos';
import './ListadoProductos.css';
import Alert from '../../../../components/Alert/Alert';

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
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    categoria: '',
    precio: ''
  });
  const [showUpdateForm, setShowUpdateForm] = useState(false);

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
    setRegistroSeleccionado(id);
    setShowAlert(true);
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
    setShowAlert(false);
  };

  const handleCloseAlert = () => setShowAlert(false);

  const handleShowUpdateForm = (producto) => {
    setFormData({
      id: producto.ProductoId,
      nombre: producto.Nombre,
      descripcion: producto.Descripcion,
      categoria: producto.Categoria,
      precio: producto.Precio
    });
    setShowUpdateForm(true);
  };

  const handleSubmitUpdate = () => {
    const { id, nombre, descripcion, categoria, precio } = formData;
    const updatedProductData = {
      Nombre: nombre,
      Descripcion: descripcion,
      Categoria: categoria,
      Precio: precio
    };

    updateProduct(id, updatedProductData)
      .then(res => {
        if (res) {
          getProducts().then(updatedProducts => {
            setRegistros(updatedProducts);
            setShowUpdateForm(false);
          });
        } else {
          setAlertMessage("Error al actualizar el producto");
        }
      })
      .catch(error => {
        console.error("Error al llamar a updateProduct:", error);
        setAlertMessage("Error al actualizar el producto");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
                      onClick={() => handleShowUpdateForm(producto)}
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
      {showUpdateForm && (
        <div className="update-form-overlay">
          <Form className="update-form" onSubmit={handleSubmitUpdate}>
            <Form.Group controlId="formId">
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" name="id" value={formData.id} onChange={handleInputChange} disabled />
            </Form.Group>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control type="text" name="descripcion" value={formData.descripcion} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formCategoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Control type="text" name="categoria" value={formData.categoria} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formPrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="text" name="precio" value={formData.precio} onChange={handleInputChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Actualizar
            </Button>
            {/* Botón de cerrar */}
            <Button variant="danger" onClick={() => setShowUpdateForm(false)}>
              Cerrar
            </Button>
<<<<<<< HEAD



=======
>>>>>>> 29a65fa4b71c4902e6a0f994715f13ccfd88b0e9
          </Form>
        </div>
      )}
    </div>
  );
}