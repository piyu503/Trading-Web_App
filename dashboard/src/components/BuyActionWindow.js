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




  const handleBuy =
  async () => {

    try {

      const { data } =
      await axios.post(

        "https://trading-web-app-7jrl.onrender.com/buy",

        {

          name: uid,

          qty: stockQty,

          price: stockPrice,

          mode: "BUY",
        },

        {
          withCredentials: true,
        }
      );



      alert(data.message);

      closeBuyWindow();

      window.location.reload();

    }

    catch (err) {

      console.log(err);

      alert("Buy Failed");
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

              Buy

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