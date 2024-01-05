import React, { useState } from "react";
import CheckoutSteps from "../CheckStep/CheckoutSteps.jsx";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../../more/Metadata.jsx";
import { Typography } from "@material-ui/core";
import Header from "../../Home/Header.jsx";
import "./payment.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../../more/Loader.jsx";
import { savePaymentMethod } from "../../../actions/CartAction.jsx";

const Payment = ({ history }) => {
  const dispatch = useDispatch();
  const { paymentInfo1 } = useSelector((state) => state.cart);
  const [method, setMethod] = useState(paymentInfo1.method);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error, loading } = orderCreate;
  if (!paymentInfo1) {
    history.push("/shipping");
  }
  const submitHandler = async (e) => {
    dispatch(savePaymentMethod({ method }));
    e.preventDefault();
    history.push("/placeorder");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Payment" />
          <Header />
          <CheckoutSteps activeStep={2} />
          <div className="paymentContainer">
            <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
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
                    src="https://downloadlogomienphi.com/sites/default/files/logos/download-logo-vnpayqr-
                  mien-phi.jpg"
                    alt=""
                  />
                  VnPay
                </span>
              </div>

              <button class="button-80" role="button">
                Tiếp tục
              </button>
            </form>
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
        </>
      )}
    </>
  );
};

export default Payment;
