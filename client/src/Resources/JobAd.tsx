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
export const JobAdList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="title" />
      <TextField source="company" />
      <TextField source="selectioncriteria" />
    </Datagrid>
  </List>
);

// @ts-ignore YOLO
export const JobAdCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="company" />
      <TextInput source="selectioncriteria" />
    </SimpleForm>
  </Create>
);

// @ts-ignore YOLO
export const JobAdEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="company" />
      <TextInput source="selectioncriteria" />
    </SimpleForm>
  </Edit>
);
