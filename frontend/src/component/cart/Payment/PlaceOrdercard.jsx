import React, { useState } from "react";
import "./ConfirmOrder.css";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import BottomTab from "../../../more/BottomTab.jsx";
import { ORDER_CREATE_RESET } from "../../../constans/OrderConstans";
import { createOrder } from "../../../actions/OrderAction";
import { ToastContainer, toast } from "react-toastify";

import { useEffect } from "react";
import Loading from "../../../more/Loader.jsx";
import Header from "../../Home/Header";
export default function PlaceOrdercard({ history,hoten,address,phone,city,province }) {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { cartItems, paymentInfo1 } = useSelector(
    (state) => state.cart
  );
   const hotenFromRedux = useSelector((state) => state.alan.hoten);
  const [method, setMethod] = useState(paymentInfo1.method);

  const cart = useSelector((state) => state.cart);

  let productPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const subtotal = productPrice;
  cart.shippingCharges = cart.itemsPrice < 150000 ? 20000 : 0;
  cart.totalPrice = subtotal + cart.shippingCharges;

 
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error, loading } = orderCreate;
  useEffect(() => {
    if (success) {
      history.push(`order/$(order._id)`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [history, dispatch, success, order]);
  const placeOrderHandler = () => {
    if (method === "Thanh toán bằng VnPay") {
      history.push(`/vnpay`);
    } else if (method === "Thanh toán khi giao hàng (COD)") {
      dispatch(
        createOrder({
          orderItems: cart.cartItems,
          shippingInfo:{
            name:hotenFromRedux,
        
          },
          paymentInfo1: cart.paymentInfo1,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingCharges,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        })
      );
      history.push("/success");
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />

          <div
            className="bg-[#E7EBEE] rounded-sm"
            style={{ padding: "20px", height: "50rem" }}
          >
            <div className="flex justify-center">
              <div>
                <div className="p-[20px] mb-[20px] bg-white mx-[20px] shadow-[0_3px_10px_rgb(0,0,0,0.3)]">
                  <h3 className=" text-[#1c5e08a1] ">Thông tin giao hàng</h3>
                  <div className="ml-[1rem]">
                    <div className=" flex my-[5px]">
                      <p className="mr-[120px]">Khách hàng:</p>
                      <span>{hoten}</span>
                    </div>
                    <div className="flex  my-[5px]">
                      <p className="mr-[115px]">Số điện thoại:</p>
                      <span>{phone}</span>
                    </div>
                    <div className="flex   my-[5px]">
                      <p className="mr-[160px]">Địa chỉ:</p>
                      <span>{address}</span>
                    </div>
                    <div className=" my-[5px]">
                      <p className="mr-[160px] text-black">
                        Nhập ghi chú nếu có:
                      </p>
                      <textarea name="" id="" cols="70" rows="1"></textarea>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="p-[20px] mb-[20px] bg-white mx-[20px] shadow-[0_3px_10px_rgb(0,0,0,0.3)]">
                    <h3 className=" text-[#1c5e08a1] ">
                      Phương thức thanh toán
                    </h3>
                    <div className="">
                      <div className="ml-[1rem]">
                        <Typography>Chọn phương thức thanh toán</Typography>
                        <div className="methods">
                          <span className="code">
                            <input
                              type="radio"
                              name="method"
                              value="Thanh toán khi giao hàng (COD)"
                              onChange={(e) => setMethod(e.target.value)}
                            />
                            <img
                              src="https://cdn-icons-png.flaticon.com/512/9457/9457476.png"
                              alt=""
                            />
                            Thanh toán khi giao hàng (COD)
                          </span>
                          <span className="vnpay">
                            <input
                              type="radio"
                              name="method"
                              value="Thanh toán bằng VnPay"
                              onChange={(e) => setMethod(e.target.value)}
                            />
                            <img
                              src="https://downloadlogomienphi.com/sites/default/files/logos/download-logo-vector-vnpay-mien-phi.jpg"
                              alt=""
                            />
                            Thanh toán VnPay
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[33rem]">
                <div className="p-[10px] w-[100%] mb-[20px] bg-white shadow-[0_3px_10px_rgb(0,0,0,0.3)]">
                  <h3 className="text-[#1c5e08a1] ">Danh sách sản phẩm</h3>

                  {cartItems.length === 0 ? (
                    <div className="">"adas"</div>
                  ) : (
                    <div className="">
                      {cartItems.map((item) => (
                        <div className="flex px-3 m-3  " key={item.product}>
                          <img
                            className="w-[30px]"
                            src={item.image}
                            alt="Product"
                          />
                          <Link className to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                          <span className="ml-3">
                            {item.quantity} x
                            {`${new Intl.NumberFormat("de-DE", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.price)}`}{" "}
                            ={" "}
                            <b>{`${new Intl.NumberFormat("de-DE", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.price * item.quantity)}`}</b>
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="bg-white p-[25px]  shadow-[0_3px_10px_rgb(0,0,0,0.3)]">
                  <h3 className="text-md   ">Đơn hàng</h3>
                  <div className="pt-[15px] p-[10px] text-[13px]  ">
                    <div className="flex  mb-[10px] ">
                      <p className="mr-[20rem]">Tạm tính:</p>
                      <span>{`${new Intl.NumberFormat("de-DE", {
                        style: "currency",
                        currency: "VND",
                      }).format(subtotal)}`}</span>
                    </div>
                    <div className="flex  mb-[10px]">
                      <p className="mr-[20rem]">Phí vận chuyển:</p>
                      <span>{`${new Intl.NumberFormat("de-DE", {
                        style: "currency",
                        currency: "VND",
                      }).format(cart.shippingCharges)}`}</span>
                    </div>
                  </div>

                  <div className="mb-[10px]">
                    <div className="flex">
                      <p>
                        <b>Thành tiền:</b>
                      </p>

                      <div className="ml-[19rem] text-red-600">
                        {`${new Intl.NumberFormat("de-DE", {
                          style: "currency",
                          currency: "VND",
                        }).format(cart.totalPrice)}`}{" "}
                      </div>
                    </div>
                    <p>
                      Đã bao gồm VAT, phí đóng gói, phí vận chuyển và các chi
                      phí khác vui lòng xem chính sách vận chuyển
                    </p>
                  </div>

                  <button
                    class="button-35"
                    role="button"
                    type="submit"
                    onClick={placeOrderHandler}
                  >
                    Đặt hàng
                  </button>
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
            </div>
          </div>
          <BottomTab />
        </>
      )}
    </>
  );
}
