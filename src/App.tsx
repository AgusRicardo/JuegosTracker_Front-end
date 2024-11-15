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
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from './config/firebase';


function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      
      if (user) {
        setUser(user);
        return;
      }
      setUser(null);
    });
    return () => unsubscribe();
  }, [])
  

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
          <Route 
            path="/dashboard" 
            element={
              PrivateRoute({children: <Dashboard />, user: user})
            } 
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
