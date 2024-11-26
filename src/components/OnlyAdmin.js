import React from "react";
import { useNavigate } from "react-router-dom";

const AdminError = () => {
    const navigate = useNavigate();
    return (
        <div>
        <h1>Unauthorized</h1>
        <p>Only admins can access this page</p>
        <button className="back-button" onClick={() => navigate("/")}> Volver al inicio </button>
        </div> 
    );
    };

export default AdminError;