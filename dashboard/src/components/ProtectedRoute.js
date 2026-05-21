import {

  useEffect,

  useState

} from "react";

import axios from "axios";



function ProtectedRoute({

  children

}) {

  const [loading, setLoading] =
  useState(true);

  const [authorized, setAuthorized] =
  useState(false);




  useEffect(() => {

    const verifyUser =
    async () => {

      try {

        const { data } =
        await axios.post(

          "https://trading-web-app-7jrl.onrender.com/api/auth/verify",

          {},

          {
            withCredentials: true,
          }
        );



        if (data.status) {

          setAuthorized(true);

        }

        else {
            window.location.href =
            "https://main.d26oajyyujqkke.amplifyapp.com/login";
        }

      }

      catch (err) {
        window.location.href =
        "https://main.d26oajyyujqkke.amplifyapp.com/login";
      }



      setLoading(false);
    };



    verifyUser();

  }, []);




  if (loading) {

    return <h1>Loading...</h1>;
  }



  return authorized
    ? children
    : null;
}

export default ProtectedRoute;