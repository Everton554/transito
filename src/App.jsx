import React, { useState } from 'react';

import MainMenu from './components/MainMenu';
import StoryScreen from './components/StoryScreen';
import GameCanvas from './components/GameCanvas';
import Results from './components/Results';

export default function App() {
  const [screen, setScreen] = useState('MENU');
  const [level, setLevel] = useState(1);
  const [finalStats, setFinalStats] = useState(null);

  function startGame() {
    setScreen('INTRO');
  }

  function startPhaseOne() {
    setLevel(1);
    setScreen('GAME');
  }

  function finishPhaseOne(stats) {
    setFinalStats(stats);
    setScreen('TRANSITION');
  }

  function startPhaseTwo() {
    setLevel(2);
    setScreen('GAME');
  }

  function finishGame(stats) {
    setFinalStats(stats);
    setScreen('RESULTS');
  }

  function restartGame() {
    setLevel(1);
    setFinalStats(null);
    setScreen('INTRO');
  }

  function returnMenu() {
    setLevel(1);
    setFinalStats(null);
    setScreen('MENU');
  }

  return (
    <div className="app">

      {screen === 'MENU' && (
        <MainMenu onStart={startGame} />
      )}

      {screen === 'INTRO' && (
        <StoryScreen
          title="UMA MANHÃ A CAMINHO DA ESCOLA"
          text={
            <>
              É hora de ir para a escola.
              <br /><br />
              O caminho parece tranquilo, mas durante o trajeto
              você encontrará situações que exigem atenção.
              <br /><br />
              <strong>
                Chegar no horário é importante.
                <br />
                Chegar com segurança é ainda mais.
              </strong>
            </>
          }
          buttonText="COMEÇAR TRAJETO"
          onContinue={startPhaseOne}
        />
      )}

      {screen === 'GAME' && (
        <GameCanvas
          level={level}
          onFinishLevel={level === 1 ? finishPhaseOne : finishGame}
          onGameOver={returnMenu}
          onReturnMenu={returnMenu}
        />
      )}

      {screen === 'TRANSITION' && (
        <StoryScreen
          title="DEPOIS DA AULA..."
          text={
            <>
              Você chegou à escola.
              <br /><br />
              Agora começa uma nova etapa da jornada.
              <br /><br />
              Desta vez, você utilizará uma
              <strong> moto elétrica</strong>.
              <br /><br />
              Controle sua velocidade, respeite a sinalização
              e compartilhe a via com responsabilidade.
            </>
          }
          buttonText="SAIR COM A MOTO"
          onContinue={startPhaseTwo}
        />
      )}

      {screen === 'RESULTS' && finalStats && (
        <Results
          stats={finalStats}
          onRestart={restartGame}
          onMenu={returnMenu}
        />
      )}

    </div>
  );
}