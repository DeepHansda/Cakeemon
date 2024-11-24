import {
  Badge,
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useContext, useState } from "react";
import {
  FiHeart,
  FiMenu,
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiX,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ProjectContext } from "../../App";
import logo from "../../assets/logo.png";
import { useGetAllCategoriesQuery } from "../../Redux/slices/categoriesApiSlice";
import Categories from "../Utils/Categories/Categories";
import SocialContactBar from "../Utils/ContactBar/ContactBar";
import "./Navbar.css";

function NavContact() {
  return (
    <div className="nav-contact">
      <SocialContactBar />
    </div>
  );
}

const navItems = [
  { name: "Home", path: "/" },
  { name: "Customize Cake", path: "/custom" },
  { name: "Products", path: "/allProducts" },
  { name: "Contact", path: "/contactUS" },
  { name: "About", path: "/aboutUs" },
];

export default function Navbar() {
  const { offset, width, navigator, location } = useContext(ProjectContext);
  const [openBar, setOpenBar] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishItems } = useSelector((state) => state.wishList);
  const { data: categories, isLoading } = useGetAllCategoriesQuery();
  const currentPath = location.pathname;

  const userNavList = [
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
    <>
      <div className="navbar">
        <nav className="navbar-container">
          <div className="navbar-upper">
            <div className="logo">
              <img
                src={logo}
                alt="logo"
                onClick={() => {
                  navigator("/");
                }}
              />
            </div>

            <div className="nav-user-options">
              {width > 700 && (
                <div className="navbar-upper-search">
                  <SearchBar />
                </div>
              )}
              {userNavList.map((item, index) => {
                return (
                  <li key={index}>
                    <Tooltip
                      title={item.title}
                      onClick={() => navigator(item.link)}
                    >
                      <IconButton>
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
                {navItems.map((item, index) => (
                  <li key={index} className="navbar-middle-item">
                    <Link
                      to={item.path}
                      style={{ color: item.path === currentPath && "#55a630" }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="serach-for-small">
            <div className="nav-close-btn">
              <p>
                {width < 700 && <FiMenu onClick={() => setOpenBar(true)} />}
              </p>
            </div>
            <div className="search-for-small-bar">
              {width < 700 && <SearchBar />}
            </div>
          </div>

          {isLoading ? (
            <Box sx={{ p: 1, textAlign: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Categories items={categories.categories} name={"Categories"} />
          )}
        </nav>
      </div>
    </>
  );

  function SearchBar() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const navigator = () => {
      navigate(`/allProducts?keyword=${keyword}`);
    };
    const enterKey = (e) => {
      if (e.keyCode === 13) {
        navigator();
      }
    };
    return (
      <div className="navbar-bottom-search">
        <div className="navbar-bottom-search-container">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={enterKey}
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
