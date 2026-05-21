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
    <>

      <div className="username">

        <h6>

          Hi,

          {
            user?.username
            ?
            user.username
            :
            "User"
          }

          !

        </h6>

        <hr className="divider" />

      </div>




      <div className="section">

        <span>
          <p>Portfolio Summary</p>
        </span>




        <div className="data">

          <div className="first">

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

            <p>Total P&L</p>

          </div>




          <hr />




          <div className="second">

            <p>

              Holdings

              <span>

                {
                  summary
                  .holdingsCount
                }

              </span>

            </p>




            <p>

              Investment

              <span>

                ₹
                {
                  summary
                  .totalInvestment
                  .toFixed(2)
                }

              </span>

            </p>




            <p>

              Current Value

              <span>

                ₹
                {
                  summary
                  .currentValue
                  .toFixed(2)
                }

              </span>

            </p>

          </div>

        </div>

        <hr className="divider" />

      </div>

    </>
  );
};

export default Summary;