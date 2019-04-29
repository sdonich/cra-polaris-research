import React from 'react';
import ReactDOM from 'react-dom';
import '@shopify/polaris/styles.css';
import {AppProvider} from '@shopify/polaris';

import App from './Autocomplete';

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('root'),
);
