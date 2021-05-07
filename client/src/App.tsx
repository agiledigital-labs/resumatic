import { Admin, Resource, ListGuesser, fetchUtils} from 'react-admin';
import postgrestRestProvider, {
} from '@raphiniert/ra-data-postgrest';

const jwt = "PUT JWT FROM SLACK HERE";
const httpClient = (url: string, options: fetchUtils.Options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    // TODO: YOLO
    // @ts-ignore
    options.headers.set('Authorization', 'Bearer '+ jwt);
    return fetchUtils.fetchJson(url, options);
};
const dataProvider = postgrestRestProvider('https://j4m8i8hfw5.execute-api.ap-southeast-2.amazonaws.com', httpClient);

const App = () => (
  <Admin
    dataProvider={dataProvider}
  >
    <Resource name="jobs" list={ListGuesser} />
  </Admin>
);

export default App;
