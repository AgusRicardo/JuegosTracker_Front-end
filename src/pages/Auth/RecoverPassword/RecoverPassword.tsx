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
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Recuperar contraseña
          </h2>
        </div>
        <div className="mt-2">
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

        <div className="py-3">
          <button
            type="button"
            onClick={handleRecoverPassword}
            disabled={loading}
            className={`mt-2 flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${
              loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {loading ? "Enviando..." : "Recuperar"}
          </button>

          <button
            type="button"
            onClick={handleReturnLogin}
            className="mt-2 flex w-full justify-center rounded-md bg-indigo-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Volver
          </button>
        </div>
      </div>
      <Toaster position="bottom-left" reverseOrder={true} />
    </>
  );
};
