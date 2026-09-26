import React from 'react';

export default function HUD({
  level,
  score,
  safety,
  lives,
  speed,
  objective
}) {
  return (
    <div className="hud">

      <div className="hud-left">

        <div>
          FASE: <strong>{level}</strong>
        </div>

        <div>
          PONTOS: <strong>{score}</strong>
        </div>

        <div>
          SEGURANÇA: <strong>{safety}%</strong>
        </div>

      </div>

      <div className="objective">
        OBJETIVO: {objective}
      </div>

      <div className="hud-right">

        <div>
          VELOCIDADE: <strong>{speed} km/h</strong>
        </div>

        <div>
          VIDAS: {'❤️'.repeat(lives)}
        </div>

      </div>

    </div>
  );
}