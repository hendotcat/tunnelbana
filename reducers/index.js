const { combineReducers, createStore, applyMiddleware, compose } = require("redux");
const { createSelectors } = require("signalbox");

const middleware = require("../middlewares").default;

const actors = require("./actors");
const viewport = require("./viewport");

export const reducers = {
  actors: actors.reducer,
  viewport: viewport.reducer,
};

export const selectors = createSelectors({
  actors: actors.selectors,
  viewport: viewport.selectors,
});

export default function () {
  const reducer = combineReducers(reducers);
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducer,
    undefined,
    composeEnhancers(applyMiddleware(middleware))
  );

  return store;
}

