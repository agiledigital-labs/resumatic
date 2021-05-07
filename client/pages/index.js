import React from "react";
import { Admin, Resource } from "react-admin";
import postgrestRestProvider from "@raphiniert/ra-data-postgrest";

import { PostList } from "./posts";

const App = () => (
  <Admin dataProvider={postgrestRestProvider("http://path.to.my.api/")}>
    <Resource name="posts" list={PostList} />
  </Admin>
);

export default App;
