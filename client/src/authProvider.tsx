import { AuthProvider, useRedirect } from 'react-admin';
import Auth from '@aws-amplify/auth';
import AmplifyReduxAuth from 'amplify-redux-auth';
import { useEffect } from 'react';

export const authProvider: AuthProvider = {
  login: async () => undefined,
  logout: async () => Auth.signOut(),
  checkAuth: async () => Auth.currentAuthenticatedUser(),
  checkError: async () => undefined,
  getPermissions: async () => Auth.currentAuthenticatedUser(),
};

function LoginDone() {
  const redirect = useRedirect();

  useEffect(() => {
    const foo = async () => {
      const sesh = await Auth.currentSession()
      if (sesh !== undefined) {
        redirect("/")
      }
    }
    // Old dangly boi promise
    foo();
  },
  // array of variables that can trigger an update if they change. Pass an
  // an empty array if you just want to run it once after component mounted.
  [redirect])

  return <div></div>
}

export const LoginPage = () => (
  <AmplifyReduxAuth logoText={'My Logo'} >
    <LoginDone></LoginDone>
  </AmplifyReduxAuth>
);
