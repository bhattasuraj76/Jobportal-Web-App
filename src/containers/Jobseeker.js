import React, { Component } from "react";
import { Route, NavLink, Switch, withRouter } from "react-router-dom";
import axios from "axios";
import ViewAppliedJobs from "./ViewAppliedJobs";
import EditJobseekerProfile from "./EditJobseekerProfile";
import ChangePassword from "./ChangePassword";
import JobseekerProfile from "../images/jobseeker-profile.png";
import { ProfileImg } from "../components/Styles";
import { apiPath } from "../utils/Consts";
import { confirmDelete } from "../utils/Helpers";
import ViewJobSeekerProfile from "./ViewJobSeekerProfile";

class Jobseeker extends Component {
  state = {
    profile: "",
    jobs: [],
  };

  changeProfile = (profile) => {
    this.setState({
      profile,
    });
  };

  componentDidMount() {
    axios
      .get(apiPath + "/jobseeker")
      .then((response) => {
        if (response.data.resp === 1) {
          this.setState({
            ...response.data.result,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteJob = (id) => {
    let confirm = confirmDelete();
    if (confirm) {
      axios
        .post(`${apiPath}/remove-from-applied-jobs/${id}`)
        .then((response) => {
          if (response.data.resp === 1) {
            //update state
            let jobs = this.state.jobs.filter((item) => item.id !== id);

            this.setState({
              jobs: jobs,
            });
            //throw alert
            alert("Successfully Removed");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <section className="company-content-wrapper ">
        <div className="Container">
          <div className="row no-gutters justify-content-between">
            <div className="col-lg-3">
              <div className="profile-pic" id="profilePic">
                <ProfileImg
                  src={
                    this.state.profile ? this.state.profile : JobseekerProfile
                  }
                ></ProfileImg>
              </div>

              <div className="jobseeker-nav">
                <div className="jobseeker-nav-pill">
                  <NavLink to={`${this.props.match.url}`} exact>
                    View Profile
                  </NavLink>
                </div>
                <div className="jobseeker-nav-pill">
                  <NavLink to={`${this.props.match.url}/edit-profile`}>
                    Edit profile
                  </NavLink>
                </div>
                <div className="jobseeker-nav-pill">
                  <NavLink
                    to={`${this.props.match.url}/view-applied-jobs`}
                    exact
                  >
                    View applied jobs
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <Switch>
                <Route path={`${this.props.match.path}`} exact>
                  <ViewJobSeekerProfile profile={this.state.profile} />
                </Route>

                <Route path={`${this.props.match.path}/view-applied-jobs`}>
                  <ViewAppliedJobs
                    jobs={this.state.jobs}
                    deleteJob={this.deleteJob}
                  />
                </Route>

                <Route path={`${this.props.match.path}/edit-profile`}>
                  <EditJobseekerProfile changeProfile={this.changeProfile} />
                </Route>

                <Route path={`${this.props.match.path}/change-password`}>
                  <ChangePassword />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Jobseeker);
