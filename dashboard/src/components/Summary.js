import React, {

  useEffect,

  useState

} from "react";

import axios from "axios";



const Summary = () => {

  const [summary,
  setSummary] =
  useState({

    totalInvestment: 0,

    currentValue: 0,

    pnl: 0,

    holdingsCount: 0,
  });




  const [user,
  setUser] =
  useState(null);




  useEffect(() => {

    const fetchSummary =
    async () => {

      try {

        const res =
        await axios.get(

          "https://trading-web-app-7jrl.onrender.com/summary",

          {
            withCredentials: true,
          }
        );



        if (res.data.success) {

          setSummary(
            res.data
          );
        }

      }

      catch (err) {

        console.log(err);
      }
    };




    const fetchUser =
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

          setUser(data.user);
        }

      }

      catch (err) {

        console.log(err);
      }
    };



    fetchSummary();

    fetchUser();

  }, []);




  const isProfit =
  summary.pnl >= 0;




  return (

    <div className="summary-container">




      <div className="summary-header">

        <div>

          <h2>

            Welcome back,

            {
              user?.username
              ?
              ` ${user.username}`
              :
              " User"
            }

          </h2>

          <p>
            Here's your portfolio overview
          </p>

        </div>

      </div>





      <div className="summary-cards">




        <div className="summary-card">

          <p>Total Investment</p>

          <h3>

            ₹
            {
              summary
              .totalInvestment
              .toFixed(2)
            }

          </h3>

        </div>





        <div className="summary-card">

          <p>Current Value</p>

          <h3>

            ₹
            {
              summary
              .currentValue
              .toFixed(2)
            }

          </h3>

        </div>





        <div className="summary-card">

          <p>Total Holdings</p>

          <h3>

            {
              summary
              .holdingsCount
            }

          </h3>

        </div>





        <div className="summary-card">

          <p>Total P&L</p>

          <h3

            className={
              isProfit
              ?
              "profit"
              :
              "loss"
            }
          >

            ₹
            {
              summary.pnl
              .toFixed(2)
            }

          </h3>

        </div>

      </div>

    </div>
  );
};

export default Summary;