import { useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut(auth);
        navigate('/login');
      } catch (error) {
        console.error(error);
      }
    };

    handleLogout();
  }, [auth, navigate]);

  return null; 
};

export default Logout;
