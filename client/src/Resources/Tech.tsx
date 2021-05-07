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
export const TechList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="techname" />
    </Datagrid>
  </List>
);

// @ts-ignore YOLO
export const TechCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="techname" />
    </SimpleForm>
  </Create>
);

// @ts-ignore YOLO
export const TechEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="techname" />
    </SimpleForm>
  </Edit>
);
