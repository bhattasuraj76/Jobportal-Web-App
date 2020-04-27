import * as React from "react";
import axios from "axios";
import BannerSearch from "./BannerSearch";
import CompnayLogo from "../images/company-logo.png";
import {
  DEFAULT_JOB_LEVELS,
  DEFAULT_JOB_CATEGORIES,
  DEFAULT_JOB_TYPES,
  apiPath,
} from "../utils/Consts";
import { Link, withRouter } from "react-router-dom";
import Loader from "./Loader";
import CheckboxInput from "./CheckboxInput";
import queryString from "query-string";

export default withRouter((props) => {
  const [jobs, setJobs] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [jobs_count, setJobsCount] = React.useState("0");
  const [keyword, setKeyword] = React.useState("");
  const onChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  
 

  React.useEffect(() => {
    const values = queryString.parse(props.location.search);
    setKeyword(values.keyword);
     axios
       .get(`${apiPath}/search?keyword=${values.keyword}`)
       .then((response) => {
         if (response.data.resp === 1) {
           console.log(response);
           setJobs(response.data.jobs);
           setJobsCount(response.data.jobs.length);
           setIsLoading(false);
         } else {
           console.log(response);
         }
       })
       .catch((error) => {
         console.log(error);
       });

  }, []);

  const resetFilter = (e) => {
    e.preventDefault();
    document.getElementById("searchPageForm").reset();
    filterJobs();
  };

  const filterJobs = () => {
    let formData = new FormData(document.getElementById("searchPageForm"));
    formData.append("keyword", keyword);

    axios
      .post(apiPath + "/search", formData)
      .then((response) => {
        if (response.data.resp === 1) {
          console.log(response);
          setJobs(response.data.jobs);
          setJobsCount(response.data.jobs.length);
          setIsLoading(false);
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="search-page">
      <BannerSearch
        keyword={keyword}
        onChangeKeyword={onChangeKeyword}
        onBannerFormSubmit={filterJobs}
      />
      <div className="Container">
        <form action="" id="searchPageForm">
          <div className="row my-5 mx-0">
            <div className="col-md-4">
              <div className="filter-wrapper">
                <div className="card p-0 m-0">
                  <div className="card-body p-3" id="refine_search_header">
                    <div className="row card-title mb-0">
                      <div className="col-9">
                        <span className="icon-search mr-1"></span>
                        <strong>Refine Your Job Search</strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="filter-box  border-top-0">
                  <div id="div_id_job_category">
                    <div className="card-title mb-1">Job Category</div>
                    <div className="card-body p-0">
                      {DEFAULT_JOB_CATEGORIES.map((item, index) => (
                        <CheckboxInput
                          item={item}
                          key={index}
                          name="category[]"
                          onChange={filterJobs}
                        />
                      ))}
                    </div>
                  </div>
                  <hr />
                  <div id="div_id_job_type">
                    <div className="card-title mb-1">Employment Type</div>
                    <div className="card-body p-0">
                      {DEFAULT_JOB_TYPES.map((item, index) => (
                        <CheckboxInput
                          item={item}
                          key={index}
                          name="type[]"
                          onChange={filterJobs}
                        />
                      ))}
                    </div>
                  </div>
                  <hr />

                  <div id="div_id_job_level">
                    <div className="card-title mb-1">Job Level</div>
                    <div className="card-body p-0">
                      {DEFAULT_JOB_LEVELS.map((item, index) => (
                        <CheckboxInput
                          item={item}
                          key={index}
                          name="level[]"
                          onChange={filterJobs}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="search-results">
                {isLoading && <Loader />}

                {!isLoading && (
                  <div className="offset-md-1 col-md-11">
                    <div className="results-count-reset-wrapper mt-md-0 mt-3 mb-5">
                      <div className="card">
                        <div className="card-body row p-3">
                          <div className="col-6">
                            <h3 className="h6" id="job-count">
                              {jobs_count} jobs found
                            </h3>
                          </div>
                          <div className="col-6 text-right reset-filter">
                            <a
                              href="#v"
                              className="text-secondary"
                              onClick={resetFilter}
                            >
                              <span className="icon-reset mr-1"></span>
                              Reset Filter
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {jobs.map((job, index) => {
                      return (
                        <div key={index}>
                          <div className="job-box">
                            <div className="job-box-body">
                              <div className="row text-md-center">
                                <div className="col-md-3 ">
                                  <div className="job-logo m-auto">
                                    <img src={CompnayLogo} alt="Company Logo" />
                                  </div>
                                </div>
                                <div className="col-md-9">
                                  <div className="job-info text-center text-sm-left clearfix">
                                    <h4 className="text-uppercase">
                                      <Link
                                        to={`/job/${job.slug}`}
                                        className="job-title"
                                      >
                                        {job.title}
                                      </Link>
                                    </h4>
                                    <h6>{job.employer.name}</h6>
                                    <ul>
                                      <li>
                                        <span className="icon-cash mr-3"></span>
                                        {job.salary}
                                      </li>
                                      <li>
                                        <span className="icon-address mr-3"></span>
                                        {job.employer.address}
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="job-box-footer text-center text-sm-right mt-1">
                              <small>
                                <span className="deadline-title">Deadline</span>{" "}
                                :{job.expiry_day} days form now
                              </small>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});
