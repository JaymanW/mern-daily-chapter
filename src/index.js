import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react"

ReactDOM.render(
  <Auth0Provider
  domain="dev-2zwsp4xr.us.auth0.com"
  clientId="WsT2L6mobn9FkTvPAs574PHRwPv60fxW"
  redirectUri={window.location.origin}
  audience="https://dev-2zwsp4xr.us.auth0.com/api/v2/"
  scope="read:current_user update:current_user_metadata"
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
);
