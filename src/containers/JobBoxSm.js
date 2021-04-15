import * as React from "react";
import CompnayLogo from "../images/company-logo.png";
import { Link } from "react-router-dom";

export default ({ job, classValue, type }) => {
  return (
    <div className={classValue}>
      <div className="job-box d-flex align-items-center">
        <img
          src={job.logo ? job.logo : CompnayLogo}
          alt="Company Logo"
          className="job-logo"
        />
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
              {type === "recent" ? (
                <small>Posted: {job.posted_time} </small>
              ) : (
                <small>Deadline: {job.deadline} </small>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
