import './App.css';
import { BrowserRouter,
  Routes,
  Route
  } from 'react-router-dom';

import PrivateRoute from './routes/PrivateRoutes';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Auth/Login/Login';
import SignUp from './pages/Auth/SignUp/SignUp';
import Logout from './pages/Auth/Logout/Logout';


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />
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
