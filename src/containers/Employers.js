import React, { Component } from "react";
import axios from "axios";
import Loader from "./Loader";
import { apiPath } from "../utils/Consts";

class Employers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employers: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    if (this.state.isLoading) {
      axios
        .get(apiPath + "/admin/employers")
        .then((response) => {
          if (response.data.resp === 1) {
            this.setState({
              employers: response.data.employers,
              isLoading: false,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleSatusChange(employer) {
    axios
      .post(`${apiPath}/admin/employer/${employer.id}/change-status`)
      .then((response) => {
        if (response.data.resp === 1) {
          let tempEmployers = this.state.employers.map((item) => {
            return item.id === employer.id
              ? {
                  ...item,
                  status: item.status === "active" ? "suspended" : "active",
                }
              : item;
          });
          this.setState({
            employers: tempEmployers,
            isLoading: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
              {this.state.employers.length ? (
                this.state.employers.map((item, index) => {
                  return (
                    <tr key={index++}>
                      <td>{index}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>
                        {item.status === "active" ? (
                          <button
                            className="btn btn-info btn-md"
                            data-toggle="tooltip"
                            title="Click to Suspend"
                            onClick={() => this.handleSatusChange(item)}
                          >
                            Active
                          </button>
                        ) : (
                          <>
                            <button
                              className="btn btn-warning btn-md"
                              data-toggle="tooltip"
                              title="Click to Active"
                              onClick={() => this.handleSatusChange(item)}
                            >
                              Suspended
                            </button>
                            <br />
                            {item.request_to_activate ? (
                              <p className="text-info">
                                User has requested to activate his/her account.
                              </p>
                            ) : null}
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5">No Employers yet</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default Employers;
