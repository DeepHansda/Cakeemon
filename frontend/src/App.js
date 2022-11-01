import { createContext, useEffect, useState } from "react";
import "./App.css";
import Main from "./Components/Main/Main";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ProductDetalis from "./Components/Products/ProductsDetails/ProductDetalis";
import MainContainer from "./Components/Products/MainContainer/MainContainer";
import { useDispatch, useSelector } from "react-redux";
import Wishlist from "./Components/Wishlist/Wishlist";
import Cart from "./Components/Cart/Cart";
import Shipping from "./Components/Orders/Shipping";
import ReviewOrder from "./Components/Orders/ReviewOrder";
import Payment from "./Components/Orders/Payment";
import Auth from "./Components/authentication/Auth";
import { loadUser } from "./Redux/Actions/UserActions";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Profile from "./Components/authentication/Profile";
import Checkout from "./Components/Orders/Checkout";
import MyOrders from "./Components/Orders/MyOrders";
import ConfirmOrder from "./Components/Orders/ConfirmOrder";
import BookRepair from "./Components/BookRepair/BookRepair";
import ContactUs from "./Components/ContactUs/ContactUs";
import AboutUs from "./Components/About/AboutUs";
import Dashboard from "./ADMIN/Components/Dashboard/Dashboard";
import {AdminOrders} from "./ADMIN/Components/Orders/AdminOrders";
import AdminHome from "./ADMIN/Components/Home/AdminHome";
import AdminOrderDetails from "./ADMIN/Components/Orders/AdminOrderDetails";
import Customers from "./ADMIN/Components/Customers/Customers";
import AdminProducts from "./ADMIN/Components/Products/AdminProducts";
import ExtraControll from "./ADMIN/Components/ExtraControl/ExtraControll";
export const ProjectContext = createContext();
function App() {
  const [offset, setOffset] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [openAlert, setOpenAlert] = useState({
    open:false,
    message:"success",
    success:true,
  });

  // redirect or navigation handling
  const navigate = useNavigate();
  const navigator = (link) => {
    navigate(link);
  };
  const location = useLocation()

  // global useDispatch for entire project
  const dispatch = useDispatch();

  useEffect(() => {
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
    setOpenAlert:setOpenAlert,
    navigator: navigator,
    dispatch: dispatch,
    location: location
  };


  return (
    <ProjectContext.Provider value={states}>
      <div className="App">
        <div className="routes">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/productDetails/:id" element={<ProductDetalis />} />
          <Route path="/allProducts" element={<MainContainer />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/bookRepair" element={<BookRepair />} />
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

          <Route element={<ProtectedRoute isAdmin={true}/>}>
          <Route path="/admin" element={<Dashboard />}>
            <Route path="/admin/main" index element={< AdminHome/>}/>
            <Route path="/admin/orders" element={<AdminOrders />}/>
            <Route path="/admin/orderDetails/:id" element={<AdminOrderDetails/>}/>
            <Route path="/admin/customers" element={<Customers/>}/>
            <Route path="/admin/products" element={<AdminProducts/>}/>
            <Route path="/admin/extras" element={<ExtraControll/>}/>

          </Route>

          </Route>
        </Routes>
        </div>
      </div>
    </ProjectContext.Provider>
  );
}

export default App;
