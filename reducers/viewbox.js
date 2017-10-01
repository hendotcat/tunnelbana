import Immutable from "immutable";
import { createReducer } from "redux-create-reducer";
import actions from "../actions";

const initialState = Immutable.fromJS({
  minX: 0,
  minY: 0,
  width: 0,
  height: 0
});

export const reducer = createReducer(initialState, {
  [actions.WINDOW_RESIZE](state, action) {
    return state.merge({
      width: action.window.width,
      height: action.window.height
    });
  }
});

export const selectors = {
  all(state) {
    return state;
  }
};
