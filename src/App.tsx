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
import PublicRoute from './routes/PublicRoutes';


function App() {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        return;
      }
      setUser(null);
      localStorage.removeItem("user");
    });
    return () => unsubscribe();
  }, [])
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/*" element={<PublicRoute user={user}>{<Login />}</PublicRoute>} />
          <Route path="/login" element={<PublicRoute user={user}>{<Login />}</PublicRoute>} />
          <Route path="/signUp" element={<PublicRoute user={user}>{<SignUp />}</PublicRoute>} />
          
          <Route path="/logout" element={<Logout />} />

          {/* Rutas privadas */}
          <Route path="/dashboard" element={PrivateRoute({children: <Dashboard />, user: user})} />
          <Route path="/dashboard/*" element={PrivateRoute({children: <Dashboard />, user: user})} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
