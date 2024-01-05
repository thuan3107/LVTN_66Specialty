import React, { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import {Link} from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
    // eslint-disable-next-line
import Chart from 'chart.js/auto';
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../../more/Metadata";
import Loading from "../../../more/Loader";
import { getAdminProduct } from "../../../actions/ProductActions";
import { getAdminBlog } from "../../../actions/BlogActions";
import { getAllOrders } from "../../../actions/OrderAction";
import { getAllUsers } from "../../../actions/userAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products,loading } = useSelector((state) => state.products);
  const { blogs } = useSelector((state) => state.blogs); 
  const { orders } = useSelector((state) => state.AllOrders);
  const { users } = useSelector((state) => state.allUsers);
   let outOfStock = 0;
  
   products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

    useEffect(() => {
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
        dispatch(getAdminBlog());
        
      }, [dispatch]);    

    let totalAmount = 0;
      orders &&
        orders.forEach((item) => {
          totalAmount += item.totalPrice;
        });

    const lineState = {
        labels: ["Khởi tạo", "Kiếm được "],
        datasets: [
          {
            label: "Doanh thu",
            backgroundColor: ["#3BB77E"],
            hoverBackgroundColor: ["#3BB77E"],
            data: [0, totalAmount],
          },
        ],
      };

     const doughnutState = {
    labels: ["Hết hàng", "Còn hàng"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

    return (
       <>
       {loading ?
       <Loading />
       :(
        <div className="dashboard">
        <MetaData title="Dashboard" />
        <Sidebar />
  
        <div className="dashboardContainer">
          <Typography component="h1">Bảng điều khiển</Typography>
  
          <div className="dashboardSummary">
            <div>
              <p>
                Tổng doanh thu <br /> 
                {`${
                    new Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format(totalAmount)
                  }`}
               
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Sản phẩm</p>
                <p>{products && products.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Đơn hàng</p>
                <p>{orders && orders.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Người dùng</p>
                <p>{users && users.length}</p>
              </Link>
              <Link to="/admin/blog">
                <p>Blog</p>
                <p>{blogs && blogs.length}</p>
              </Link>
            </div>
          </div>
  
          <div className="lineChart">
            <Line data={lineState} />
          </div>
  
          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
       )
       }
       </>
    );
  };
export default Dashboard