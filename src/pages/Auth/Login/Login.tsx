import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebase";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Loading } from "../../../components/Loading/Loading";
import './login.css';

const Login = () => {
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setemail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpassword(e.target.value);
  };

  const handleSignUp = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(true);
      navigate("/dashboard/home");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      
      if (errorCode === 'auth/user-not-found') {
        toast.error("El usuario no existe. Por favor verifica el correo.");
        
      } else if (errorCode === 'auth/wrong-password') {
        toast.error("Contraseña incorrecta. Intenta nuevamente.");
      } else if (errorCode === 'auth/too-many-requests') {
        toast.error("Demasiados intentos fallidos. Intenta nuevamente más tarde.");
      } else if (errorCode === 'auth/invalid-email') {
        toast.error("El formato del email es incorrecto.");
      } else if (errorCode === 'auth/invalid-credential'){
        toast.error("Credenciales inválidas. Intenta nuevamente.");
      } else {
        toast.error("Error al iniciar sesión: " + errorMessage);
      }
    } 
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Iniciar sesión
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      onChange={handleEmailChange}
                      className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Contraseña
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      onChange={handlePasswordChange}
                      className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="container-btn-footer-login mt-2">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500" onClick={() => navigate("/recoverPassword")}>
                    Olvidé mi contraseña
                  </a>
                </div>
                <div className="container-btn-footer-login">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                    onClick={() => navigate("/signUp")}
                  >
                    Crear una nueva cuenta
                  </a>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleSignUp}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Iniciar sesión
                  </button>
                </div>
              </form>
            </div>
            <Toaster position="bottom-left" reverseOrder={true} />
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
