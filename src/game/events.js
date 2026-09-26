// =====================================
// EVENTOS DA HISTÓRIA
// =====================================

export const EVENT_TYPES = {
  TRAFFIC_LIGHT: 'trafficLight',
  PEDESTRIAN: 'pedestrian',
  INTERSECTION: 'intersection',
  SCHOOL_ZONE: 'schoolZone',
  SPEED_CONTROL: 'speedControl',
  SHARED_ROAD: 'sharedRoad',
  FINAL_INTERSECTION: 'finalIntersection'
};

// =====================================
// ESTADO DOS EVENTOS
// =====================================

export function createEventState() {
  return {
    trafficLight: {
      completed: false,
      success: false
    },

    pedestrian: {
      completed: false,
      success: false
    },

    intersection: {
      completed: false,
      success: false
    },

    schoolZone: {
      completed: false,
      success: false
    },

    speedControl: {
      completed: false,
      success: false
    },

    sharedRoad: {
      completed: false,
      success: false
    },

    finalIntersection: {
      completed: false,
      success: false
    }
  };
}

// =====================================
// CONFIGURAÇÃO DA FASE 1
// =====================================

export const phase1Events = [

  {
    id: EVENT_TYPES.TRAFFIC_LIGHT,

    title: 'SEMÁFORO',

    message:
      'O sinal está vermelho. Pare e aguarde para continuar.',

    successMessage:
      'Boa decisão! Você respeitou o sinal vermelho.',

    failureMessage:
      'Você avançou o sinal vermelho. Respeite a sinalização.',

    reward: 100,
    penalty: 150
  },

  {
    id: EVENT_TYPES.PEDESTRIAN,

    title: 'PEDESTRE',

    message:
      'Um pedestre está atravessando. Reduza a velocidade e dê preferência.',

    successMessage:
      'Boa! Você respeitou a travessia do pedestre.',

    failureMessage:
      'Atenção aos pedestres. Eles também fazem parte do trânsito.',

    reward: 100,
    penalty: 100
  },

  {
    id: EVENT_TYPES.INTERSECTION,

    title: 'CRUZAMENTO',

    message:
      'Você chegou a um cruzamento. Observe o trânsito antes de atravessar.',

    successMessage:
      'Cruzamento concluído com segurança!',

    failureMessage:
      'Tenha mais atenção ao atravessar cruzamentos.',

    reward: 100,
    penalty: 100
  },

  {
    id: EVENT_TYPES.SCHOOL_ZONE,

    title: 'ZONA ESCOLAR',

    message:
      'Você entrou na zona escolar. A velocidade máxima é de 30 km/h.',

    successMessage:
      'Velocidade adequada na área escolar!',

    failureMessage:
      'Você está acima do limite da zona escolar.',

    reward: 100,
    penalty: 50
  }

];

// =====================================
// CONFIGURAÇÃO DA FASE 2
// =====================================

export const phase2Events = [

  {
    id: EVENT_TYPES.TRAFFIC_LIGHT,

    title: 'SEMÁFORO',

    message:
      'O sinal está vermelho. Pare a moto elétrica antes do cruzamento.',

    successMessage:
      'Boa! Você respeitou o sinal utilizando a moto elétrica.',

    failureMessage:
      'A moto elétrica também deve respeitar a sinalização.',

    reward: 100,
    penalty: 150
  },

  {
    id: EVENT_TYPES.SPEED_CONTROL,

    title: 'CONTROLE DE VELOCIDADE',

    message:
      'Controle a velocidade da moto e mantenha uma condução segura.',

    successMessage:
      'Velocidade controlada!',

    failureMessage:
      'Você está conduzindo acima da velocidade recomendada.',

    reward: 100,
    penalty: 50
  },

  {
    id: EVENT_TYPES.PEDESTRIAN,

    title: 'PEDESTRE',

    message:
      'Um pedestre está atravessando. Reduza e dê espaço para a travessia.',

    successMessage:
      'Boa convivência! Você respeitou o pedestre.',

    failureMessage:
      'Atenção! Respeite o espaço dos pedestres.',

    reward: 100,
    penalty: 100
  },

  {
    id: EVENT_TYPES.SHARED_ROAD,

    title: 'COMPARTILHANDO A VIA',

    message:
      'Você está compartilhando a via com outros veículos. Mantenha atenção e controle.',

    successMessage:
      'Você conseguiu compartilhar a via com segurança.',

    failureMessage:
      'Tenha mais atenção ao circular próximo de outros veículos.',

    reward: 100,
    penalty: 100
  },

  {
    id: EVENT_TYPES.FINAL_INTERSECTION,

    title: 'ÚLTIMO CRUZAMENTO',

    message:
      'Último cruzamento! Observe a sinalização, os pedestres e os outros veículos.',

    successMessage:
      'Último cruzamento concluído com segurança!',

    failureMessage:
      'Atenção ao cruzar interseções.',

    reward: 150,
    penalty: 150
  }

];

// =====================================
// BUSCAR UM EVENTO
// =====================================

export function getEventConfig(
  eventId,
  level
) {

  const events =
    level === 1
      ? phase1Events
      : phase2Events;

  return events.find(
    event => event.id === eventId
  );
}

// =====================================
// CONCLUIR EVENTO
// =====================================

export function completeEvent(
  eventState,
  eventId,
  success
) {

  if (!eventState[eventId]) {
    return;
  }

  eventState[eventId].completed = true;
  eventState[eventId].success = success;
}

// =====================================
// VERIFICAR SE TODOS OS EVENTOS
// DA FASE FORAM CONCLUÍDOS
// =====================================

export function arePhaseEventsComplete(
  eventState,
  level
) {

  const events =
    level === 1
      ? phase1Events
      : phase2Events;

  return events.every(
    event =>
      eventState[event.id]?.completed
  );
}