import './App.css';
import { BrowserRouter,
  Routes,
  Route
  } from 'react-router-dom';
import Login from './pages/Login/Login'
import PrivateRoute from './routes/PrivateRoutes';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Login />} />

          {/* Rutas privadas */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
