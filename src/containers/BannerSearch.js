import * as React from "react";
import Banner from "../images/banner.png";

export default () => {
  return (
    <section
      className="bg-default-img img-fluid"
      style={{ backgroundImage: `url(${Banner})` }}
    >
      <div className="container search-box">
        <div className="row justify-content-center">
          <div className="col-lg-8 my-auto">
            <div className="py-4 py-lg-5">
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
