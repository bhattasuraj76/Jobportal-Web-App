import * as React from "react";
import { Link, withRouter } from "react-router-dom";
import { apiPath } from "../utils/Consts";
import SignupHeader from "./SignupHeader";
/** Presentation */
import ErrorMessage from "../components/ErrorMessage";
/** Custom Hooks */
import useErrorHandler from "../utils/custom-hooks/ErrorHandler";
/** Context */
import { AuthContext } from "../contexts/AuthContext";
/** Utils */
import { apiRequest, validateLoginForm, printError, removeError } from "../utils/Helpers";


const Login = (props) => {
  const authContext = React.useContext(AuthContext);

  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [userEntity, setUserEntity] = React.useState("jobseeker");
  const [loading, setLoading] = React.useState(false);
  const {error, showError } = useErrorHandler(null);
  const isUserEntityJobseeker = userEntity === "jobseeker" ? true : false;

  const authHandler = async () => {

    try {
      setLoading(true);
      removeError();

      const data = await apiRequest(apiPath + "/login", "post", {
        email: userEmail,
        password: userPassword,
        entity: userEntity,
      });
      console.log(data);

      if (data.resp === 1) {
        const {email, entity, token } = data.user;
        authContext.setAuthStatus({email, entity ,token });
      } else if (data.resp === 0) {
        showError(data.message);
        setLoading(false);
      }else{
         printError(data);
         setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      showError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="content-wrapper border mt-5">
        <SignupHeader
          action="Login"
          isUserEntityJobseeker={isUserEntityJobseeker}
          setUserEntity={setUserEntity}
        />

        <div className="login-form">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (validateLoginForm(userEmail, userPassword, showError)) {
                authHandler();
              }
            }}
          >
            {error && <ErrorMessage errorMessage={error} />}

            <div className="form-group my-30">
              <input
                type="email"
                placeholder="Email Address"
                className="form-control p-4"
                name="email"
                onChange={(e) => setUserEmail(e.target.value)}
                value={userEmail}
              />
            </div>
            <div className="form-group my-30">
              <input
                type="password"
                placeholder="Password"
                className="form-control  p-4"
                name="password"
                onChange={(e) => setUserPassword(e.target.value)}
                value={userPassword}
              />
            </div>

            <div className="form-submit text-center mt-30 mb-3">
              <button
                className="primary submit"
                disabled={loading}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
            <div className="here text-center">
              Don't have an account? Register{" "}
              <Link to="/register">
                <u> here</u>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
