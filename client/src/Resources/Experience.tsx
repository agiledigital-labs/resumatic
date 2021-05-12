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
  ReferenceField,
  ReferenceInput,
} from 'react-admin';

// @ts-ignore YOLO
export const ExperienceList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="title" />
      <TextField source="project" />
      <TextField source="responsibilities" />
      <DateField source="startdate" />
      <DateField source="enddate" />
      <ReferenceField
        label="Applicant"
        source="applicantid"
        reference="applicant"
      >
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
);

// @ts-ignore YOLO
export const ExperienceCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="project" />
      <TextInput source="responsibilities" />
      <DateInput source="startdate" />
      <DateInput source="enddate" />
      <ReferenceInput
        label="Applicant"
        source="applicantid"
        reference="applicant"
      >
        <TextField source="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

// @ts-ignore YOLO
export const ExperienceEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="project" />
      <TextInput source="responsibilities" />
      <DateInput source="startdate" />
      <DateInput source="enddate" />
      <ReferenceInput
        label="Applicant"
        source="applicantid"
        reference="applicant"
      >
        <TextField source="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
