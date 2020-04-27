import * as React from "react";
import JobBox from "./JobBox";

export default ({ jobs }) => {
  return (
    <section>
      {jobs.length ? (
        <div className="Container">
          <div className="hot-jobs-header d-flex justify-content-center mt-5 mb-4">
            <h3>
              <span className="icon-fire mr-2"></span>
              Hot Jobs
            </h3>
          </div>
          <div className="hot-jobs-container">
            <div className="row mx-0">
              {jobs.map((item, index) => {
                return <JobBox key={index} job={item} classValue="col-md-4" />;
              })}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};
