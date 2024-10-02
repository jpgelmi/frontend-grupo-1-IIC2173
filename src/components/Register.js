import React, { useState, useEffect, useRef } from 'react'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { postRegister } from '../api/axios.js'
import useAuth from './hooks/useAuth.js'
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'

export default function MinimalRegister() {
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/home";
  console.log(from);
  const userRef = useRef(null)
  const emailRef = useRef(null)
  const errRef = useRef(null)

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  };

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus()
    } else {
      console.warn("Input element not found")
    }
  }, [])

  useEffect(() => {
    setErrMsg("")
  }, [password, password2, email])

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/i
    const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/

    if (password !== password2) {
      setErrMsg("Las contraseñas no coinciden")
      userRef.current?.focus()
      return
    } else if (password.length < 8) {
      setErrMsg("La contraseña debe tener al menos 8 caracteres")
      userRef.current?.focus()
      return
    } else if (!emailRegex.test(email)) {
      setErrMsg("Email inválido")
      emailRef.current?.focus()
      return
    } else if (!passwordRegex.test(password)) {
      setErrMsg("La contraseña debe tener al menos 8 caracteres y un número.")
      userRef.current?.focus()
      return
    } else if (userName === "") {
      setErrMsg("Por favor llena todos los campos")
      userRef.current?.focus()
      return
    } else if (!nameRegex.test(userName)) {
      setErrMsg("Nombre y apellido deben contener solo letras y espacios")
      userRef.current?.focus()
      return
    }

    try {
      const response = await postRegister(
        email,
        userName.trim(),
        password.trim(),
      )

      if (response.status === 201) {
        const accessToken = response?.data?.accessToken
        const roles = response?.data?.roles
        console.log(roles, accessToken, email, userName)
        setAuth({ email, roles, accessToken, name: userName });

        saveToLocalStorage("accessToken", accessToken);
        saveToLocalStorage("persist", persist);

        setPassword("")
        setPassword2("")
        setEmail("")

        navigate(from, { replace: true });
      } else {
        console.log(response)
        setErrMsg(response.response.data.message)
        errRef.current?.scrollIntoView()
      }
    } catch (err) {
      setErrMsg("Error al registrar. Por favor, intenta de nuevo.")
      errRef.current?.scrollIntoView()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link 
          to="/" 
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="text-sm font-medium">Volver a inicio</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Regístrate</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
          {errMsg && (
            <div ref={errRef} className="mb-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{errMsg}</span>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ref={emailRef}
              />
            </div>

            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                id="userName"
                name="userName"
                type="text"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                ref={userRef}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
                Repetir Contraseña
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="password2"
                  name="password2"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300"
              >
                REGISTRARME
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  ¿Ya tienes una cuenta?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-gray-50 transition duration-300"
              >
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}