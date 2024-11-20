import { createContext, useEffect, useState } from "react";
import Lottie from "lottie-react";
import groovyWalkAnimation from "./10181-groovy-walk-cycle.json";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Dashboard from "./ADMIN/Components/Dashboard/Dashboard";
import { AdminOrders } from "./ADMIN/Components/Orders/AdminOrders";
import AdminHome from "./ADMIN/Components/Home/AdminHome";
import AdminOrderDetails from "./ADMIN/Components/Orders/AdminOrderDetails";
import Customers from "./ADMIN/Components/Customers/Customers";
import AdminProducts from "./ADMIN/Components/Products/AdminProducts";
import ExtraControll from "./ADMIN/Components/ExtraControl/ExtraControll";
import { getCategories } from "./Redux/Actions/CategoriesAction";
import ProductDetalis from "./Pages/Products/ProductsDetails/ProductDetalis";

import Cart from "./Pages/Cart/Cart";
import Wishlist from "./Pages/Wishlist/Wishlist";
import ContactUs from "./Pages/ContactUs/ContactUs";

import Auth from "./Pages/authentication/Auth";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Profile from "./Pages/authentication/Profile";
import Checkout from "./Pages/Orders/Checkout";
import Shipping from "./Pages/Orders/Shipping";
import ReviewOrder from "./Pages/Orders/ReviewOrder";
import Payment from "./Pages/Orders/Payment";
import MyOrders from "./Pages/Orders/MyOrders";
import ConfirmOrder from "./Pages/Orders/ConfirmOrder";
import AboutUs from "./Pages/About/AboutUs";
import Home from "./Pages/Home/Home";
import CustomizeCake from "./Components/Customize/CustomizeCake"
import { loadUser } from "./Redux/Actions/UserActions";
import ProductsContainer from "./Pages/Products/ProductsContainer/ProductsContainer";



export const ProjectContext = createContext();

function App() {
  const [offset, setOffset] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [openAlert, setOpenAlert] = useState({
    open: false,
    message: "success",
    success: true,
  });

  const [completed, setcompleted] = useState(undefined);

  // redirect or navigation handling
  const navigate = useNavigate();
  const navigator = (link) => {
    navigate(link);
  };
  const location = useLocation();

  // global useDispatch for entire project
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    // handling screen width
    function handleScroll() {
      setOffset(window.pageYOffset);
    }
    // handling screen scroll
    function handleWidth() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleWidth);

    // load authenticated user if user loggedIn
    dispatch(loadUser());

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleWidth);
    };
  }, []);

  // small states handling using useContext
  const states = {
    width: width,
    offset: offset,
    openAlert: openAlert,
    setOpenAlert: setOpenAlert,
    navigator: navigator,
    dispatch: dispatch,
    location: location,
  };

  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: groovyWalkAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const style = {
    height: 300,
  };
  return (
    <>
      <ProjectContext.Provider value={states}>
        <div className="App">
          <div className="routes">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productDetails/:id" element={<ProductDetalis />} />
              <Route path="/allProducts" element={<ProductsContainer />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/custom" element={<CustomizeCake />} />
              <Route path="/contactUS" element={<ContactUs />} />
              <Route path="/aboutUs" element={<AboutUs />} />

              <Route path="/auth" element={<Auth />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/reviewOrder" element={<ReviewOrder />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/myOrders" element={<MyOrders />} />
                <Route path="/confirmOrder" element={<ConfirmOrder />} />
              </Route>

              {/* <Route element={<ProtectedRoute isAdmin={true} />}>
                <Route path="/admin" element={<Dashboard />}>
                  <Route path="/admin/main" index element={<AdminHome />} />
                  <Route path="/admin/orders" element={<AdminOrders />} />
                  <Route
                    path="/admin/orderDetails/:id"
                    element={<AdminOrderDetails />}
                  />
                  <Route path="/admin/customers" element={<Customers />} />
                  <Route path="/admin/products" element={<AdminProducts />} />
                  <Route path="/admin/extras" element={<ExtraControll />} />
                </Route>
              </Route> */}
            </Routes>
          </div>
        </div>
      </ProjectContext.Provider>
    </>
  );
}

export default App;
