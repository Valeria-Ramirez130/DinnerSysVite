import React, { useState, useEffect } from 'react';
import { getCategorias, eliminarCategoria } from '../../../../../API/Categorias';
import { Container, Row, Col, ListGroup, Button, Spinner, Alert } from 'react-bootstrap';
import './ListadoCategoria.css';
import { alertaToast } from '../../../../../utils/alertasGlobales';

export default function ListadoCategoria({ isCategoriaCreated }) {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  useEffect(() => {
    getCategorias()
      .then(res => {
        if (res) {
          console.log(res);
          setLoading(false);
          setCategorias(res);
        } else {
          setError('Error al obtener las categorías');
        }
      })
      .catch(error => {
        setError('Error al obtener las categorías');
      });
  }, [isCategoriaCreated]);

  const handleEliminar = async (id) => {
    setCategoriaSeleccionada(id);
    setShowAlert(true);
  };

  const confirmarEliminar = () => {
    eliminarCategoria(categoriaSeleccionada).then((res) => {
      if (res) {
        setCategorias(categorias.filter(categoria => categoria.CategoriaId !== categoriaSeleccionada));
        alertaToast({ titulo: 'Categoría eliminada correctamente' });
        setAlertMessage('Categoría eliminada correctamente');
      } else {
        alertaToast({ titulo: 'Error al eliminar la categoría', icon: 'error' });
        setAlertMessage('Error al eliminar la categoría');
      }
    }).catch((error) => {
      alertaToast({ titulo: 'Error al eliminar la categoría', icon: 'error' });
      setAlertMessage('Ocurrió un error inesperado');
    }).finally(() => {
      setShowAlert(false);
    });
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
    <Container className="listado-categorias-container">
      <div className="listado-categorias-header">
        <h1>Listado Categoria</h1>
      </div>
      <Row className="categoria-justify-content-md-center">
        <Col md={12}>
          {categorias.length > 0 ? (
            <ListGroup className="categoria-lista">
              {categorias.map((categoria) => (
                <ListGroup.Item
                  key={categoria.CategoriaId}
                  className="categoria-item d-flex justify-content-between align-items-center"
                >
                  <span className="categoria-nombre">{categoria.NombreCategoria}</span>
                  <Button
                    variant="danger"
                    className="categoria-eliminar-boton"
                    onClick={() => handleEliminar(categoria.CategoriaId)}
                  >
                    Eliminar
                  </Button>
                </ListGroup.Item>
              ))}
              {showAlert && (
                <div className="categoria-alert-overlay">
                  <Alert variant="info" className="categoria-alert-message">
                    {alertMessage}
                  </Alert>
                  <div className="categoria-confirmation-container">
                    <p>¿Estás seguro que deseas eliminar esta categoría?</p>
                    <Button variant="danger" onClick={confirmarEliminar}>Sí</Button>
                    <Button variant="secondary" onClick={handleCloseAlert}>No</Button>
                  </div>
                </div>
              )}
            </ListGroup>
          ) : (
            <Alert variant="info" className="categoria-alert text-center">
              No hay categorías disponibles.
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}
