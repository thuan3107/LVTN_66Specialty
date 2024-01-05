import React from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../../actions/CartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import CartItemCard from "./CartItemCard.jsx";
import BottomTab from "../../../more/BottomTab.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../../Home/Header.jsx";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
const Cart = ({ history,hoten }) => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  let Price = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  let totalPrice = Price;

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return toast.error("Product Stock Limited");
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>Không có sản phẩm nào hết!</Typography>
          <Link to="/products">Sản Phẩm</Link>
          <BottomTab />
        </div>
      ) : (
        <>
          <Header/>
          <div className="cartPage">
            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
              
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      <RemoveIcon/>
                    </button>
                    <input type="number" readOnly value={item.quantity} />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                     <AddIcon/>
                    </button>
                  </div>
                  <p className="cartSubtotal">{`${
                    new Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format(item.price *     
                      item.quantity)
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Tổng tiền</p>
                <p>{`${
                 new Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format(totalPrice)
               }`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                {/* <button >Thanh toán</button> */}
                <div onClick={checkoutHandler} class="btn from-left">Đặt hàng</div>
              
              </div>

          
            </div>
          </div>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default Cart;
