import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import Employer from "./Employer";

import PrivateRoute from "../hoc/PrivateRoute";
import { AuthContext } from "../contexts/AuthContext.js";

import axios from "axios";
import Jobseeker from "./Jobseeker";
import Search from "./Search";
import JobPage from "./JobPage";
import Navbar from "./Navbar";

function RootContainer() {
  const { auth } = React.useContext(AuthContext);

  console.log(auth.token);
  if (!!auth.email && !!auth.token) {
    // Add a request interceptor
    axios.interceptors.request.use(function (config) {
      config.headers.Authorization = auth.token;
      return config;
    });
  }

  return (
    <Router>
      <div className="global-container">
        <Navbar />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/search">
            <Search />
          </Route>

          <Route path="/job" exact render={() => <Redirect to="/search" />} />

          <Route path="/job/:slug">
            <JobPage />
          </Route>

          <Route path="/home" render={() => <Redirect to="/" />} />

          <PrivateRoute path="/register" component={Register} type="guest" />

          <PrivateRoute path="/login" component={Login} type="guest" />

          <PrivateRoute path="/employer" component={Employer} type="employer" />

          <PrivateRoute
            path="/jobseeker"
            component={Jobseeker}
            type="jobseeker"
          />
        </Switch>
      </div>
    </Router>
  );
}

export default RootContainer;
