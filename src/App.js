import React, {useState} from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { userState } from "./recoil/atoms";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { useRecoilValue } from "recoil";
import styled from 'styled-components'
import Login from "./components/login";
import Register from "./components/register";
import UserDash from "./components/userDash";
import IssueEdit from "./components/issueEdit";
import CreateIssue from "./components/createIssue";
import "./App.css";

const Header = styled.div`
  background-color: dimgray;
  div{
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    color: white;
    h1{
      font-size: 3rem;
    }
    nav{
      width: 30%;
      a{
        padding: 10%;
        text-decoration: none;
        justify-content: center;
      }
      a:visited{
        color: white;
      }
      a:link{
        color: white;
      }
    }
  }
`
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
  const [ issues, setIssues ] = useState(defaultIssueValues);

  const getIssues = data => [
    setIssues(data)
  ];

  return (
    <Router>
      <Header>
        <div>
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
      </Header>
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
};

export default App;
