import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import postgrestRestProvider, {
  authProvider,
} from '@raphiniert/ra-data-postgrest';

const App = () => (
  <Admin
    dataProvider={postgrestRestProvider(
      'https://j4m8i8hfw5.execute-api.ap-southeast-2.amazonaws.com'
    )}
    authProvider={authProvider}
  >
    <Resource name="listings" list={ListGuesser} />
  </Admin>
);

export default App;
