import React, {
  useEffect,
  useRef,
  useState
} from 'react';

import HUD from './HUD';

import { Player } from '../game/player';

import {
  MAP_WIDTH,
  MAP_HEIGHT,
  buildings,
  drawMap,
  isOnRoad,
  isInsideBuilding,
  eventPositions
} from '../game/map';

import {
  createEventState,
  getEventConfig,
  completeEvent,
  arePhaseEventsComplete
} from '../game/events';

const CAMERA_ZOOM = 1.15;

export default function GameCanvas({
  level,
  onFinishLevel,
  onGameOver,
  onReturnMenu
}) {

  const canvasRef =
    useRef(null);

  const wrapperRef =
    useRef(null);

  const playerRef =
    useRef(null);

  const keysRef =
    useRef({});

  const animationRef =
    useRef(null);

  const eventStateRef =
    useRef(createEventState());

  const finishedRef =
    useRef(false);

  const scoreRef =
    useRef(0);

  const safetyRef =
    useRef(100);

  const livesRef =
    useRef(3);

  const [score, setScore] =
    useState(0);

  const [safety, setSafety] =
    useState(100);

  const [lives, setLives] =
    useState(3);

  const [speed, setSpeed] =
    useState(0);

  const [message, setMessage] =
    useState(null);

  const [paused, setPaused] =
    useState(false);

  const objective =
    level === 1
      ? 'Chegue à escola com segurança.'
      : 'Conduza a moto elétrica com responsabilidade.';

  // =====================================
  // INICIAR FASE
  // =====================================

  useEffect(() => {

    eventStateRef.current =
      createEventState();

    finishedRef.current =
      false;

    scoreRef.current =
      0;

    safetyRef.current =
      100;

    livesRef.current =
      3;

    setScore(0);
    setSafety(100);
    setLives(3);
    setSpeed(0);
    setMessage(null);
    setPaused(false);

    if (level === 1) {

      playerRef.current =
        new Player(
          400,
          1110,
          'car'
        );

      playerRef.current.angle =
        Math.PI / 2;

    } else {

      // =================================
      // INÍCIO DA FASE 2
      // =================================

      playerRef.current =
        new Player(
          1500,
          410,
          'moto'
        );

      // Começa andando para a direita
      playerRef.current.angle =
        Math.PI / 2;
    }

  }, [level]);

  // =====================================
  // TECLADO
  // =====================================

  useEffect(() => {

    function handleKeyDown(event) {

      keysRef.current[event.key] =
        true;

      if (
        event.key === 'Escape' ||
        event.key === 'p' ||
        event.key === 'P'
      ) {

        setPaused(prev => !prev);
      }
    }

    function handleKeyUp(event) {

      keysRef.current[event.key] =
        false;
    }

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    window.addEventListener(
      'keyup',
      handleKeyUp
    );

    return () => {

      window.removeEventListener(
        'keydown',
        handleKeyDown
      );

      window.removeEventListener(
        'keyup',
        handleKeyUp
      );

    };

  }, []);

  // =====================================
  // TAMANHO DO CANVAS
  // =====================================

  useEffect(() => {

    const canvas =
      canvasRef.current;

    const wrapper =
      wrapperRef.current;

    if (!canvas || !wrapper) {
      return;
    }

    function resizeCanvas() {

      canvas.width =
        wrapper.clientWidth;

      canvas.height =
        wrapper.clientHeight;
    }

    resizeCanvas();

    window.addEventListener(
      'resize',
      resizeCanvas
    );

    return () => {

      window.removeEventListener(
        'resize',
        resizeCanvas
      );

    };

  }, []);

  // =====================================
  // MENSAGEM
  // =====================================

  function showMessage(
    title,
    text,
    success
  ) {

    setMessage({
      title,
      text,
      success
    });

    setTimeout(() => {
      setMessage(null);
    }, 2500);
  }

  // =====================================
  // PENALIDADE
  // =====================================

  function applyPenalty(
    penalty,
    failureMessage
  ) {

    const newScore =
      Math.max(
        0,
        scoreRef.current -
          penalty
      );

    const newSafety =
      Math.max(
        0,
        safetyRef.current -
          10
      );

    const newLives =
      Math.max(
        0,
        livesRef.current -
          1
      );

    scoreRef.current =
      newScore;

    safetyRef.current =
      newSafety;

    livesRef.current =
      newLives;

    setScore(newScore);
    setSafety(newSafety);
    setLives(newLives);

    showMessage(
      'ATENÇÃO',
      failureMessage,
      false
    );

    if (newLives <= 0) {

      setTimeout(() => {
        onGameOver();
      }, 700);

    }
  }

  // =====================================
  // EVENTO
  // =====================================

  function handleEvent(
    eventId,
    success
  ) {

    const state =
      eventStateRef.current;

    if (
      state[eventId]?.completed
    ) {
      return;
    }

    const config =
      getEventConfig(
        eventId,
        level
      );

    if (!config) {
      return;
    }

    completeEvent(
      state,
      eventId,
      success
    );

    if (success) {

      const newScore =
        scoreRef.current +
        config.reward;

      scoreRef.current =
        newScore;

      setScore(newScore);

      showMessage(
        config.title,
        config.successMessage,
        true
      );

    } else {

      applyPenalty(
        config.penalty,
        config.failureMessage
      );

    }
  }

  // =====================================
  // FASE 1
  // =====================================

  function checkPhaseOneEvents() {

    const player =
      playerRef.current;

    const positions =
      eventPositions.phase1;

    const state =
      eventStateRef.current;

    if (!player) {
      return;
    }

    // -------------------------------
    // SEMÁFORO
    // -------------------------------

    if (
      !state.trafficLight.completed &&
      player.x >=
        positions.trafficLight.x &&
      Math.abs(
        player.y -
          positions.trafficLight.y
      ) < 70
    ) {

      const success =
        Math.abs(player.speed) <
        0.5;

      handleEvent(
        'trafficLight',
        success
      );
    }

    // -------------------------------
    // PEDESTRE
    // -------------------------------

    if (
      !state.pedestrian.completed &&
      player.x >=
        positions.pedestrian.x &&
      Math.abs(
        player.y -
          positions.pedestrian.y
      ) < 70
    ) {

      const success =
        Math.abs(player.speed) <= 2;

      handleEvent(
        'pedestrian',
        success
      );
    }

    // -------------------------------
    // CRUZAMENTO
    // -------------------------------

    if (
      !state.intersection.completed &&
      player.x >=
        positions.intersection.x &&
      Math.abs(
        player.y -
          positions.intersection.y
      ) < 70
    ) {

      const success =
        Math.abs(player.speed) <= 3;

      handleEvent(
        'intersection',
        success
      );
    }

    // -------------------------------
    // ZONA ESCOLAR
    // -------------------------------

    if (
      !state.schoolZone.completed &&
      player.x >=
        positions.schoolZone.x &&
      player.y >= 350 &&
      player.y <= 490
    ) {

      const success =
        Math.abs(player.speed) <= 3;

      handleEvent(
        'schoolZone',
        success
      );
    }
  }

  // =====================================
  // FASE 2
  // =====================================

  function checkPhaseTwoEvents() {

    const player =
      playerRef.current;

    const positions =
      eventPositions.phase2;

    const state =
      eventStateRef.current;

    if (!player) {
      return;
    }

    // =================================
    // SEMÁFORO
    // =================================

    if (
      !state.trafficLight.completed &&
      player.x >=
        positions.trafficLight.x &&
      Math.abs(
        player.y -
          positions.trafficLight.y
      ) < 70
    ) {

      const success =
        Math.abs(player.speed) <
        0.5;

      handleEvent(
        'trafficLight',
        success
      );
    }

    // =================================
    // CONTROLE DE VELOCIDADE
    // =================================

    if (
      !state.speedControl.completed &&
      player.x >=
        positions.speedControl.x &&
      Math.abs(
        player.y -
          positions.speedControl.y
      ) < 70
    ) {

      const success =
        Math.abs(player.speed) <= 4;

      handleEvent(
        'speedControl',
        success
      );
    }

    // =================================
    // PEDESTRE
    // =================================

    if (
      !state.pedestrian.completed &&
      player.x >=
        positions.pedestrian.x &&
      Math.abs(
        player.y -
          positions.pedestrian.y
      ) < 70
    ) {

      const success =
        Math.abs(player.speed) <= 2;

      handleEvent(
        'pedestrian',
        success
      );
    }

    // =================================
    // VIA COMPARTILHADA
    // =================================

    if (
      !state.sharedRoad.completed &&
      player.x >=
        positions.sharedRoad.x &&
      Math.abs(
        player.y -
          positions.sharedRoad.y
      ) < 70
    ) {

      const success =
        Math.abs(player.speed) <= 4;

      handleEvent(
        'sharedRoad',
        success
      );
    }

    // =================================
    // ÚLTIMO CRUZAMENTO
    // =================================

    if (
      !state.finalIntersection.completed &&
      player.x >=
        positions.finalIntersection.x &&
      Math.abs(
        player.y -
          positions.finalIntersection.y
      ) < 70
    ) {

      const success =
        Math.abs(player.speed) <= 3;

      handleEvent(
        'finalIntersection',
        success
      );
    }
  }

  // =====================================
  // VERIFICAR EVENTOS
  // =====================================

  function checkEvents() {

    if (level === 1) {
      checkPhaseOneEvents();
    }

    if (level === 2) {
      checkPhaseTwoEvents();
    }
  }

  // =====================================
  // FINAL DA FASE
  // =====================================

  function checkLevelComplete() {

    if (finishedRef.current) {
      return;
    }

    const player =
      playerRef.current;

    if (!player) {
      return;
    }

    const eventsComplete =
      arePhaseEventsComplete(
        eventStateRef.current,
        level
      );

    if (!eventsComplete) {
      return;
    }

    // =================================
    // FASE 1
    // =================================

    if (level === 1) {

      const reachedSchool =
        isInsideBuilding(
          player.x,
          player.y,
          buildings.school
        );

      if (reachedSchool) {

        finishedRef.current =
          true;

        onFinishLevel({

          score:
            scoreRef.current,

          safety:
            safetyRef.current,

          lives:
            livesRef.current

        });
      }

      return;
    }

    // =================================
    // FASE 2
    // =================================

    if (
      player.x >= 2250 &&
      player.y >= 350 &&
      player.y <= 490
    ) {

      finishedRef.current =
        true;

      onFinishLevel({

        score:
          scoreRef.current,

        safety:
          safetyRef.current,

        lives:
          livesRef.current

      });
    }
  }

  // =====================================
  // DESENHAR
  // =====================================

  function drawGame(ctx) {

    const canvas =
      canvasRef.current;

    const player =
      playerRef.current;

    if (!canvas || !player) {
      return;
    }

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    ctx.save();

    // Câmera acompanha o jogador

    ctx.translate(
      canvas.width / 2,
      canvas.height / 2
    );

    ctx.scale(
      CAMERA_ZOOM,
      CAMERA_ZOOM
    );

    ctx.translate(
      -player.x,
      -player.y
    );

    drawMap(ctx);

    player.draw(ctx);

    ctx.restore();
  }

  // =====================================
  // LOOP DO JOGO
  // =====================================

  // O loop usa funções que são recriadas
  // durante o render. O ESLint do Vercel
  // trata isso como erro de build.
  // Neste caso, o loop precisa permanecer
  // ativo enquanto level/paused mudam.

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {

    const canvas =
      canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx =
      canvas.getContext('2d');

    function gameLoop() {

      const player =
        playerRef.current;

      if (
        !paused &&
        player
      ) {

        const oldX =
          player.x;

        const oldY =
          player.y;

        player.update(
          keysRef.current
        );

        // -----------------------------
        // LIMITES
        // -----------------------------

        const outsideMap =
          player.x < 20 ||
          player.x >
            MAP_WIDTH - 20 ||
          player.y < 20 ||
          player.y >
            MAP_HEIGHT - 20;

        if (outsideMap) {

          player.x =
            oldX;

          player.y =
            oldY;

          player.speed =
            0;
        }

        // -----------------------------
        // GRAMA
        // -----------------------------

        const validPosition =
          isOnRoad(
            player.x,
            player.y
          ) ||

          isInsideBuilding(
            player.x,
            player.y,
            buildings.home
          ) ||

          isInsideBuilding(
            player.x,
            player.y,
            buildings.school
          );

        if (!validPosition) {

          player.x =
            oldX;

          player.y =
            oldY;

          player.speed =
            0;
        }

        // -----------------------------
        // EVENTOS
        // -----------------------------

        checkEvents();

        // -----------------------------
        // FINAL
        // -----------------------------

        checkLevelComplete();

        // -----------------------------
        // VELOCIDADE
        // -----------------------------

        setSpeed(
          Math.round(
            Math.abs(
              player.speed
            ) * 10
          )
        );
      }

      drawGame(ctx);

      animationRef.current =
        requestAnimationFrame(
          gameLoop
        );
    }

    animationRef.current =
      requestAnimationFrame(
        gameLoop
      );

    return () => {

      cancelAnimationFrame(
        animationRef.current
      );

    };

  }, [
    level,
    paused
  ]);

  // =====================================
  // INTERFACE
  // =====================================

  return (

    <div className="game-screen">

      <HUD
        level={level}
        score={score}
        safety={safety}
        lives={lives}
        speed={speed}
        objective={objective}
      />

      <div
        ref={wrapperRef}
        className="canvas-wrapper"
      >

        <canvas
          ref={canvasRef}
        />

      </div>

      {message && (

        <div
          className={
            message.success
              ? 'event-message success'
              : 'event-message failure'
          }
        >

          <h2>
            {message.title}
          </h2>

          <p>
            {message.text}
          </p>

        </div>

      )}

      {paused && (

        <div className="pause-overlay">

          <div className="pause-card">

            <h2>
              JOGO PAUSADO
            </h2>

            <button
              onClick={() =>
                setPaused(false)
              }
            >
              CONTINUAR
            </button>

            <button
              onClick={onReturnMenu}
            >
              VOLTAR AO MENU
            </button>

          </div>

        </div>

      )}

    </div>
  );
}