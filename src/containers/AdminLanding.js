import React, { useEffect } from "react";

export default ({ totalEmployers, totalJobseekers, fetchData }) => {
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="row mt-4 mx-0">
        {totalEmployers !== "" && (
          <div className="col-lg-6">
            <div className="card-counter success">
              <i className="fa fa-database"></i>
              <span className="count-numbers">{totalEmployers}</span>
              <span className="count-name">Total Employers</span>
            </div>
          </div>
        )}
        {totalJobseekers !== "" && (
          <div className="col-lg-6">
            <div className="card-counter info">
              <i className="fa fa-users"></i>
              <span className="count-numbers">{totalJobseekers}</span>
              <span className="count-name">Total Jobseekers</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
