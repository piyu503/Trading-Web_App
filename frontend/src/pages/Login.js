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

        "http://localhost:3002/api/auth/login",

        formData,

        {
          withCredentials: true,
        }
      );



      if (data.success) {

        alert(data.message);

        window.location.href =
        "http://localhost:3001";
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

    <div>

      <h1>Login</h1>


      <form onSubmit={handleSubmit}>

        <input

          type="email"

          placeholder="Email"

          onChange={(e) =>
            setFormData({

              ...formData,

              email:
              e.target.value,
            })
          }
        />



        <input

          type="password"

          placeholder="Password"

          onChange={(e) =>
            setFormData({

              ...formData,

              password:
              e.target.value,
            })
          }
        />



        <button type="submit">

          Login

        </button>

      </form>

    </div>
  );
}

export default Login;