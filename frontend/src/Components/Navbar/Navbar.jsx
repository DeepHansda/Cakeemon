import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import {
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiBarChart,
  FiCrosshair,
  FiSearch,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { ProjectContext } from "../../App";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import SocialContactBar from "../Utils/ContactBar/ContactBar";
import logo from "../../assets/logo.png";
import Categories from "../Utils/Categories/Categories";
function NavContact() {
  return (
    <div className="nav-contact">
      <SocialContactBar />
    </div>
  );
}

export default function Navbar() {
  const { offset, width, navigator } = useContext(ProjectContext);
  const [openBar, setOpenBar] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishItems } = useSelector((state) => state.wishList);
  const {categories} = useSelector((state) => state.categories)

  const data = [
    {
      title: "wishlist",
      icon: FiHeart(),
      link: "/wishlist",
      count: wishItems.length,
    },

    {
      title: "cart",
      icon: FiShoppingCart(),
      link: "/cart",
      count: cartItems.length,
    },
    {
      title: "profile",
      icon: FiUser(),
      link: "/profile",
      // count:,
    },
  ];
  return (
    <div
      className="navbar"
      style={{ position: `${offset > 180 ? "fixed" : "relative"}}` }}
    >
      <nav className="navbar-container">
        <div className="navbar-upper">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>

          

          <div className="nav-user-options">
          {width > 700 && <div className="navbar-upper-search">
           <SearchBar />
          </div>}
            {data.map((item, index) => {
              return (
                <li key={index}>
                  <Tooltip
                    title={item.title}
                    onClick={() => navigator(item.link)}
                  >
                    <IconButton size="small">
                      <Badge badgeContent={item.count} color="primary">
                        {item.icon}
                      </Badge>
                    </IconButton>
                  </Tooltip>
                </li>
              );
            })}
          </div>

          {/* <div className="nav-close-btn">
          {width < 700 && <FiMenu />}

          </div> */}
        </div>

        <div
          className="navbar-lower"
          style={width < 700 ? { top: openBar ? "0" : "-2000px" } : {}}
        >
          <div className="navbar-close-button sideBarButton">
            <FiX onClick={() => setOpenBar(false)} />
          </div>
          <div className="navbar-middle-container">
            {width < 700 && <NavContact />}

            <ul className="navbar-middle-items">
              <li className="navbar-middle-item">
                <Link to="/">
                  <p>home</p>
                </Link>
              </li>
              <li className="navbar-middle-item">
                <Link to="/bookRepair">
                  <p>Book Rapair</p>
                </Link>
              </li>
              <li className="navbar-middle-item">
                <Link to="/allProducts">
                  <p>products</p>
                </Link>
              </li>
              <li className="navbar-middle-item">
                <Link to="/contactUS">
                  <p>Contact</p>
                </Link>
              </li>
              <li className="navbar-middle-item">
                <Link to="/aboutUs">
                  <p>About</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="serach-for-small">
          <div className="nav-close-btn">
            <p>{width < 700 && <FiMenu onClick={() => setOpenBar(true)} />}</p>
          </div>
          <div className="search-for-small-bar">
            {width < 700 && <SearchBar />}
          </div>
        </div>

        <Categories name={"Brands"} items={categories}/>

      </nav>
    </div>
  );

  function SearchBar() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const navigator = () => {
      navigate(`/allProducts?keyword=${keyword}`);
    };
    return (
      <div className="navbar-bottom-search">
        <div className="navbar-bottom-search-container">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="navbar-bottom-search-button">
          <button onClick={() => navigator()}>
            <FiSearch />
          </button>
        </div>
      </div>
    );
  }
}
