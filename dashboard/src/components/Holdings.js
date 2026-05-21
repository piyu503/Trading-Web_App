import React, {

  useEffect,

  useState

} from "react";

import axios from "axios";



const Holdings = () => {

  const [allHoldings,
  setAllHoldings] =
  useState([]);




  useEffect(() => {

    const fetchHoldings =
    async () => {

      try {

        const res =
        await axios.get(

          "https://trading-web-app-7jrl.onrender.com/allHoldings",

          {
            withCredentials: true,
          }
        );



        setAllHoldings(
          res.data
        );

      }

      catch (err) {

        console.log(err);
      }
    };



    fetchHoldings();

  }, []);




  return (

    <>

      <h3 className="title">
        Holdings ({allHoldings.length})
      </h3>



      <div className="order-table">

        <table>

          <thead>

            <tr>

              <th>Instrument</th>

              <th>Qty.</th>

              <th>Avg. cost</th>

              <th>LTP</th>

              <th>Cur. val</th>

              <th>P&L</th>

              <th>Net chg.</th>

              <th>Day chg.</th>

            </tr>

          </thead>



          <tbody>

            {

              allHoldings.map((stock, index) => {

                const curValue =
                stock.price * stock.qty;

                const isProfit =
                curValue - stock.avg * stock.qty >= 0.0;

                const profClass =
                isProfit
                ?
                "profit"
                :
                "loss";

                const dayClass =
                stock.day.startsWith("-")
                ?
                "loss"
                :
                "profit";



                return (

                  <tr key={index}>

                    <td>{stock.name}</td>

                    <td>{stock.qty}</td>

                    <td>{stock.avg.toFixed(2)}</td>

                    <td>{stock.price.toFixed(2)}</td>

                    <td>{curValue.toFixed(2)}</td>

                    <td
                      className={profClass}
                    >

                      {
                        (
                          curValue -
                          stock.avg *
                          stock.qty
                        ).toFixed(2)
                      }

                    </td>

                    <td
                      className={profClass}
                    >

                      {stock.net}

                    </td>

                    <td
                      className={dayClass}
                    >

                      {stock.day}

                    </td>

                  </tr>
                );
              })
            }

          </tbody>

        </table>

      </div>

    </>
  );
};

export default Holdings;