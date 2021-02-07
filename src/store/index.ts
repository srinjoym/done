import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from 'redux-persist'
import createElectronStorage from "redux-persist-electron-storage"

import { tasksReducer } from "./task/reducers";
import { timerReducer } from "./timer/reducers";

const rootReducer = combineReducers({
  task: tasksReducer,
  timer: timerReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const persistConfig = {
    key: 'root',
    storage: createElectronStorage(),
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = createStore(persistedReducer, composeWithDevTools(middleWareEnhancer))
  let persistor = persistStore(store)

  return { store, persistor};
}
