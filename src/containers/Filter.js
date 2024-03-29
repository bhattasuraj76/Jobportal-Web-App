import React from "react";
import {
  DEFAULT_JOB_LEVELS,
  DEFAULT_JOB_CATEGORIES,
  DEFAULT_JOB_TYPES,
  DEFAULT_JOB_LOCATIONS,
  DEFAULT_SALARY_RANGES,
} from "../utils/Consts";
import CheckboxInput from "./CheckboxInput";
import queryString from "query-string";
import RadioBoxInput from "./RadioBoxInput";

export default ({ filterJobs, ...props }) => {
  React.useEffect(() => {
  const values = queryString.parse(props.location.search);
  const keyword = values.keyword || " ";
      document.getElementById("keyword").value = keyword;
  }, [])


  return (
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
          <div className="card-title mb-1">Keyword</div>
          <div className="card-body p-0">
            <input
              type="text"
              name="keyword"
              className="form-control"
              onChange={filterJobs}
              placeholder="Search by Job Title"
              id="keyword"
            />
          </div>
        </div>
        <hr />

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
        <hr />

        <div id="div_id_job_location">
          <div className="card-title mb-1">Location</div>
          <div className="card-body p-0">
            {DEFAULT_JOB_LOCATIONS.map((item, index) => (
              <CheckboxInput
                item={item}
                key={index}
                name="location[]"
                onChange={filterJobs}
              />
            ))}
          </div>
        </div>
        <hr />

        <div id="div_id_job_location">
          <div className="card-title mb-1">Salary Range</div>
          <div className="card-body p-0">
            {DEFAULT_SALARY_RANGES.map((item, index) => (
              <RadioBoxInput
                item={item}
                key={index}
                name="salary"
                onChange={filterJobs}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
