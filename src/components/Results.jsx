import React from 'react';

export default function Results({
  stats,
  onRestart,
  onMenu
}) {
  return (
    <div className="screen">

      <div className="results-card">

        <div className="story-label">
          ROTA SEGURA
        </div>

        <h1>TRAJETO CONCLUÍDO!</h1>

        <p className="results-message">
          Você terminou sua jornada.
          <br />
          Confira como foi seu desempenho.
        </p>

        <div className="results-stats">

          <div>
            <span>PONTOS</span>
            <strong>{stats.score}</strong>
          </div>

          <div>
            <span>SEGURANÇA</span>
            <strong>{stats.safety}%</strong>
          </div>

          <div>
            <span>VIDAS RESTANTES</span>
            <strong>{stats.lives}</strong>
          </div>

        </div>

        <div className="results-buttons">

          <button onClick={onRestart}>
            JOGAR NOVAMENTE
          </button>

          <button onClick={onMenu}>
            MENU PRINCIPAL
          </button>

        </div>

      </div>

    </div>
  );
}