import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "../Product/newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../../../more/Metadata";
import SideBar from "../Sidebar/Sidebar";
import {
  getAllOrders,
  clearErrors,
  deleteOrder,
} from "../../../actions/OrderAction";
import { DELETE_ORDER_RESET } from "../../../constans/OrderConstans";
import { ToastContainer, toast } from 'react-toastify';


const AllOrder = ({ history }) => {
  const dispatch = useDispatch();

  const { error, orders } = useSelector((state) => state.AllOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.deleteOrder);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Id đơn hàng", minWidth: 150, flex: 0.4 },


    {
      field: "phone",
      headerName: "SĐT",
      type: "string",
      minWidth: 150,
      flex: 0.3,
      renderCell: (params) => {
       
        return (
          <Fragment>
          <span style={{marginLeft:"12px"}}>0{params.row.phone}</span>
          </Fragment>
          
        );
      },
    },
  

    {
      field: "address",
      headerName: "Địa chỉ",
      type: "string",
      minWidth: 200,
      flex: 0.4,
      renderCell: (params) => {
       
        return (
          <Fragment>
          <span style={{marginLeft:"12px"}}>{params.row.address}</span>
          </Fragment>
          
        );
      },
    },
    {
      field: "itemsQty",
      headerName: "Thành tiền",
      type: "string",
      minWidth: 150,
      flex: 0.4,
      renderCell: (params) => {
       
        return (
          <Fragment>
          <span style={{marginLeft:"12px"}}> {`${
                    new Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format(params.row.amount)
                  }`}</span>
          </Fragment>
          
        );
      },
    },
  
  
    {
    
      field: "status",
      headerName: "Trạng thái",
      minWidth: 150,
      flex: 0.4,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Đã vận chuyển"
          ? "greenColor"
          : "redColor";
      },
      renderCell: (params) => {
       
        return (
          <Fragment>
          <span style={{marginLeft:"14px"}}>{params.row.status}</span>
          </Fragment>
          
        );
      },
    },


    {
      field: "actions",
      flex: 0.3,
      headerName: "Chức năng",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
            <i class="fa-regular fa-pen-to-square" style={{color: "#0c121d"}} ></i>
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
             <i class="fa-solid fa-trash"></i>
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
        address: item.shippingInfo.province,
        method: item.paymentInfo1.method,
        phone: item.shippingInfo.phoneNo
      });
    });

  return (
    <Fragment>
      <MetaData title={`Danh sách đơn hàng - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">Danh sách đơn hàng</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
        
            autoHeight
          />
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

export default AllOrder;