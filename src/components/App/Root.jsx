import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import store from 'store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import App from 'components/App/App';

const persistor = persistStore(store);

export const Root = ({ history }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <App />
      </Router>
    </PersistGate>
  </Provider>
);

Root.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default hot(Root);
