import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { commitTransaction } from '../../api/axios.js';
import useAuth from "../hooks/useAuth.js";

const CompletedPurchase = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { auth } = useAuth();
  const token = auth.accessToken;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token_ws = searchParams.get('token_ws');
        console.log("Token_ws:");
        console.log(token_ws);
        console.log("Token:");
        console.log(token);
        const response = await commitTransaction({ token, token_ws });
        console.log("Respuesta del back:");
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="p-20">
        <h1>Loading...</h1>
      </div>
    );
  }

  console.log(data);

  return (
    <div className="p-8 mt-20 flex flex-col gap-3 w-1/3 mx-auto rounded-xl shadow-[0_0px_8px_#b4b4b4]">
      <h1 className="text-center">Purchase Completed</h1>
      <p>{data.message}</p>
      <Link to="/home" className="bg-black text-white px-3 py-2 rounded text-center">Volver a inicio</Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: '2rem',
    color: '#343a40',
  },
  message: {
    fontSize: '1.2rem',
    color: '#6c757d',
    textAlign: 'center',
    margin: '20px 0',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default CompletedPurchase;