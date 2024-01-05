import React, { useEffect, useState } from "react";
import "./Shipping.css";
import Header from "../../Home/Header";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../CheckStep/CheckoutSteps";
import MetaData from "../../../more/Metadata";
import { saveShippingInfo } from "../../../actions/CartAction";
import BottomTab from "../../../more/BottomTab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setHoten } from "../../../actions/AlanActions";

const Shipping = ({ history, hoten }) => {
  const dispatch = useDispatch();

  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [name, setName] = useState(shippingInfo.name);

  const [city, setCity] = useState(shippingInfo.city);
  const [province, setProvince] = useState(shippingInfo.province);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.error("Số điện thoại nên phải 10 số trở lên");
      return;
    } else {
      dispatch(saveShippingInfo({ address, name, city, province, phoneNo }));
      history.push("/placeorder");
    }
  };

  return (
    <>
      <MetaData title="Shipping Details" />
      <Header />

      <CheckoutSteps activeStep={0} />
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
              value={name}
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
                value={phoneNo}
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

export default Shipping;
