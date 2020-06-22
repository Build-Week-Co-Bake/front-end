import React from "react";

import "./App.css";
import { User } from "./User";
import { DisplayUser } from "./DisplayUser";
function App() {
  return (
    <div className="App">
      <h1>Co-Make</h1>
      <User />
      <DisplayUser />
    </div>
  );
}

export default App;
