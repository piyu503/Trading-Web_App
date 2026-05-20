import React from "react";
import {Link} from "react-router-dom";

function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The Zerodha Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        
        <Link to={"/signup"}>
          <button
            className="p-2 btn btn-primary fs-5 mb-5"
            style={{ width: "20%", margin: "0 auto" }} 
          >
            Signup Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Universe;
