import { useState } from "react";

import axios from "axios";



function Signup() {

  const [formData, setFormData] =
  useState({

    username: "",
    email: "",
    password: "",
  });




  const handleSubmit =
  async (e) => {

    e.preventDefault();

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

          window.location.href =
          "https://main.d34gr18chlppqj.amplifyapp.com";
      }

      else {

        alert(data.message);
      }

    }

    catch (err) {

      console.log(err);

      alert("Signup Failed");
    }
  };




  return (

    <div>

      <h1>Signup</h1>


      <form onSubmit={handleSubmit}>

        <input

          type="text"

          placeholder="Username"

          onChange={(e) =>
            setFormData({

              ...formData,

              username:
              e.target.value,
            })
          }
        />



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

          Signup

        </button>

      </form>

    </div>
  );
}

export default Signup;