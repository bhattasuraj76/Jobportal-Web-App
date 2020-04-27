import * as React from "react";
import CompnayLogo from "../images/company-logo.png";
import { Link } from "react-router-dom";

export default ({job, classValue}) => {
  return (
    <div className={classValue}>
      <div className="job-box d-flex">
        <div className="job-logo">
          <img src={CompnayLogo} alt="Company Logo" />
        </div>
        <div className="job-info ">
          <ul>
            <li>
              <strong> {job.employer.name}</strong>
            </li>
            <li>
              <Link to={`/job/${job.slug}`} className="job-title">
                {job.title}
              </Link>
            </li>
            <li>
              <small>Deadline: {job.expiry_day} days form now</small>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
