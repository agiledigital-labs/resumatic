import { Admin, Resource, ListGuesser, fetchUtils, ShowGuesser, EditGuesser} from 'react-admin';
import postgrestRestProvider, {
} from '@raphiniert/ra-data-postgrest';
import { authProvider, LoginPage } from './authProvider';
import { authSagas, authState } from "amplify-redux-auth";
import Auth from '@aws-amplify/auth';

const httpClient = async (url: string, options: fetchUtils.Options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }

    const test = await Auth.currentAuthenticatedUser();
    const token = await test.getSignInUserSession().getIdToken().getJwtToken();

    // TODO: YOLO
    // @ts-ignore
    options.headers.set('Authorization', 'Bearer '+ token);
    return fetchUtils.fetchJson(url, options);
};
const dataProvider = postgrestRestProvider('https://j4m8i8hfw5.execute-api.ap-southeast-2.amazonaws.com', httpClient);

const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    customReducers={{ authState }}
    customSagas={[authSagas]}
    loginPage={LoginPage}
  >
    <Resource name="resume" list={ListGuesser} show={ShowGuesser} edit={EditGuesser} />
  </Admin>
);

export default App;
