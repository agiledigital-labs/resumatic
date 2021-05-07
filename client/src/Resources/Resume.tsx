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
export const ResumeList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="name" />
      <TextField source="title" />
      <TextField source="location" />
      <TextField source="email" />
      <TextField source="phone" />
      <TextField source="profile" />
    </Datagrid>
  </List>
);

// @ts-ignore YOLO
export const ResumeCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="title" />
      <TextInput source="location" />
      <TextInput source="email" />
      <TextInput source="phone" />
      <TextInput source="profile" />
    </SimpleForm>
  </Create>
);

// @ts-ignore YOLO
export const ResumeEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="title" />
      <TextInput source="location" />
      <TextInput source="email" />
      <TextInput source="phone" />
      <TextInput source="profile" />
    </SimpleForm>
  </Edit>
);
