import React, { useState, useEffect } from 'react';
import { getCategorias, eliminarCategoria } from '../../../../../API/Categorias';
import { Container, Row, Col, ListGroup, Button, Spinner, Alert } from 'react-bootstrap';
import './ListadoCategoria.css';

export default function ListadoCategoria() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      const data = await getCategorias();
      if (data) {
        setCategorias(data);
      } else {
        setError('Error al cargar las categorías');
      }
      setLoading(false);
    };

    fetchCategorias();
  }, []);

  const handleEliminar = async (id) => {
    setCategoriaSeleccionada(id);
    setShowAlert(true);
  };

  const confirmarEliminar = async () => {
    try {
      const exito = await eliminarCategoria(categoriaSeleccionada);
      if (exito) {
        setCategorias(categorias.filter(categoria => categoria.CategoriaId !== categoriaSeleccionada));
        setAlertMessage('Categoría eliminada correctamente');
      } else {
        setAlertMessage('Error al eliminar la categoría');
      }
    } catch (error) {
      setAlertMessage('Ocurrió un error inesperado');
    } finally {
      setShowAlert(false);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  if (loading) {
    return (
      <Container className="listado-categorias-container text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando categorías...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="listado-categorias-container my-5">
        <Alert variant="danger" className="listado-categorias-alert">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Container className="listado-categorias-container my-5">
        <div className="listado-categorias-header">
          <h1>Listado Categoria</h1>
        </div>
        <Row className="justify-content-md-center">
          <Col md={8}>
            {categorias.length > 0 ? (
              <ListGroup className="listado-categorias-lista">
                {categorias.map((categoria) => (
                  <ListGroup.Item
                    key={categoria.CategoriaId}
                    className="listado-categorias-item d-flex justify-content-between align-items-center"
                  >
                    <span className="listado-categorias-nombre">{categoria.NombreCategoria}</span>
                    <Button
                      variant="danger"
                      className="listado-categorias-eliminar-boton"
                      onClick={() => handleEliminar(categoria.CategoriaId)}
                    >
                      Eliminar
                    </Button>
                  </ListGroup.Item>


                ))}

                {showAlert && (
                  <div className="alert-overlay">
                    <Alert message={alertMessage} onClose={handleCloseAlert} />
                    <div className="confirmation-container">
                      <p>¿Estás seguro que deseas eliminar esta categoría?</p>
                      <Button variant="danger" onClick={confirmarEliminar}>Si</Button>
                      <Button variant="secondary" onClick={handleCloseAlert}>No</Button>
                    </div>
                  </div>
                )}
              </ListGroup>
            ) : (
              <Alert variant="info" className="listado-categorias-alert text-center">
                No hay categorías disponibles.
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
