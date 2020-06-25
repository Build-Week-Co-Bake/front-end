import React, {useState} from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from 'styled-components'
import { userState } from "./recoil/atoms";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import Login from "./components/login";
import Register from "./components/register";
import UserDash from "./components/userDash";
import IssueEdit from "./components/issueEdit";
import CreateIssue from "./components/createIssue";
import "./App.css";

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

const Header = styled.div`
  background-color: black;
  div{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    color: white;
    @media(max-width:500px){
      justify-content: center;
    }
    h1{
      font-size: 3rem;
      padding: 1%;
      
    }
    nav{
      width: 40%;
      display: flex;
      justify-content: end;
      flex-direction: row;

      @media(max-width:500px){
          width: 100%;
          justify-content: center;
        }
      a{
        display: flex;
        align-content: center;
        padding: 10%;
        text-decoration: none;
      }
      a:visited{
        color: white;
      }
      a:link{
        color: white;
      }
      a:hover{
        color: black;
        background-color: white;
      }
    }
  }
`