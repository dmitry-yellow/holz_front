import React from 'react';
import { render } from 'react-dom';
import Holz from './components/Holz/Holz';
import './index.css';
import { Provider } from "react-redux";
import store from "./store";


const rootElement = document.getElementById('root');


if (rootElement) {
  render(
      <Provider store={store}>
        <Holz />
      </Provider>,
      rootElement
  );
}


