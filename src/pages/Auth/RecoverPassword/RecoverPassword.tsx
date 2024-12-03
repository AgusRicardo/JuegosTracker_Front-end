import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";

export const RecoverPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleRecoverPassword = async () => {
    if (!email) {
      toast.error("Por favor, ingresa un correo electrónico.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Correo de recuperación enviado. Revisa tu bandeja de entrada.");
      setEmail("");
      navigate("/login");
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        toast.error("El correo ingresado no está registrado.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Por favor, ingresa un correo válido.");
      } else {
        toast.error("Error al enviar el correo de recuperación.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReturnLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="navbar">
        <img
          className="navbarLogo"
          src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/gamepad-512.png"
          alt="Juegos tracker"
        />
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 py-5">
            Recuperar contraseña
          </h2>
        </div>
        <div className="mt-2 py-2">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            autoComplete="off"
          />
        </div>

        <div className="py-2">
          <button
            type="button"
            onClick={handleRecoverPassword}
            disabled={loading}
            className={`relative inline-flex items-center justify-center p-0.5 w-auto overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 ${loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-500"
              }`}
          >
            <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded group-hover:bg-opacity-0">
              {loading ? "Enviando..." : "Recuperar"}
            </span>
          </button>
        </div>
        <div className="py-1">
          <button
            type="button"
            onClick={handleReturnLogin}
            className="relative inline-flex items-center justify-center p-0.5 w-auto overflow-hidden text-sm font-medium text-gray-900 rounded-md group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
          >
            <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded group-hover:bg-opacity-0">
              Volver
            </span>
          </button>
        </div>
      </div>
      <Toaster position="bottom-left" reverseOrder={true} />
      <footer className="footer">
        <a href="https://github.com/AgusRicardo/juegosTracker_Front-end" target="_blank" rel="noopener noreferrer" className="footerIcon">
          <img src="https://img.icons8.com/ios-filled/50/000000/github.png" alt="GitHub" />
        </a>
        <p className="text-gray-900">MDW | Agustin Ricardo, Gisela Dieguez</p>
      </footer>
    </>
  );
};
