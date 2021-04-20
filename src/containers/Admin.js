import React, { Component } from "react";
import { Route, NavLink, Switch, withRouter } from "react-router-dom";
import { apiPath } from "../utils/Consts";
import axios from "axios";
import AdminLanding from "./AdminLanding";
import Jobseekers from "./Jobseekers";
import Employers from "./Employers";
import ChangePassword from "./ChangePassword";

class Employer extends Component {
  state = {
    total_jobseekers: 0,
    total_employers: 0,
    req_activate_jobseekers: 0,
    req_activate_employers: 0,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get(apiPath + "/admin")
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
  };

  render() {
    return (
      <div>
        <section className="company-content-wrapper ">
          <div className="Container">
            <div className="row no-gutters justify-content-between">
              <div className="col-lg-3">
                <div className="profile-pic" id="profilePic">
                  <div className="jobseeker-nav-pill">
                    <NavLink to={`${this.props.match.url}`} exact>
                      Dashboard
                    </NavLink>
                  </div>
                  <div className="jobseeker-nav-pill">
                    <NavLink to={`${this.props.match.url}/jobseekers`}>
                      JobSeekers
                    </NavLink>
                  </div>
                  <div className="jobseeker-nav-pill">
                    <NavLink to={`${this.props.match.url}/employers`}>
                      Employers
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <Switch>
                  <Route path={`${this.props.match.path}`} exact>
                    <AdminLanding
                      totalEmployers={this.state.total_jobseekers}
                      totalJobseekers={this.state.total_employers}
                      requestActivateEmployers={
                        this.state.req_activate_employers
                      }
                      requestActivateJobseekers={
                        this.state.req_activate_jobseekers
                      }
                      fetchData={this.fetchData}
                    />
                  </Route>
                  <Route path={`${this.props.match.path}/jobseekers`}>
                    <Jobseekers />
                  </Route>
                  <Route path={`${this.props.match.path}/employers`}>
                    <Employers />
                  </Route>
                  <Route path={`${this.props.match.path}/change-password`}>
                    <ChangePassword />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(Employer);
