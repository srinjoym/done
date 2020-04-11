import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from "react-redux";
import configureStore from "./store";
import { PersistGate } from 'redux-persist/integration/react'

const { store, persistor } = configureStore();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
