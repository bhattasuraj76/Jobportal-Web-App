import React, { Component } from "react";
import { printError, removeError, validatePostNewJob } from "../utils/Helpers";
import Modal from "../widgets/Modal";
import ErrorMessage from "../components/ErrorMessage";
import {
  apiPath,
  DEFAULT_JOB_CATEGORIES,
  DEFAULT_JOB_LEVELS,
  DEFAULT_JOB_LOCATIONS,
  DEFAULT_JOB_TYPES,
} from "../utils/Consts";
import Editor from "../widgets/Editor";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

class EditSingleJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      id: null,
      category: null,
      type: null,
      level: null,
      title: null,
      location: null,
      experience: null,
      qualification: null,
      description: null,
      salary: null,
      expiry_date: null,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ ...this.props.job });
  }

  setError = (message) => {
    this.setState({
      error: message,
    });
    window.setTimeout(() => {
      this.setState({
        error: null,
      });
    }, 3000);
  };

  handleSubmit = () => {
    removeError();

    axios
      .post(apiPath + "/employer/update-job/" + this.state.id, {
        ...this.state,
        expiry_date: moment(this.state.expiry_date).format("YYYY-MM-DD"),
      })
      .then((response) => {
        if (response.data.resp === 1) {
          this.props.updateJobs(response.data.jobs);
          //show success message
          alert("Successfuly updated job");
          this.setState({ isModalOpen: false });
        } else {
          alert("Request Failed");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 422) {
          alert("Please correct highlighted erros");
          printError(error.response.data);
        }
      });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    const errMsg = e.target.nextSibling || null;
    if (errMsg && errMsg.classList.contains("is-invalid")) {
      errMsg.remove();
    }
  };

  updateDescription = (value) => {
    this.setState({ description: value });
  };

  toggleModal = (e) => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  render() {
    const {
      category,
      type,
      level,
      title,
      location,
      experience,
      qualification,
      description,
      salary,
      expiry_date,
    } = this.state;

    return (
      <React.Fragment>
        <button
          className="btn btn-primary btn-xs"
          onClick={this.toggleModal}
          data-target={this.props.divId}
        >
          <i
            className="fas fa-edit text-white"
            data-toggle="tooltip"
            title="Edit job"
          ></i>
        </button>

        <Modal
          show={this.state.isModalOpen}
          onClose={this.toggleModal}
          divId={this.props.divId}
        >
          <div
            className="job-applied-wrapper table-responsive-sm"
            id="view-applicants"
          >
            <div className="job-applied-body">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (validatePostNewJob(this.state, this.setError)) {
                    this.handleSubmit();
                  }
                }}
                id="newjob-form"
              >
                {this.state.error && (
                  <ErrorMessage errorMessage={this.state.error} />
                )}

                <div className="form-group my-30">
                  <select
                    className="form-control"
                    name="category"
                    onChange={this.onChange}
                  >
                    <option value="">Select Job Category</option>

                    {DEFAULT_JOB_CATEGORIES.map((item, index) => (
                      <option
                        value={item.value}
                        key={index}
                        selected={category === item.value ? true : false}
                      >
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group my-30">
                  <select
                    name="type"
                    className="form-control"
                    onChange={this.onChange}
                  >
                    <option value="">Select Job Type</option>

                    {DEFAULT_JOB_TYPES.map((item, index) => (
                      <option
                        value={item.value}
                        key={index}
                        selected={type === item.value ? true : false}
                      >
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group my-30">
                  <select
                    name="level"
                    className="form-control"
                    onChange={this.onChange}
                  >
                    <option value="">Select Job Level</option>

                    {DEFAULT_JOB_LEVELS.map((item, index) => (
                      <option
                        value={item.value}
                        key={index}
                        selected={level === item.value ? true : false}
                      >
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group my-30">
                  <select
                    className="form-control"
                    name="location"
                    onChange={this.onChange}
                  >
                    <option value="">Select Location</option>

                    {DEFAULT_JOB_LOCATIONS.map((item, index) => (
                      <option
                        value={item.value}
                        key={index}
                        selected={location === item.value ? true : false}
                      >
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group my-30">
                  <input
                    type="text"
                    name="title"
                    placeholder="Job Title e.g Web Developer"
                    className="form-control  p-3"
                    onChange={this.onChange}
                    value={title || ""}
                  />
                </div>

                <div className="form-group my-30">
                  <input
                    type="text"
                    name="experience"
                    placeholder="Experience e.g 1-2 years"
                    className="form-control  p-3"
                    onChange={this.onChange}
                    value={experience || ""}
                  />
                </div>

                <div className="form-group my-30">
                  <input
                    type="text"
                    name="qualification"
                    placeholder="Education qualification e.g Bachelors in IT"
                    className="form-control  p-3"
                    onChange={this.onChange}
                    value={qualification || ""}
                  />
                </div>

                <div className="form-group my-30">
                  <Editor
                    placeholder="Describe job here....."
                    handleChange={this.updateDescription}
                    editorHtml={description || ""}
                  />
                </div>

                <div className="form-group my-30">
                  <input
                    type="number"
                    name="salary"
                    placeholder="Salary (NPR) e.g 40000"
                    className="form-control p-3"
                    onChange={this.onChange}
                    min="1"
                    value={salary || ""}
                  />
                </div>

                <div className="form-group my-30">
                  {/* <input
                    type="text"
                    name="expiry_date"
                    placeholder="Expiry date (Y-m-d) e.g 2020-12-12"
                    className="form-control p-3"
                    onChange={this.onChange}
                    value={expiry_date || ""}
                  /> */}

                  <DatePicker
                    selected={new Date(expiry_date) || null}
                    onChange={(date) => this.setState({ expiry_date: date })}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Expiry date "
                    minDate={moment().toDate()}
                  />
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="post-job-btn b-0 px-3 primary"
                  >
                    Update job
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default EditSingleJob;
