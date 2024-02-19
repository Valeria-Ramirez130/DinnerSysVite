import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {HomeMesero} from '../pages/mesero/HomeMesero';
import {Login} from '../pages/login/Login';
import {HomeAdmin} from '../pages/admin/HomeAdmin';

const Navigation = () => {
  return (
    <Router>
        <Routes>
            {/* Ruta raiz componente Login*/}
            <Route path="/" element={<Login/>} />

            {/* Rutas del administrador*/}
            <Route path="/admin" element={<HomeAdmin/>} />

            {/* Rutas del mesero*/}
            <Route path="/mesero" element={<HomeMesero/>} />
            
            
        </Routes>
    </Router>
  );
};

export default Navigation;