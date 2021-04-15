import axios from "axios";
import React from "react";
import { apiPath } from "../utils/Consts";

export default () => {
  const [profile, setProfile] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [isAccountDeactivated, setIsAccountDeactivated] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(apiPath + "/employer/edit-profile")
      .then((response) => {
        if (response.data.resp === 1) {
          setProfile({
            ...response.data.user,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post(apiPath + "/check-if-employer-account-is-suspended")
      .then((response) => {
        if (response.data.resp === 1) {
          setIsAccountDeactivated(true);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleClick = () => {
    axios
      .post(apiPath + "/request-to-activate-employer-account")
      .then((response) => {
        if (response.data.resp === 1) {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div
      className="job-applied-wrapper table-responsive-md edit-profile-form-wrap container"
      id="edit-company-profile"
    >
      {loading ? (
        <div className="text-center  mt-5">
          <div className="spinner-grow" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <h6 className="mt-1">Loading... </h6>
        </div>
      ) : (
        <>
          <div className="form-group my-30">
            <p>
              Name: <span className="text-primary">{profile?.name} </span>
            </p>
          </div>

          <div className="form-group my-30">
            <p>
              Phone Number:{" "}
              <span className="text-primary">{profile?.phone} </span>
            </p>
          </div>

          <div className="form-group my-30">
            <p>
              Address: <span className="text-primary">{profile?.address} </span>
            </p>
          </div>

          <div className="form-group my-30">
            About company:
            {!profile?.description ? (
              " N/A"
            ) : (
              <p
                dangerouslySetInnerHTML={{ __html: profile?.description }}
                className="px-4"
              ></p>
            )}
          </div>

          {isAccountDeactivated && (
            <div className="form-group my-30">
              <p className="text-danger">
                Your account is deactivated. Jobs posted by you won't be visible in the website.
              </p>
              <button
                className="btn btn-warning text-white"
                onClick={handleClick}
              >
                Request to activate account
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
