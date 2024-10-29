import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginButton from './LoginButton.js';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500">
      <header className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-3xl mr-2" role="img" aria-label="Fútbol">⚽</span>
            <h1 className="text-2xl font-bold text-white">CoolGoat</h1>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <LoginButton/>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Apuesta en los mejores partidos de fútbol</h2>
          <p className="text-xl text-white mb-8">Únete a la comunidad de apuestas más emocionante y gana grandes premios</p>
          <button className="bg-white text-green-500 px-8 py-3 rounded-full font-bold text-lg hover:bg-green-100 transition duration-300">
            ¡Comienza a apostar ahora V2!
          </button>
        </section>

        <section className="grid md:grid-cols-3 gap-8">
          <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-6 text-white">
            <span className="text-5xl block mb-4" role="img" aria-label="Partidos en vivo">🎮</span>
            <h3 className="text-xl font-semibold mb-2">Partidos en vivo</h3>
            <p>Apuesta en tiempo real en los partidos más emocionantes de las mejores ligas del mundo.</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-6 text-white">
            <span className="text-5xl block mb-4" role="img" aria-label="Comunidad activa">👥</span>
            <h3 className="text-xl font-semibold mb-2">Comunidad activa</h3>
            <p>Únete a miles de apostadores, comparte estrategias y disfruta de la emoción juntos.</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-6 text-white">
            <span className="text-5xl block mb-4" role="img" aria-label="Grandes ganancias">📈</span>
            <h3 className="text-xl font-semibold mb-2">Grandes ganancias</h3>
            <p>Aprovecha nuestras cuotas competitivas y multiplica tus ganancias con cada apuesta acertada.</p>
          </div>
        </section>
      </main>
    </div>
  );
}