import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';
import SimpleReactLightbox from 'simple-react-lightbox';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <SimpleReactLightbox>
      <App />
    </SimpleReactLightbox>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
