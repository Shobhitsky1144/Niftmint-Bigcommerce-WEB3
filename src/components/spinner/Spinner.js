import React from "react";
import { Audio, Oval, RotatingLines } from "react-loader-spinner";
import GoToTop from "../GoToTop";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Spinner = ({ loading }) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center "
      // style={{ background: "lightGray" }}
    >
      {loading ? (
        <>
          <GoToTop />
          <Oval
            height="100vh"
            width="100"
            // color="#3bb777"
            ariaLabel="loading"
            strokeWidth={2}
          />
        </>
      ) : (
        // <RotatingLines height="100vh" width="100" strokeColor="#3bb777" />
        //  strokeWidth={5}
        ""
      )}
    </div>
  );
};

export default Spinner;
