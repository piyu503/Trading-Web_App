import React, {
  useState,
  useEffect
} from "react";

import { Link } from "react-router-dom";

import axios from "axios";



const Menu = () => {

  const [selectedMenu,
  setSelectedMenu] =
  useState(0);

  const [isProfileDropdownOpen,
  setIsProfileDropdownOpen] =
  useState(false);




  // USER STATE ADDED
  const [user, setUser] =
  useState(null);




  // FETCH USER
  useEffect(() => {

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

    fetchUser();

  }, []);




  const handleMenuClick =
  (index) => {

    setSelectedMenu(index);
  };



  const handleProfileClick =
  () => {

    setIsProfileDropdownOpen(
      !isProfileDropdownOpen
    );
  };



  const menuClass = "menu";

  const activeMenuClass =
  "menu selected";



  return (

    <div className="menu-container">

      <img
        src="logo.png"
        style={{ width: "35px" }}
      />



      <div className="menus">

        <ul>

          <li>
            <Link
              style={{
                textDecoration: "none"
              }}
              to="/"
              onClick={() =>
                handleMenuClick(0)
              }
            >
              <p
                className={
                  selectedMenu === 0
                  ?
                  activeMenuClass
                  :
                  menuClass
                }
              >
                Dashboard
              </p>
            </Link>
          </li>




          <li>
            <Link
              style={{
                textDecoration: "none"
              }}
              to="/orders"
              onClick={() =>
                handleMenuClick(1)
              }
            >
              <p
                className={
                  selectedMenu === 1
                  ?
                  activeMenuClass
                  :
                  menuClass
                }
              >
                Orders
              </p>
            </Link>
          </li>




          <li>
            <Link
              style={{
                textDecoration: "none"
              }}
              to="/holdings"
              onClick={() =>
                handleMenuClick(2)
              }
            >
              <p
                className={
                  selectedMenu === 2
                  ?
                  activeMenuClass
                  :
                  menuClass
                }
              >
                Holdings
              </p>
            </Link>
          </li>




          <li>
            <Link
              style={{
                textDecoration: "none"
              }}
              to="/positions"
              onClick={() =>
                handleMenuClick(3)
              }
            >
              <p
                className={
                  selectedMenu === 3
                  ?
                  activeMenuClass
                  :
                  menuClass
                }
              >
                Positions
              </p>
            </Link>
          </li>




          <li>
            <Link
              style={{
                textDecoration: "none"
              }}
              to="funds"
              onClick={() =>
                handleMenuClick(4)
              }
            >
              <p
                className={
                  selectedMenu === 4
                  ?
                  activeMenuClass
                  :
                  menuClass
                }
              >
                Funds
              </p>
            </Link>
          </li>




          <li>
            <Link
              style={{
                textDecoration: "none"
              }}
              to="/apps"
              onClick={() =>
                handleMenuClick(6)
              }
            >
              <p
                className={
                  selectedMenu === 6
                  ?
                  activeMenuClass
                  :
                  menuClass
                }
              >
                Apps
              </p>
            </Link>
          </li>

        </ul>



        <hr />




        <div
          className="profile"
          onClick={handleProfileClick}
        >

          <div className="avatar">

            {
              user?.username
              ?
              user.username
              .charAt(0)
              .toUpperCase()
              :
              "U"
            }

          </div>




          <p className="username">

            {
              user?.username
              ?
              user.username
              :
              "USER"
            }

          </p>

        </div>

      </div>

    </div>
  );
};

export default Menu;