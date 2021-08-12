import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Chat from "routes/Chat";
import Home from "routes/Home";
import Login from "routes/Login";
import Profile from "routes/Profile";
import Kakaotalk from "routes/Kakaotalk";
import Naver from "routes/Naver";
import Navigation from "components/Navigation";
import SignUp from "routes/SignUp";

const Router = ({
  isLoggedin,
  setUserObj,
  userObj,
  mbtiArray,
  typeChoose,
  setTypeChoose,
}) => {
  return (
    <BrowserRouter>
      {isLoggedin ? (
        <>
          <Navigation
            isLoggedin={isLoggedin}
            setUserObj={setUserObj}
            setTypeChoose={setTypeChoose}
          />
          <Switch>
            <Route exact path="/">
              <Home mbtiArray={mbtiArray} />
            </Route>
            <Route path="/chat">
              <Chat userObj={userObj} typeChoose={typeChoose} />
            </Route>
            <Route path="/profile">
              <Profile
                userObj={userObj}
                setUserObj={setUserObj}
                typeChoose={typeChoose}
                setTypeChoose={setTypeChoose}
              />
            </Route>
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </>
      ) : (
        <>
          <Navigation isLoggedin={isLoggedin} />
          <Switch>
            <Route exact path="/">
              <Home mbtiArray={mbtiArray} />
            </Route>
            <Route path="/chat" component={Chat} />
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/login/signup">
              <SignUp />
            </Route>
            <Route exact path="/callback/kakaotalk">
              <Kakaotalk />
            </Route>
            <Route exact path="/callback/naver">
              <Naver />
            </Route>
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </>
      )}
    </BrowserRouter>
  );
};

export default Router;
