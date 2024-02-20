import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {routesglobal} from '../src/routes/routesglobal.jsx'
import {routesadmin} from './routes/routesadmin.jsx'
import {routesmesero} from '../src/routes/routesmesero.jsx'
import { AuthProvider } from './auth/AuthProvider.jsx';
let routes = [].concat (routesglobal,routesadmin,routesmesero);
routes = createBrowserRouter (routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  </React.StrictMode>,
)
