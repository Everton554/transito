import React from 'react';

export default function MainMenu({ onStart }) {
  return (
    <div className="screen">

      <div className="menu-card">

        <h1>ROTA SEGURA</h1>

        <p className="subtitle">
          Mobilidade Segura e Uso Consciente
          de Motos Elétricas
        </p>

        <p className="description">
          Faça seu trajeto até a escola,
          enfrente situações do trânsito
          e tome decisões responsáveis.
        </p>

        <button onClick={onStart}>
          JOGAR
        </button>

        <div className="controls">
          <strong>CONTROLES</strong>
          <br />
          W / ↑ — Acelerar
          <br />
          S / ↓ — Ré
          <br />
          A / ← — Virar para esquerda
          <br />
          D / → — Virar para direita
        </div>

      </div>

    </div>
  );
}