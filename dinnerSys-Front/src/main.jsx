import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { routesglobal } from '../src/routes/routesglobal.jsx'
import { routesadmin } from './routes/routesadmin.jsx'
import { routesmesero } from '../src/routes/routesmesero.jsx'
import { AuthProvider } from './auth/AuthProvider.jsx';
import { routescocina } from './routes/routescocina.jsx';
import './index.css';


let routes = [].concat(routesglobal, routesadmin, routesmesero,routescocina);
routes = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={routes} />
  </AuthProvider>
)
