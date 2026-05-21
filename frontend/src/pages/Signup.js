import { useState } from "react";

import axios from "axios";



function Signup() {

  const [formData, setFormData] =
  useState({

    username: "",
    email: "",
    password: "",
  });



  // LOADING STATE ADDED HERE
  const [loading, setLoading] =
  useState(false);




  const handleSubmit =
  async (e) => {

    e.preventDefault();



    // LOADING STARTED HERE
    setLoading(true);

    try {

      const { data } =
      await axios.post(

        "https://trading-web-app-7jrl.onrender.com/api/auth/signup",

        formData,

        {
          withCredentials: true,
        }
      );



      if (data.success) {

        alert(data.message);



        // LOADING STOPPED HERE
        setLoading(false);

        window.location.href =
          "https://main.d34gr18chlppqj.amplifyapp.com";
      }

      else {

        // LOADING STOPPED HERE
        setLoading(false);

        alert(data.message);
      }

    }

    catch (err) {

      console.log(err);



      // LOADING STOPPED HERE
      setLoading(false);

      alert("Signup Failed");
    }
  };




  return (

    <div
      style={{
        backgroundColor: "#f8f9fc",
        minHeight: "100vh",
      }}
    >

      <div className="container">

        <div
          className="row justify-content-center align-items-center"
          style={{
            minHeight: "100vh",
          }}
        >

          <div className="col-lg-5 col-md-7 col-11">

            <div
              className="bg-white p-5 rounded-4"
              style={{
                boxShadow:
                "0 0 30px rgba(0,0,0,0.08)",
              }}
            >

              <div className="text-center mb-4">

                <img
                  src="/media/images/logo.svg"
                  alt="logo"
                  style={{
                    width: "120px",
                    marginBottom: "20px",
                  }}
                />

                <h2
                  style={{
                    color: "#387ed1",
                    fontWeight: "700",
                  }}
                >
                  Create Account
                </h2>

                <p className="text-muted">

                  Start your smart trading journey

                </p>

              </div>




              <form onSubmit={handleSubmit}>

                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Username
                  </label>

                  <input

                    type="text"

                    className="form-control p-3"

                    placeholder="Enter your username"

                    value={formData.username}

                    onChange={(e) =>
                      setFormData({

                        ...formData,

                        username:
                        e.target.value,
                      })
                    }
                  />

                </div>




                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Email
                  </label>

                  <input

                    type="email"

                    className="form-control p-3"

                    placeholder="Enter your email"

                    value={formData.email}

                    onChange={(e) =>
                      setFormData({

                        ...formData,

                        email:
                        e.target.value,
                      })
                    }
                  />

                </div>




                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Password
                  </label>

                  <input

                    type="password"

                    className="form-control p-3"

                    placeholder="Enter your password"

                    value={formData.password}

                    onChange={(e) =>
                      setFormData({

                        ...formData,

                        password:
                        e.target.value,
                      })
                    }
                  />

                </div>




                <button

                  type="submit"

                  className="btn w-100 p-3"

                  style={{
                    backgroundColor: "#387ed1",
                    color: "white",
                    border: "none",
                    fontWeight: "600",
                    fontSize: "17px",
                  }}
                >

                  {
                    loading
                    ?
                    "Please wait..."
                    :
                    "Signup"
                  }

                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Signup;