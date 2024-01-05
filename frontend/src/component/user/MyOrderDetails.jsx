import React, { useEffect, useState } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../more/Metadata.jsx";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/OrderAction";
import Loading from "../../more/Loader.jsx";
import BottomTab from "../../more/BottomTab.jsx";
import "./Bill.css";
// import { PayPalButton } from "react-paypal-button-v2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const MyOrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector(
    (state) => state.myOrderDetails
  );
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const downloadPDF = () => {
    const capture = document.querySelector(".orderDetailsPage");
    setLoader(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save("hoadon.pdf");
    });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography
                className="mx-[5rem] flex justify-center text-red-600"
                component="h1"
              >
                Hóa đơn
              </Typography>
              <div className=" mb-[15px]  w-[100%]">
                <h4 className="text-md mb-[10px]">
                  Mã đơn hàng: {order && order._id}
                </h4>
                <h4 className="text-md">
                  Ngày đặt: {order && formatDate(order.createdAt)}
                </h4>
              </div>
              <Typography>Thông tin giao hàng</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Tên người nhận:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Số điện thoại:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>

                <div>
                  <p>Địa chỉ:</p>
                  <span>
                    {order.shippingInfo && `${order.shippingInfo.address}`}
                  </span>
                </div>

                <div>
                  <p>Phương thức thanh toán:</p>
                  <span>{order.paymentInfo1 && order.paymentInfo1.method}</span>
                </div>

                <div></div>
              </div>

              <Typography>Trang thái đơn hàng</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Mục đơn hàng:</Typography>
              <div className="orderDetailsCartItemsContainer">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Tên sản phẩm</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Giá</th>
                      <th scope="col">Tạm tính</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <tr key={item.Offer}>
                          <td>
                            <Link to={`/product/${item.Offer}`}>
                              {" "}
                              {item.name}
                            </Link>
                          </td>
                          <td>{item.quantity}</td>
                          <td>
                            {`${new Intl.NumberFormat("de-DE", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.price)}`}
                          </td>
                          <td>
                            <b>{`${new Intl.NumberFormat("de-DE", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.price * item.quantity)}`}</b>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className=" pl-[19vmax]">
                  <h3 className="mr-[10px]">Tổng tiền:</h3>
                  <b>
                    {`${new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "VND",
                    }).format(order.totalPrice)}`}
                  </b>
                </div>
              </div>
            </div>
          </div>
          <div className="  pl-[10rem] border receipt-actions-div">
            <div className="actions-right">
              <button
                className="receipt-modal-download-button"
                onClick={downloadPDF}
                disabled={!(loader === false)}
              >
                {loader ? (
                  <span>Xuất hóa đơn </span>
                ) : (
                  <span>Xuất hóa đơn</span>
                )}
              </button>
            </div>
          </div>
        </>
      )}

      <BottomTab />
    </>
  );
};
const formatDate = (dateString) => {
  const dateObject = new Date(dateString);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1; // Tháng trong Date bắt đầu từ 0
  const year = dateObject.getFullYear();
  return `${day}/${month}/${year}`;
};
export default MyOrderDetails;
