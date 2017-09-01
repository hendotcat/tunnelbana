import { createReducer } from 'redux-create-reducer';
import Immutable from 'immutable';
import actions from '../actions';

export default createReducer(new Immutable.Map, {
  [actions.ADD_CONNECTION](state, action) {
    return state.set(action.connection.id, Immutable.fromJS({
      id: action.connection.id,
      sourceId: action.connection.sourceId,
      destinationId: action.connection.destinationId,
      lineId: action.connection.lineId,
      terminalId: undefined,
      tracks: [],
    }));
  },

  [actions.ADD_TRACK](state, action) {
    const id = action.track.connectionId;
    return {...state, [id]: {
      ...state[id],
      tracks: [
        ...state[id].tracks,
        action.track,
      ],
    }};
  }
});

export function connections(state) {
  return state.toList();
}

export function connection(state, id) {
  return state.get(id);
}

export function nextStop(state, previousStationId, currentStationId, lineId) {
  const isReal = state.filter(c => (
    !!c.get('sourceId') && !!c.get('destinationId')
  ));
  const goesHere = isReal.filter(c => (
    c.get('sourceId') === currentStationId
    || c.get('destinationId') === currentStationId
  ));

  const sameLine = goesHere.filter(c => {
    return c.get('lineId') == lineId;
  });

  const onwardsJourney = sameLine.filter(c => {
    const hasNewSource = (
      c.get('sourceId') !== currentStationId
      && c.get('sourceId') !== previousStationId
    );
    const hasNewDestination = (
      c.get('destinationId') !== currentStationId
      && c.get('destinationId') !== previousStationId
    );
    return hasNewSource || hasNewDestination;
  });
  if (onwardsJourney.size > 0) {
    return {
      connectionId: onwardsJourney.first().get('id'),
      destinationId: onwardsJourney.first().get('sourceId') !== currentStationId
        ? onwardsJourney.first().get('sourceId')
        : onwardsJourney.first().get('destinationId'),
    };
  }

  return {
    connectionId: sameLine.first().get('id'),
    destinationId: sameLine.first().get('sourceId') !== currentStationId
      ? sameLine.first().get('sourceId')
      : sameLine.first().get('destinationId'),
  };
}

export function getConnectionsByLine(state, lineId) {
  return connections(state).filter(c => c.get('lineId') === lineId);
}

export function fakeConnections(state) {
  return connections(state).filter(c => !!c.get('terminalId'));
}

export function getConnection(state, lineId, sourceId, destinationId) {
  return connections(state).filter(c => (
    c.get('lineId') === lineId && (
      (c.get('sourceId') === sourceId && c.get('destinationId') === destinationId)
      || (c.get('sourceId') === destinationId && c.get('destinationId') === sourceId)
    )
  ))[0];
}
