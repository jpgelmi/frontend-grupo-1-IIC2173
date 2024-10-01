import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../styles/login.css";
import { postRegister } from "../api/axios";
import logo from "../assets/logo.png";

const Register = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const userRef = useRef();
  const errRef = useRef();
  const emailRef = useRef();

  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    } else {
      console.warn("Input element not found");
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [password, password2, email]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/i;
    const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
    if (password !== password2) {
      setErrMsg("Las contraseñas no coinciden");
      userRef.current.focus();
      return;
    } else if (password.length < 8) {
      setErrMsg("La contraseña debe tener al menos 8 caracteres");
      userRef.current.focus();
      return;
    } else if (!emailRegex.test(email)) {
      setErrMsg("Email inválido");
      emailRef.current.focus();
      return;
    } else if (!passwordRegex.test(password)) {
      setErrMsg("La contraseña debe tener al menos 8 caracteres y un número.");
      userRef.current.focus();
      return;
    } else if (nombre === "" || apellido === "" || fechaNacimiento === "") {
      setErrMsg("Por favor llena todos los campos");
      userRef.current.focus();
      return;
    } else if (!nameRegex.test(nombre) || !nameRegex.test(apellido)) {
      setErrMsg("Nombre y apellido deben contener solo letras y espacios");
      userRef.current.focus();
      return;
    }

    const response = await postRegister(
      email,
      nombre.trim(),
      apellido.trim(),
      fechaNacimiento,
      password.trim(),
      password2.trim()
    );

    if (response.status === 201) {
      const accessToken = response?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ email, roles, accessToken, nombre });
      setPassword("");
      setPassword2("");
      setEmail("");

      navigate("/verify", { state: { from } });
    } else {
      setErrMsg(response.response.data.message);
      errRef.current.scrollIntoView();
    }
  };

  return (
    <div className="App">
      <div className="login-navbar-container">
        <div className="login-navbar-options-home">
          <a href="/">Inicio</a>
        </div>
        <div className="login-navbar-options">
          <h5>Ya tengo una cuenta</h5>
        </div>
        <div className="login-navbar-options">
          <button className="login-navbar-btn">
            <a href="/login">Login</a>
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-inner">
          <div className="logo">
            <img src={logo} className="logo" alt="Logo" />
          </div>
          {errMsg !== "" && (
            <div className="error-box" ref={errRef}>
              <div className="error">{errMsg}</div>
            </div>
          )}
          <div className="form-group">
            <h2>Regístrate</h2>
          </div>
          <div className="form-group">
            <label>Correo Electrónico:</label>
            <input
              type="text"
              id="email"
              ref={emailRef}
              autoComplete="on"
              onChange={(e) => setEmail(e.target.value.trim())}
              value={email}
              required
            />
          </div>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              id="nombre"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
              required
            />
          </div>
          <div className="form-group">
            <label>Apellido:</label>
            <input
              type="text"
              id="apellido"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setApellido(e.target.value)}
              value={apellido}
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha de Nacimiento:</label>
            <input
              type="date"
              id="fechaNacimiento"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setFechaNacimiento(e.target.value.trim())}
              value={fechaNacimiento}
              required
            />
          </div>
          <div className="form-group" style={{ position: "relative" }}>
            <label htmlFor="password">Contraseña:</label>
            <input
              type={showPassword ? "text" : "password"} // Muestra u oculta la contraseña
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="show-password-btn"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          <div className="form-group" style={{ position: "relative" }}>
            <label htmlFor="repeat-password">Repetir Contraseña:</label>
            <input
              type={showPassword ? "text" : "password"}
              id="repeat-password"
              onChange={(e) => setPassword2(e.target.value)}
              value={password2}
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="show-password-btn"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          <input type="submit" value="REGISTRARME" />
        </div>
      </form>
    </div>
  );
};

export default Register;