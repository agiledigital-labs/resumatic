import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureAmplify } from 'amplify-redux-auth';
import { cleanEnv, str } from 'envalid';

const parsedEnv = cleanEnv(process.env, {
  REACT_APP_AWS_REGION: str({ default: "ap-southeast-2" }),
  REACT_APP_COGNITO_IDENTITY_ID: str(),
  REACT_APP_COGNITO_USER_POOL_ID: str(),
  REACT_APP_COGNITO_WEB_CLIENT_ID: str(),
});
const awsAmplifyConfig = {
  Auth: {
    region: parsedEnv.REACT_APP_AWS_REGION,
    identityPoolId: parsedEnv.REACT_APP_COGNITO_IDENTITY_ID,
    userPoolId: parsedEnv.REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: parsedEnv.REACT_APP_COGNITO_WEB_CLIENT_ID,
  },
};
configureAmplify(awsAmplifyConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
