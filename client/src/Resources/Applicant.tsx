import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  Create,
  DateInput,
  Edit,
  EditButton,
  ReferenceManyField,
  required,
  SimpleForm,
  TextInput,
} from 'react-admin';

// @ts-ignore YOLO
export const ApplicantList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="title" />
      <TextField source="name" />
      <TextField source="qualifications" />
      <TextField source="skills" />
      <TextField source="tech" />
    </Datagrid>
  </List>
);

// @ts-ignore YOLO
export const ApplicantCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="name" />
      <TextInput source="qualifications" />
      <TextInput source="skills" />
      <TextInput source="tech" />
    </SimpleForm>
  </Create>
);

// @ts-ignore YOLO
export const ApplicantEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="name" />
      <TextInput source="qualifications" />
      <TextInput source="skills" />
      <TextInput source="tech" />
    </SimpleForm>
  </Edit>
);
