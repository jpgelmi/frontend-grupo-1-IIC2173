import React, { useState, useEffect } from "react";
import { AlertCircle, Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { postLogin } from "../api/axios";
import { postStats } from "../api/axios";

export default function Login() {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [email, password]);

  useEffect(() => {
    const persistState = localStorage.getItem("persist");
    if (persistState) {
      setPersist(persistState === "true");
    }
  }, [setPersist]);

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    postStats("login", "login");
    if (email === "") {
      setError("Falta el correo electrónico");
      return;
    } else if (password === "") {
      setError("Falta la contraseña");
      return;
    }

    try {
      const response = await postLogin(email, password, {
        withCredentials: true,
      });
      if (response.status === 200) {
        const { accessToken, roles, name, shortName } = response.data;
        setAuth({ email, roles, accessToken, name, shortName });
        saveToLocalStorage("accessToken", accessToken);
        saveToLocalStorage("persist", persist);

        setEmail("");
        setPassword("");
        navigate(from, { replace: true });
      } else {
        setError(response.response.data.message);
      }
    } catch (error) {
      setError(
        error.response ? error.response.data.message : "Error al iniciar sesión"
      );
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#40B3E8] to-[#4058A0] px-4 relative" style={{fontFamily: 'Montserrat, sans-serif'}}>
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center text-white hover:text-gray-200 transition-colors duration-200"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        <span className="text-sm font-medium">Volver a inicio</span>
      </Link>
      <div className="w-full max-w-md mt-16">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="px-8 py-12">
            <div className="flex justify-center mb-8">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-zNngG1oOXGus0MbQSS36QZCffAawwu.png" alt="Lexia Logo" className="w-48" />
            </div>
            <h2 className="text-3xl font-bold text-[#4058A0] text-center mb-4">Iniciar sesión</h2>
            <p className="text-sm text-[#666666] text-center mb-8">
              Ingresa tu correo y contraseña para acceder
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#666666]">
                  Correo electrónico
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-[#40B3E8]" aria-hidden="true" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#40B3E8] focus:border-[#40B3E8] sm:text-sm"
                    placeholder="tu@ejemplo.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#666666]">
                  Contraseña
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[#40B3E8]" aria-hidden="true" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#40B3E8] focus:border-[#40B3E8] sm:text-sm"
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <Eye className="h-5 w-5" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="persist"
                    type="checkbox"
                    checked={persist}
                    onChange={togglePersist}
                    className="h-4 w-4 text-[#40B3E8] focus:ring-[#40B3E8] border-gray-300 rounded"
                  />
                  <label htmlFor="persist" className="ml-2 block text-sm text-[#666666]">
                    Recordarme
                  </label>
                </div>
                <div className="text-sm">
                  <button className="font-medium text-[#4058A0] hover:text-[#40B3E8]" onClick={() => navigate("/forgot-password")}>
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              </div>
              {error && (
                <div className="rounded-md bg-red-50 p-4" role="alert">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">{error}</h3>
                    </div>
                  </div>
                </div>
              )}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-[#40B3E8] to-[#4058A0] hover:from-[#3CA1D1] hover:to-[#394F90] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#40B3E8]"
                  style={{
                    background: 'linear-gradient(-120deg, #4058A0, #40B3E8)',
                    backgroundSize: '200% 200%',
                    animation: 'gradientShift 5s ease infinite',
                  }}
                >
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes gradientShift {
          0% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
          100% {background-position: 0% 50%;}
        }
      `}</style>
    </div>
  );
}