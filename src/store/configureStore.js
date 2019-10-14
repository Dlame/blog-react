import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./reducers";

export const history = createBrowserHistory();

export default function configureStore(preloadState) {
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    createRootReducer(history),
    preloadState,
    composeEnhancer(applyMiddleware(routerMiddleware(history)))
  );

  // Hot reloading
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      store.replaceReducer(createRootReducer(history));
    });
  }
  return store;
}
