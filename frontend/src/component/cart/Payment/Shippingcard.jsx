import React, { useState } from "react";
import "./Shipping.css";
import Header from "../../Home/Header";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../CheckStep/CheckoutSteps";
import MetaData from "../../../more/Metadata";
import { saveShippingInfo } from "../../../actions/CartAction";
import BottomTab from "../../../more/BottomTab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SpeechRecognition from "../../AlanAi/SpeechRecognition";
const Shippingcard = ({ history, hoten, address, phone, city, province }) => {
  const dispatch = useDispatch();
  const [address1, setAddress] = useState("");
  const [name1, setName] = useState("");
  const [city1, setCity] = useState("");
  const [province1, setProvince] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phone.length < 10 || phone.length > 10) {
      toast.error("Số điện thoại nên phải 10 số trở lên");
      return;
    } else {
      dispatch(saveShippingInfo({ address, hoten, city, province, phone }));
      history.push("/placeorder");
    }
  };

  return (
    <>
      <MetaData title="Shipping Details" />
      <Header />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Thông tin giao hàng</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <input
              type="text"
              placeholder="Vui lòng nhập tên người nhận"
              value={hoten}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <div className="write">
              <input
                type="text"
                placeholder="Vui lòng nhập địa chỉ"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="text"
                placeholder=" Nhập vào số phone"
                value={phone}
                required
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>

            <div className="write">
              <input
                type="text"
                placeholder=" Nhập vào quận/thành phố"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                type="text"
                placeholder=" Nhập vào tỉnh"
                value={province}
                required
                onChange={(e) => setProvince(e.target.value)}
              />
            </div>

            <button type="submit" value="Continue" className="shippingBtn">
              Tiếp theo
            </button>
          </form>
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
  );
};

export default Shippingcard;
