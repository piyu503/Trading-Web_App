import React, {

  useState

} from "react";

import axios from "axios";



const BuyActionWindow = ({

  uid,

  closeBuyWindow

}) => {

  const [stockQty,
  setStockQty] =
  useState(1);

  const [stockPrice,
  setStockPrice] =
  useState(0);



  // MODE STATE ADDED
  const [mode,
  setMode] =
  useState("BUY");



  // LOADING STATE ADDED
  const [loading,
  setLoading] =
  useState(false);




  const handleBuy =
  async () => {

    // LOADING START
    setLoading(true);

    try {

      const { data } =
      await axios.post(

        "https://trading-web-app-7jrl.onrender.com/buy",

        {

          name: uid,

          qty: stockQty,

          price: stockPrice,

          // MODE DYNAMIC NOW
          mode,
        },

        {
          withCredentials: true,
        }
      );



      alert(data.message);



      // LOADING STOP
      setLoading(false);

      closeBuyWindow();

      window.location.reload();

    }

    catch (err) {

      console.log(err);



      // LOADING STOP
      setLoading(false);

      alert(

        err.response?.data?.message ||

        `${mode} Failed`
      );
    }
  };




  return (

    <div
      className="container"
      id="buy-window"
    >

      <div
        className="regular-order"
      >




        {/* BUY SELL TOGGLE ADDED */}

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
          }}
        >

          <button

            className={
              mode === "BUY"
              ?
              "btn btn-blue"
              :
              "btn btn-grey"
            }

            onClick={() =>
              setMode("BUY")
            }
          >

            BUY

          </button>




          <button

            className={
              mode === "SELL"
              ?
              "btn btn-blue"
              :
              "btn btn-grey"
            }

            onClick={() =>
              setMode("SELL")
            }
          >

            SELL

          </button>

        </div>





        <div className="inputs">

          <fieldset>

            <legend>Qty.</legend>

            <input
              type="number"
              value={stockQty}
              onChange={(e) =>
                setStockQty(
                  e.target.value
                )
              }
            />

          </fieldset>





          <fieldset>

            <legend>Price</legend>

            <input
              type="number"
              value={stockPrice}
              onChange={(e) =>
                setStockPrice(
                  e.target.value
                )
              }
            />

          </fieldset>

        </div>





        <div className="buttons">

          <span>

            Margin required ₹

            {
              (
                stockQty *
                stockPrice
              ).toFixed(2)
            }

          </span>





          <div>

            <button

              className="btn btn-blue"

              onClick={handleBuy}
            >

              {
                loading
                ?
                "Processing..."
                :
                mode
              }

            </button>





            <button

              className="btn btn-grey"

              onClick={
                closeBuyWindow
              }
            >

              Cancel

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default BuyActionWindow;