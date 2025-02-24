'use client';

import Link from 'next/link';
import React from 'react';

export default function HomePage() {
  return (
    <div className="container">
      <h1>Gerenciador de usuários!</h1>
      <p> Gerencie seus usuários de forma simples, rápida e eficiente. Tudo o que você precisa em um só lugar.</p>
      <Link href="/users">
        <button className="explore-btn">Ver Lista de Usuários</button>
      </Link>

      <style jsx>{`
        .container {
          width: 100%;
          min-height: 100vh;
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: #fff;
          padding: 20px;
          box-sizing: border-box;
        }
        h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        p {
          font-size: 1.5rem;
          margin-bottom: 2rem;
        }
        .explore-btn {
          background-color: #1f8ef1;
          color: #fff;
          border: none;
          padding: 1rem 2rem;
          font-size: 1.2rem;
          cursor: pointer;
          border-radius: 5px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
          transition: background-color 0.3s ease;
        }
        .explore-btn:hover {
          background-color: #0a7bd4;
        }
      `}</style>
    </div>
  );
}
