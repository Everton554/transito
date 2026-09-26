// =====================================
// CONFIGURAÇÕES DO MAPA
// =====================================

export const MAP_WIDTH = 2400;
export const MAP_HEIGHT = 1400;

export const ROAD_WIDTH = 120;

// =====================================
// CASA E ESCOLA
// =====================================

export const buildings = {
  home: {
    x: 80,
    y: 850,
    width: 280,
    height: 200,
    label: 'CASA'
  },

  school: {
    x: 2020,
    y: 150,
    width: 280,
    height: 200,
    label: 'ESCOLA'
  }
};

// =====================================
// RUAS
// =====================================

export const roads = [

  // Rua principal da casa
  {
    x: 0,
    y: 1050,
    width: 1420,
    height: ROAD_WIDTH
  },

  // Avenida vertical
  {
    x: 1300,
    y: 350,
    width: ROAD_WIDTH,
    height: 820
  },

  // Rua da escola
  {
    x: 1300,
    y: 350,
    width: 1050,
    height: ROAD_WIDTH
  },

  // Acesso da escola
  {
    x: 2150,
    y: 300,
    width: 60,
    height: 70
  }
];

// =====================================
// FAIXAS DE PEDESTRES
// =====================================

export const crosswalks = [

  // Faixa do semáforo
  {
    id: 'crosswalk-traffic',
    x: 600,
    y: 1050,
    width: 30,
    height: 120
  },

  // Faixa de pedestres
  {
    id: 'crosswalk-pedestrian',
    x: 950,
    y: 1050,
    width: 30,
    height: 120
  },

  // Faixa antes do cruzamento
  {
    id: 'crosswalk-intersection',
    x: 1250,
    y: 1050,
    width: 30,
    height: 120
  },

  // Faixa próxima da escola
  {
    id: 'crosswalk-school',
    x: 1880,
    y: 350,
    width: 30,
    height: 120
  }
];

// =====================================
// SEMÁFOROS
// =====================================

export const trafficLights = [

  {
    id: 'traffic-1',
    x: 570,
    y: 1000,
    state: 'red'
  },

  {
    id: 'traffic-2',
    x: 1300,
    y: 1000,
    state: 'green'
  },

  {
    id: 'traffic-3',
    x: 1700,
    y: 300,
    state: 'red'
  }
];

// =====================================
// ZONA ESCOLAR
// =====================================

export const schoolZone = {
  x: 1500,
  y: 210,
  width: 850,
  height: 500,
  speedLimit: 30
};

// =====================================
// ZONA DA MOTO ELÉTRICA
// =====================================

export const electricBikeZone = {
  x: 1500,
  y: 350,
  width: 850,
  height: 140,
  speedLimit: 40
};

// =====================================
// POSIÇÕES DOS EVENTOS
// =====================================

export const eventPositions = {

  phase1: {

    trafficLight: {
      x: 620,
      y: 1110
    },

    pedestrian: {
      x: 970,
      y: 1110
    },

    intersection: {
      x: 1280,
      y: 1110
    },

    schoolZone: {
      x: 1550,
      y: 420
    }

  },

  phase2: {

    trafficLight: {
      x: 1700,
      y: 420
    },

    speedControl: {
      x: 1850,
      y: 420
    },

    pedestrian: {
      x: 2000,
      y: 420
    },

    sharedRoad: {
      x: 2180,
      y: 420
    },

    finalIntersection: {
      x: 2300,
      y: 420
    }

  }

};

// =====================================
// FUNÇÕES AUXILIARES
// =====================================

export function isPointInside(
  x,
  y,
  area
) {
  return (
    x >= area.x &&
    x <= area.x + area.width &&
    y >= area.y &&
    y <= area.y + area.height
  );
}

export function isOnRoad(
  x,
  y
) {
  return roads.some(road => {

    return (
      x >= road.x &&
      x <= road.x + road.width &&
      y >= road.y &&
      y <= road.y + road.height
    );

  });
}

export function isInsideBuilding(
  x,
  y,
  building
) {
  return (
    x >= building.x &&
    x <= building.x + building.width &&
    y >= building.y &&
    y <= building.y + building.height
  );
}

// =====================================
// DESENHAR MAPA
// =====================================

export function drawMap(ctx) {

  // ---------------------------------
  // GRAMA
  // ---------------------------------

  ctx.fillStyle = '#4b963f';

  ctx.fillRect(
    0,
    0,
    MAP_WIDTH,
    MAP_HEIGHT
  );

  // ---------------------------------
  // TEXTURA DA GRAMA
  // ---------------------------------

  ctx.fillStyle = '#438538';

  for (
    let x = 20;
    x < MAP_WIDTH;
    x += 80
  ) {

    for (
      let y = 20;
      y < MAP_HEIGHT;
      y += 80
    ) {

      ctx.fillRect(
        x,
        y,
        4,
        4
      );

    }

  }

  // ---------------------------------
  // RUAS
  // ---------------------------------

  roads.forEach(road => {

    // Calçada
    ctx.fillStyle = '#9ca3af';

    ctx.fillRect(
      road.x - 7,
      road.y - 7,
      road.width + 14,
      road.height + 14
    );

    // Asfalto
    ctx.fillStyle = '#303030';

    ctx.fillRect(
      road.x,
      road.y,
      road.width,
      road.height
    );

    // Linha central
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 4;
    ctx.setLineDash([
      25,
      20
    ]);

    ctx.beginPath();

    if (
      road.width >
      road.height
    ) {

      ctx.moveTo(
        road.x,
        road.y +
          road.height / 2
      );

      ctx.lineTo(
        road.x +
          road.width,
        road.y +
          road.height / 2
      );

    } else {

      ctx.moveTo(
        road.x +
          road.width / 2,
        road.y
      );

      ctx.lineTo(
        road.x +
          road.width / 2,
        road.y +
          road.height
      );

    }

    ctx.stroke();

    ctx.setLineDash([]);

  });

  // ---------------------------------
  // FAIXAS
  // ---------------------------------

  crosswalks.forEach(
    crosswalk => {

      ctx.fillStyle =
        '#ffffff';

      if (
        crosswalk.width <
        crosswalk.height
      ) {

        for (
          let y =
            crosswalk.y;

          y <
            crosswalk.y +
            crosswalk.height;

          y += 20
        ) {

          ctx.fillRect(
            crosswalk.x,
            y,
            crosswalk.width,
            13
          );

        }

      } else {

        for (
          let x =
            crosswalk.x;

          x <
            crosswalk.x +
            crosswalk.width;

          x += 20
        ) {

          ctx.fillRect(
            x,
            crosswalk.y,
            13,
            crosswalk.height
          );

        }

      }

    }
  );

  // ---------------------------------
  // ZONA ESCOLAR
  // ---------------------------------

  ctx.fillStyle =
    'rgba(250, 204, 21, 0.10)';

  ctx.fillRect(
    schoolZone.x,
    schoolZone.y,
    schoolZone.width,
    schoolZone.height
  );

  // ---------------------------------
  // PLACA ZONA ESCOLAR
  // ---------------------------------

  drawSchoolSign(
    ctx,
    1540,
    300
  );

  // ---------------------------------
  // SEMÁFOROS
  // ---------------------------------

  trafficLights.forEach(
    light => {

      drawTrafficLight(
        ctx,
        light.x,
        light.y,
        light.state
      );

    }
  );

  // ---------------------------------
  // CASAS / PRÉDIOS
  // ---------------------------------

  drawBuilding(
    ctx,
    buildings.home,
    '#8b5cf6'
  );

  drawBuilding(
    ctx,
    buildings.school,
    '#f59e0b'
  );

  // ---------------------------------
  // ACESSO DA ESCOLA
  // ---------------------------------

  ctx.fillStyle = '#9ca3af';

  ctx.fillRect(
    2150,
    300,
    60,
    70
  );

}

// =====================================
// PRÉDIOS
// =====================================

function drawBuilding(
  ctx,
  building,
  color
) {

  ctx.fillStyle =
    color;

  ctx.fillRect(
    building.x,
    building.y,
    building.width,
    building.height
  );

  ctx.strokeStyle =
    '#111827';

  ctx.lineWidth = 5;

  ctx.strokeRect(
    building.x,
    building.y,
    building.width,
    building.height
  );

  ctx.fillStyle =
    '#ffffff';

  ctx.font =
    'bold 20px Arial';

  ctx.textAlign =
    'center';

  ctx.textBaseline =
    'middle';

  ctx.fillText(
    building.label,
    building.x +
      building.width / 2,
    building.y +
      building.height / 2
  );

  ctx.textBaseline =
    'alphabetic';
}

// =====================================
// SEMÁFORO
// =====================================

function drawTrafficLight(
  ctx,
  x,
  y,
  state
) {

  // Poste
  ctx.fillStyle =
    '#111827';

  ctx.fillRect(
    x,
    y,
    6,
    55
  );

  // Caixa
  ctx.fillStyle =
    '#111827';

  ctx.fillRect(
    x - 17,
    y - 65,
    40,
    65
  );

  ctx.strokeStyle =
    '#9ca3af';

  ctx.lineWidth = 2;

  ctx.strokeRect(
    x - 17,
    y - 65,
    40,
    65
  );

  // Vermelho
  ctx.beginPath();

  ctx.fillStyle =
    state === 'red'
      ? '#ef4444'
      : '#4b5563';

  ctx.arc(
    x + 3,
    y - 50,
    6,
    0,
    Math.PI * 2
  );

  ctx.fill();

  // Amarelo
  ctx.beginPath();

  ctx.fillStyle =
    '#4b5563';

  ctx.arc(
    x + 3,
    y - 32,
    6,
    0,
    Math.PI * 2
  );

  ctx.fill();

  // Verde
  ctx.beginPath();

  ctx.fillStyle =
    state === 'green'
      ? '#22c55e'
      : '#4b5563';

  ctx.arc(
    x + 3,
    y - 14,
    6,
    0,
    Math.PI * 2
  );

  ctx.fill();
}

// =====================================
// PLACA ZONA ESCOLAR
// =====================================

function drawSchoolSign(
  ctx,
  x,
  y
) {

  // Poste
  ctx.fillStyle =
    '#6b7280';

  ctx.fillRect(
    x,
    y,
    6,
    70
  );

  // Placa
  ctx.fillStyle =
    '#facc15';

  ctx.fillRect(
    x - 45,
    y - 65,
    96,
    65
  );

  ctx.strokeStyle =
    '#111827';

  ctx.lineWidth = 3;

  ctx.strokeRect(
    x - 45,
    y - 65,
    96,
    65
  );

  ctx.fillStyle =
    '#111827';

  ctx.font =
    'bold 12px Arial';

  ctx.textAlign =
    'center';

  ctx.fillText(
    'ZONA',
    x + 3,
    y - 40
  );

  ctx.fillText(
    'ESCOLAR',
    x + 3,
    y - 23
  );

  ctx.font =
    '10px Arial';

  ctx.fillText(
    '30 KM/H',
    x + 3,
    y - 8
  );
}