import { useAuth0 } from "@auth0/auth0-react";

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();

<<<<<<< HEAD
  return (
    <button
      onClick={() => loginWithRedirect()}
      className="bg-white text-green-500 px-4 py-2 rounded-full font-semibold hover:bg-green-100 transition duration-300 flex items-center"
    >
      <span className="mr-2" role="img" aria-label="Iniciar sesión">
        🔑
      </span>
      Iniciar Sesión
    </button>
  );
=======
  return <button onClick={() => loginWithRedirect()}>Log In</button>;
>>>>>>> e78913a (cambios auth0)
}
