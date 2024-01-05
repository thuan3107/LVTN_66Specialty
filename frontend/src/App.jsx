import Home from "./component/Home/Home";
import WebFont from "webfontloader";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductDetails from "./component/Products/ProductDetails";
import LoginSignup from "./component/Authentication/LoginSignup";
import UserData from "./more/UserData";
import { useSelector } from "react-redux";
import { loadUser } from "./actions/userAction";
import Store from "./store";
import ProtectedRoute from "./route/ProtectedRoute";
import Profile from "./component/user/Profile";
import UpdatePassword from "./component/user/UpdatePassword";
import EditProfile from "./component/user/EditProfile";
import About from "./component/about/About";
import Products from "./component/Products/Products";
import Blogs from "./component/Blogs/Blogs";
import Search from "./component/Products/Search";
import Support from "./more/Support";
import Cart from "./component/cart/Cart/Cart";
import Favourites from "./component/cart/Favourites";
import Shipping from "./component/cart/Payment/Shipping";
import ConfirmOrder from "./component/cart/Payment/ConfirmOrder";
import Payment from "./component/cart//Payment/Payment";
import Chatgpt3 from "./component/chatbot/Chatgpt3";
import Success from "./component/cart/Payment/Success";
import MyOrder from "./component/user/MyOrder";
import MyOrderDetails from "./component/user/MyOrderDetails";
import CommingSoon from "./more/CommingSoon";
import Rules from "./more/Rules";
import Contact from "./more/Contact";
import MoreOption from "./component/user/MoreOption";
import Dashboard from "./component/Admin/Dashboard/Dashboard";
import CreateProduct from "./component/Admin/Product/CreateProduct";
import CreateBlog from "./component/Admin/Blog/CreateBlog";
import BlogDetails from "./component/Blogs/BlogDetails";
import "./App.css";
import AllProducts from "./component/Admin/Product/AllProducts";
import AllBlogs from "./component/Admin/Blog/AllBlogs";
import AllQuidation from "./component/Admin/Quidation/AllQuidation";
import AllQrcodes from "./component/Admin/Qrcode/AllQrcodes";
import EditProduct from "./component/Admin/Product/EditProduct";
import EditBlog from "./component/Admin/Blog/EditBlog";
import AllOrder from "./component/Admin/Order/AllOrder";
import UpdateOrder from "./component/Admin/Order/UpdateOrder";
import AllUsers from "./component/Admin/User/AllUsers";
import UpdateUser from "./component/Admin/User/UpdateUser";
import AllReviews from "./component/Admin/Review/AllReviews";
import ForgotPassword from "./component/user/ForgotPassword";
import ResetPassword from "./component/user/ResetPassword";
import Notfound from "./more/Notfound";
import PlaceOrder from "./component/cart/Payment/PlaceOrder";
import Pagination from "./component/Products/Pagination";
import Qrcode from "./component/Admin/Qrcode/Qrcode";
import EditQrcode from "./component/Admin/Qrcode/EditQrcode";
import Agriculture from "./component/Products/Agriculture";
import VnPay from "./component/Admin/VnPay/Vnpay";
import VnpayReturn from "./component/Admin/VnPay/VnPayReturn";
import ModalView from "./component/ModalView/ModalView";
import Shippingcard from "./component/cart/Payment/Shippingcard";
import SpeechRecognition from "./component/AlanAi/SpeechRecognition";
import PlaceOrdercard from "./component/cart/Payment/PlaceOrdercard";
import ModalCard from "./component/cart/Payment/ModalCard";
import ModalPlaceOrder from "./component/cart/Payment/ModalPlaceOrder";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    Store.dispatch(loadUser());
  }, []);

  return (
    <>
      <Router>
        {isAuthenticated && (
          <div className="z-50">
            {" "}
            <UserData user={user} />
          </div>
        )}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/blog/:id" component={BlogDetails} />
          <Route exact path="/login" component={LoginSignup} />
          <Route exact path="/about" component={About} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/blogs" component={Blogs} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/vnpay" component={VnPay} />
          <Route exact path="/pagination" component={Pagination} />
          <Route exact path="/products/:keyword" component={Products} />
          <Route exact path="/nongsans" component={Agriculture} />
          <Route exact path="/support" component={Support} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/favourites" component={Favourites} />
          <Route exact path="/creator" component={CommingSoon} />
          <Route exact path="/faq" component={Rules} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/more" component={MoreOption} />
          <Route exact path="/modal" component={ModalView} />
          <ProtectedRoute exact path="/chatgpt3" component={Chatgpt3} />
          <Route exact path="/password/forgot" component={ForgotPassword} />
          <Route exact path="/speech" component={SpeechRecognition} />

          <Route
            exact
            path="/password/reset/:token"
            component={ResetPassword}
          />
          <ProtectedRoute exact path="/shipping" component={Shipping} />
          <ProtectedRoute exact path="/shippingcard" component={Shippingcard} />
          <ProtectedRoute exact path="/vnpay_return" component={VnpayReturn} />
          <ProtectedRoute exact path="/modalcard" component={ModalCard} />
          <ProtectedRoute
            exact
            path="/modalplaceorder"
            component={ModalPlaceOrder}
          />
          <Route exact path="/payment" component={Payment} />
          <Route exact path="/placeorder" component={PlaceOrder} />
          <Route exact path="/placeordercard" component={PlaceOrdercard} />
          <ProtectedRoute
            exact
            path="/order/confirm"
            component={ConfirmOrder}
          />
          <ProtectedRoute exact path="/me" component={Profile} />
          <ProtectedRoute exact path="/me/update" component={UpdatePassword} />
          <ProtectedRoute
            exact
            path="/me/update/info"
            component={EditProfile}
          />
          <ProtectedRoute exact path="/success" component={Success} />
          <ProtectedRoute exact path="/orders" component={MyOrder} />

          <ProtectedRoute exact path="/order/:id" component={MyOrderDetails} />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/dashboard"
            component={Dashboard}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/createqrcode"
            component={Qrcode}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/product"
            component={CreateProduct}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/blog"
            component={CreateBlog}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/products"
            component={AllProducts}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/blogs"
            component={AllBlogs}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/qrcodes"
            component={AllQrcodes}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/quidation"
            component={AllQuidation}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/edit/qrcode/:id"
            component={EditQrcode}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/edit/product/:id"
            component={EditProduct}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/edit/blog/:id"
            component={EditBlog}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/orders"
            component={AllOrder}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/order/:id"
            component={UpdateOrder}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/users"
            component={AllUsers}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/user/:id"
            component={UpdateUser}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/reviews"
            component={AllReviews}
          />
          <Route
            component={
              window.location.pathname === "/payment" ? null : Notfound
            }
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
