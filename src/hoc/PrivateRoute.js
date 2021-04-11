// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
/** Context */
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = (props) => {
  const { auth } = useContext(AuthContext);
  const { entity } = auth;
  console.log(entity);

  switch (props.type) {
    case "guest":
      if (entity === "admin") {
        return <Redirect to="/admin" />;
      } else if (entity === "jobseeker") {
        return <Redirect to="/jobseeker" />;
      } else if (entity === "employer") {
        return <Redirect to="/employer" />;
      }
      break;
    case "employer":
      if (entity === "admin") {
        return <Redirect to="/admin" />;
      } else if (entity === "jobseeker") {
        return <Redirect to="/jobseeker" />;
      } else if (entity === "guest") {
        return <Redirect to="/login" />;
      }
      break;
    case "jobseeker":
      if (entity === "admin") {
        return <Redirect to="/admin" />;
      }
      else if (entity === "employer") {
        return <Redirect to="/jobseeker" />;
      } else if (entity === "guest") {
        return <Redirect to="/login" />;
      }
      break;
    case "admin":
      if (entity === "jobseeker") {
        return <Redirect to="/jobseeker" />;
      } else if (entity === "employer") {
        return <Redirect to="/employer" />;
      } else if (entity === "guest") {
        return <Redirect to="/admin-login" />;
      }
      break;
    default:
  }

  return <Route {...props} />;

};

export default PrivateRoute;
