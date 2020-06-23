import React, {useState} from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import UserDash from "./components/userDash";
import IssueEdit from "./components/issueEdit";
import CreateIssue from "./components/createIssue"
import { ProtectedRoute } from "./utils/ProtectedRoute";
import "./App.css";
import { useRecoilValue } from "recoil";
import { userState } from "./recoil/atoms";


const defaultIssueValues = [
{
  id: "",
  userId: "",
  title: "",
  city: "",
  hoa: "",
  description: "",
  photo: [""],
  upvotes: "",
  createdAt: "",
}];
const editButtonState = false;
// const loggedIn = true;
function App() {
  const loggedIn = useRecoilValue(userState).loggedIn;
  const [ issues, setIssues ] = useState(defaultIssueValues)

  const getIssues = data => [
    setIssues(data)
  ]

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
          <NavLink style={loggedIn ? {} : { display: "none" }} to="/createIssue">
            Post New Issue
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
        <UserDash editButtonState={editButtonState} issues={issues} getIssues={getIssues}/>
      </ProtectedRoute>
      <ProtectedRoute path={"/createIssue"}>
        <CreateIssue />
      </ProtectedRoute>
      <ProtectedRoute path={"/issueEdit/:id"}>
        <IssueEdit />
      </ProtectedRoute>
    </Router>
  );
}

export default App;
