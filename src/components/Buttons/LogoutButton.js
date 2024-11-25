import { useAuth0 } from "@auth0/auth0-react";
import './styles/LogOutButton.css';

export default function LogOutButton() {
  const { logout, isAuthenticated } = useAuth0();
  
  return (
    isAuthenticated && (
      <button
        onClick={() => logout()}
        className="logout-button"
      >
        <span role="img" aria-label="Cerrar sesión">
          👋
        </span>
        Cerrar Sesión
      </button>
    )
  );
}