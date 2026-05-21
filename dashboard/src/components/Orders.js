import React, {

  useEffect,

  useState

} from "react";

import axios from "axios";

import { Link } from "react-router-dom";



const Orders = () => {

  const [allOrders,
  setAllOrders] =
  useState([]);




  useEffect(() => {

    const fetchOrders =
    async () => {

      try {

        const res =
        await axios.get(

          "https://trading-web-app-7jrl.onrender.com/allOrders",

          {
            withCredentials: true,
          }
        );



        setAllOrders(
          res.data
        );

      }

      catch (err) {

        console.log(err);
      }
    };



    fetchOrders();

  }, []);




  return (

    <div className="orders">

      {

        allOrders.length === 0

        ?

        (

          <div className="no-orders">

            <p>

              You haven't placed any orders yet

            </p>

            <Link
              to={"/"}
              className="btn"
            >

              Get started

            </Link>

          </div>
        )

        :

        (

          <div className="order-table">

            <h3
              style={{
                marginBottom: "20px",
              }}
            >

              Orders (
              {allOrders.length}
              )

            </h3>




            <table>

              <thead>

                <tr>

                  <th>Stock</th>

                  <th>Qty</th>

                  <th>Price</th>

                  <th>Mode</th>

                </tr>

              </thead>




              <tbody>

                {

                  allOrders.map(

                    (stock, index) => {

                      return (

                        <tr key={index}>

                          <td>
                            {stock.name}
                          </td>

                          <td>
                            {stock.qty}
                          </td>

                          <td>
                            ₹{stock.price}
                          </td>

                          <td
                            className={
                              stock.mode ===
                              "BUY"
                              ?
                              "profit"
                              :
                              "loss"
                            }
                          >

                            {stock.mode}

                          </td>

                        </tr>
                      );
                    }
                  )
                }

              </tbody>

            </table>

          </div>
        )
      }

    </div>
  );
};

export default Orders;