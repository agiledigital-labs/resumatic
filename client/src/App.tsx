import {
  Admin,
  Resource,
  ListGuesser,
  fetchUtils,
  ShowGuesser,
  EditGuesser,
} from 'react-admin';
import postgrestRestProvider from '@raphiniert/ra-data-postgrest';
import { authProvider, LoginPage } from './authProvider';
import { authSagas, authState } from 'amplify-redux-auth';
import Auth from '@aws-amplify/auth';
import { JobAdCreate, JobAdEdit, JobAdList } from './Resources/JobAd';
import { TechCreate, TechEdit, TechList } from './Resources/Tech';
import {
  ExperienceCreate,
  ExperienceEdit,
  ExperienceList,
} from './Resources/Experience';
import { ApplicantList } from './Resources/Applicant';
import { ResumeCreate, ResumeEdit, ResumeList } from './Resources/Resume';

// @ts-ignore yolo
import { Route } from 'react-router';
import { Dashboard } from './CustomRoutes/Generator';

const httpClient = async (url: string, options: fetchUtils.Options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }

  const test = await Auth.currentAuthenticatedUser();
  const token = await test.getSignInUserSession().getIdToken().getJwtToken();

  // TODO: YOLO
  // @ts-ignore
  options.headers.set('Authorization', 'Bearer ' + token);
  return fetchUtils.fetchJson(url, options);
};
const dataProvider = postgrestRestProvider(
  'https://api.resumatic.dloc.xyz',
  httpClient
);

const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    customReducers={{ authState }}
    customSagas={[authSagas]}
    loginPage={LoginPage}
    dashboard={Dashboard}
  >
    <Resource
      name="jobad"
      list={JobAdList}
      create={JobAdCreate}
      edit={JobAdEdit}
      options={{ label: 'Job Ads' }}
    />
    <Resource
      name="tech"
      list={TechList}
      create={TechCreate}
      edit={TechEdit}
      options={{ label: 'Tech Tags' }}
    />
    <Resource
      name="experience"
      list={ExperienceList}
      create={ExperienceCreate}
      edit={ExperienceEdit}
      options={{ label: 'Experience' }}
    />
    <Resource
      name="applicant"
      list={ApplicantList}
      create={ExperienceCreate}
      edit={ExperienceEdit}
      options={{ label: 'Applicants' }}
    />
    <Resource
      name="resume"
      list={ResumeList}
      create={ResumeCreate}
      edit={ResumeEdit}
      options={{ label: 'Resumes' }}
    />
    <Resource name="experiencetechlink" />
    <Resource name="experienceresumelink" />
    <Resource name="resumetechlink" />
    <Resource name="jobadtechlink" />
    <Resource name="resumejobadlink" />
  </Admin>
);

export default App;
