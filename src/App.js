import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import UserDash from "./components/userDash";
import IssueEdit from "./components/issueEdit";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import "./App.css";
import { useRecoilValue } from "recoil";
import { userState } from "./recoil/atoms";

const dummyIssues = [
  {
    id: "0",
    userId: "1",
    title: "Pothole on Whatever and Thing",
    city: "Cincinnati",
    hoa: "",
    description: "I found a pothole on Whatever Avenue and Thing Place",
    photo: [
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    ],
    upvotes: "2",
    createdAt: "6/22/2020",
  },
  {
    id: "1",
    userId: "1",
    title: "Pothole on Main and Percy",
    city: "Cincinnati",
    hoa: "",
    description: "I found a pothole on Main and Percy Street",
    photo: [
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    ],
    upvotes: "3",
    createdAt: "6/21/2020",
  },
];
const defaultIssueValues = {
  id: "",
  userId: "",
  title: "",
  city: "",
  hoa: "",
  description: "",
  photo: [""],
  upvotes: "",
  createdAt: "",
};
const editButtonState = false;
// const loggedIn = true;
function App() {
  const loggedIn = useRecoilValue(userState).loggedIn;
  return (
    <Router>
      <div className="App">
        <h1>Co-Make</h1>
        <nav>
          <NavLink style={!loggedIn ? {} : { display: "none" }} to="/login">
            Login
          </NavLink>
          <NavLink style={!loggedIn ? {} : { display: "none" }} to="/register">
            Register
          </NavLink>
          <NavLink style={loggedIn ? {} : { display: "none" }} to="/userDash">
            Dashboard
          </NavLink>
        </nav>
      </div>
      <Route path={"/login"}>
        <Login />
      </Route>
      <Route path={"/register"}>
        <Register />
      </Route>
      <ProtectedRoute path={"/userDash"}>
        <UserDash editButtonState={editButtonState} issueData={dummyIssues} />
      </ProtectedRoute>
      <ProtectedRoute path={"/issueEdit/:id"}>
        <IssueEdit />
      </ProtectedRoute>
    </Router>
  );
}

export default App;
