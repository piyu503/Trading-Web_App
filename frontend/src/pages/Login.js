import { useState } from "react";
import axios from "axios";

function Login() {

  const [formData, setFormData] =
  useState({

    email: "",
    password: "",
  });




  const handleSubmit =
  async (e) => {

    e.preventDefault();

    try {

      const { data } =
      await axios.post(

        "https://trading-web-app-7jrl.onrender.com/api/auth/login",

        formData,

        {
          withCredentials: true,
        }
      );



      if (data.success) {

        alert(data.message);

        window.location.href =
          "https://main.d34gr18chlppqj.amplifyapp.com";
      }

      else {

        alert(data.message);
      }

    }

    catch (err) {

      console.log(err);

      alert("Login Failed");
    }
  };




  return (

    <div className="container">

      <div
        className="row justify-content-center align-items-center"
        style={{
          minHeight: "80vh",
        }}
      >

        <div className="col-lg-5 col-md-7 col-11">

          <div
            className="bg-white p-5 border rounded-4 shadow-sm"
          >

            <h1
              className="text-center mb-3"
              style={{
                color: "#387ed1",
                fontWeight: "600",
              }}
            >
              Login
            </h1>

            <p
              className="text-center text-muted mb-4"
            >
              Welcome back, continue your trading journey
            </p>



            <form onSubmit={handleSubmit}>

              <div className="mb-4">

                <label className="form-label">
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

                <label className="form-label">
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
                  fontWeight: "600",
                  border: "none",
                }}
              >

                Login

              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;