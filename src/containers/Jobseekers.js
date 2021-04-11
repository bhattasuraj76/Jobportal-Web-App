import React, { Component } from "react";
import axios from "axios";
import Loader from "./Loader";
import { apiPath } from "../utils/Consts";

class Jobseekers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobseekers: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    if (this.state.isLoading) {
      axios
        .get(apiPath + "/admin/jobseekers")
        .then((response) => {
          if (response.data.resp === 1) {
            this.setState({
              jobseekers: response.data.jobseekers,
              isLoading: false,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  //api
  ///jobseeker/{jobApplicantId}/change-status

  render() {
    return (
      <div
        className="job-applied-wrapper table-responsive-md"
        id="view-job-applicant"
      >
        {this.state.isLoading && <Loader />}

        {!this.state.isLoading && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>S.N</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.jobseekers.length ? (
                this.state.jobseekers.map((item, index) => {
                  return (
                    <tr key={index++}>
                      <td>{index}</td>
                      <td>{`${item.first_name}  ${item.last_name}`}</td>
                      <td>{item.email}</td>
                      <td>
                        {item.status === "active" ? (
                          <button
                            className="btn btn-info btn-md"
                            data-toggle="tooltip"
                            title="Click to Suspend"
                            onClick={() => console.log("Suspend")}
                          >
                            Active
                          </button>
                        ) : (
                          <button
                            className="btn btn-warning btn-md"
                            data-toggle="tooltip"
                            title="Click to Active"
                            onClick={() => console.log("Active")}
                          >
                            Suspended
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5">No Jobseekers yet</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default Jobseekers;
