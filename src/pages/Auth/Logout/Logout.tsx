import { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import Modal from '../../../Helpers/Modals/Modal';

const Logout = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setModalOpen(true);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      toast.error('Hubo un error al cerrar sesión. Intenta nuevamente.');
    }
  };

  const closeModal = () => {
    setModalOpen(false); 
    navigate('/dashboard');
  };

  return (
    <>
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title="Cerrar sesión"
        message="¿Estás seguro de que deseas cerrar sesión?"
        onConfirm={handleLogout}  
        confirmText="Cerrar sesión"
        cancelText="Cancelar"
      />
      <Toaster position="bottom-left" reverseOrder={true} />
    </>
  );
};

export default Logout;
