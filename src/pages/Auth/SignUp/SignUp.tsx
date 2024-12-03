import React, { useState } from 'react';
import { auth } from '../../../config/firebase';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { createUser } from '../../../services/public.services';


const SignUp = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length > 6;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      toast.error('El email no es válido');
      return;
    }

    if (!validatePassword(password)) {
      toast.error('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      await createUser(user.email || '', user.uid);
      toast.success('Registro exitoso');

      await signOut(auth);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/email-already-in-use') {
        toast.error('Este email ya está en uso. Intenta con otro.');
      } else if (errorCode === 'auth/invalid-email') {
        toast.error('El formato del email es incorrecto.');
      } else if (errorCode === 'auth/weak-password') {
        toast.error('La contraseña es demasiado débil. Debe tener al menos 6 caracteres.');
      } else {
        toast.error('Error al registrarse: ' + errorMessage);
      }
    }
  };

  const handleReturnLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Registrarse
          </h2>
        </div>
        <div className="mt-2">
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            autoComplete="off"
          />
        </div>
        <div className="mt-2">
          <label htmlFor="">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            autoComplete="off"
          />
        </div>

        <div className="py-2 pt-3">
          <button
            type="submit"
            className="relative inline-flex items-center justify-center p-0.5 w-auto overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
            onClick={handleSignUp}
          >
            <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded group-hover:bg-opacity-0">
              Registrarse
            </span>
          </button>
        </div>
        <div className="py-1">
          <button
            type="submit"
            className="relative inline-flex items-center justify-center p-0.5 w-auto overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
            onClick={handleReturnLogin}
          >
            <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded group-hover:bg-opacity-0">
              Volver
            </span>
          </button>
        </div>


      </div>
      <Toaster position="bottom-left" reverseOrder={true} />
    </>
  );
};

export default SignUp;
