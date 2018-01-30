const { createMiddleware } = require("signalbox");
const uuid = require("uuid/v1");

const actions = require("../actions").default;
const select = require("../reducers/selectors").default;

export const middleware = createMiddleware((cancel, before, after) => ({
  [before(actions.CREATE_STATION)](store, action) {
    const state = store.getState();
    let hexagon;

    if (!action.hexagon.id) {
      action.hexagon = select("hexagons").from(state).at(
        0,
        action.hexagon.x,
        action.hexagon.y,
        action.hexagon.z
      ).toJS();
    }

    if (!action.station.id) {
      action.station.id = action.hexagon.id;
    }

    if (!action.cell.id) {
      action.cell.id = action.hexagon.cellId;
    }

  }
}));

export default middleware;


