import React, { Component } from "react";
import axios from "axios";
import SingleJob from "./ViewSingleJob";
import { confirmDelete } from "../utils/Helpers";
import { apiPath } from "../utils/Consts";
import Loader from "./Loader";
import EditSingleJob from "./EditSingleJob";

class ViewJobPosted extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    if (this.state.isLoading) {

      axios
        .get(apiPath + "/employer/view-posted-jobs")
        .then((response) => {
          if (response.data.resp === 1) {
            console.log(response);
            this.setState({ jobs: response.data.jobs, isLoading: false });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  deleteJob = (id) => {
    let confirm = confirmDelete();
    if(confirm){

    axios
      .delete(`${apiPath}/employer/delete-job/${id}`)
      .then((response) => {
        if (response.data.resp === 1) {
          //update state
          let jobs = this.state.jobs.filter((item) => item.id !== id);

          this.setState({
            jobs: jobs,
          });
          //throw alert
          alert("Successfully Deleted");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }

  }

  updateJobs = jobs => {
    this.setState({jobs});
  }

  render() {
    return (
      <div
        className="job-applied-wrapper table-responsive-md"
        id="view-job-posted"
      >
        {this.state.isLoading && (
          <Loader />
        )}

        {!this.state.isLoading && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>S.N</th>
                <th>Job Title</th>
                <th>Category</th>
                <th>Expiry Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.jobs.length ? (
                this.state.jobs.map((item, index) => {
                  return (
                    <tr key={index++}>
                      <th>{index}</th>
                      <td>{item.title}</td>
                      <td>{item.category}</td>
                      <td>{item.expiry_date}</td>
                      <td>
                        <SingleJob divId={`singlejob${index}`} job={item} />
                        {"  "}
                        <EditSingleJob
                          divId={`editsinglejob${index}`}
                          job={item}
                          updateJobs={this.updateJobs}
                        />
                        {"  "}
                        <a
                          href="#deletejob"
                          className="btn btn-danger btn-xs"
                          data-toggle="tooltip"
                          title="Remove Job"
                          onClick={(e) => {
                            e.preventDefault();
                            this.deleteJob(item.id);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </a>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5">No jobs posted yet</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default ViewJobPosted;
