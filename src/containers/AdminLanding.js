import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default ({ totalEmployers, totalJobseekers, requestActivateEmployers,requestActivateJobseekers, fetchData }) => {
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div>
      <div className="row mt-4 mx-0">
        {totalEmployers !== "" && (
          <div className="col-lg-6">
            <NavLink to={`/admin/employers`} className="activation-count">
              <div className="card-counter success">
                <i className="fa fa-database"></i>
                <span className="count-numbers">{totalEmployers}</span>
                <span className="count-name">Total Employers</span>
                <p className="text-danger text-right activation-count">
                  Activation Request: {requestActivateEmployers}
                </p>
              </div>
            </NavLink>
          </div>
        )}
        {totalJobseekers !== "" && (
          <div className="col-lg-6">
            <NavLink to={`/admin/jobseekers`} className="activation-count">
              <div className="card-counter info">
                <i className="fa fa-users"></i>
                <span className="count-numbers">{totalJobseekers}</span>
                <span className="count-name">Total Jobseekers</span>
                <p className="text-danger text-right">
                  Activation Request: {requestActivateJobseekers}
                </p>
              </div>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};
