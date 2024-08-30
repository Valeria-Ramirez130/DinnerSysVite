import { Link } from 'react-router-dom';
import './Error404.css';
export function Error404() {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h3>Oops! Pagina No Encontrada </h3>
          <h1 className='number-404-error'><span>4</span><span>0</span><span>4</span></h1>
        </div>
        <h2>Lo sentimos, la página que buscas no se encuentra disponible</h2>
        <Link to="/" className="btn-return">Volver al Inicio</Link>
      </div>
    </div>
  );
}

export default Error404;