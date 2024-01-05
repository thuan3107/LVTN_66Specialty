import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../../../more/Metadata.jsx";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "../Sidebar/Sidebar.jsx";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../../actions/OrderAction.jsx";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../../more/Loader.jsx";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../../constans/OrderConstans.js";
import "./UpdateOrder.css";
import { ToastContainer, toast } from 'react-toastify';


const UpdateOrder = ({ history, match }) => {
  const { order, error, loading } = useSelector((state) => state.myOrderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.deleteOrder);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(match.params.id, myForm));
  };

  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, error, match.params.id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer1">
          {loading ? (
            <Loading />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Đã vận chuyển" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <Typography>Thông tin giao hàng</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Tên khách hàng:</p>
                      <span>{order.shippingInfo && order.shippingInfo.name}</span>
                    </div>
                    <div>
                      <p>Số điện thoại:</p>
                      <span>0
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Địa chỉ:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}`}
                      </span>
                    </div>

                    <div className="orderDetailsContainerBox">
                    <div>Trạng thái
                      <p
                    style={{margin:"5px 14px"}}
                        className={
                          order.orderStatus && order.orderStatus === "Đã vận chuyển"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                  </div>

                  <Typography>Phương thức thanh toán</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p style={{
                          color:"green"
                      }}>
                        Đã thanh toán
                      </p>
                    </div>

                    <div>
                      <p>Tổng tiền:</p>
                      <span>
                      {`${
                    new Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format(order.totalPrice 
                      && order.totalPrice)
                  }`}
                      
                      
                      </span>
                    </div>
                  </div>

                   <Typography>Chi tiết</Typography>


                <div>
                
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                          <span style={{width
                          :"300px"}}>
                            {item.quantity} x 
                            ={" "}
                            {`${new Intl.NumberFormat('de-DE',{style: 'currency',currency:
                            'VND'}).format(item.price)
                              }`}
                             ={" "}
          
                            {`${new Intl.NumberFormat('de-DE',{style: 'currency',currency:
                            'VND'}).format(item.price * item.quantity)
                              }`}
                              
                 
                          </span>
                        </div>
                      ))}
                  </div>
                </div> 
                </div> 
            
              </div>


              
      
              <div
                style={{
                  display: order.orderStatus === "Đã vận chuyển" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Tiến trình đặt hàng</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Chọn tiến trình</option>
                      {order.orderStatus === "Đang xử lý..." && (
                        <option value="Đang vận chuyển">Đang vận chuyển</option>
                      )}

                      {order.orderStatus === "Đang vận chuyển" && (
                        <option value="Đã vận chuyển">Đã vận chuyển</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Cập nhật tiến trình
                  </Button>
                </form>
              </div>
            </div>
          )}
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
    </Fragment>
  );
};

export default UpdateOrder;