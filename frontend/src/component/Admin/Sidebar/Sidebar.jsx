import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import QrCode2Icon from '@mui/icons-material/QrCode2';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
const Sidebar = () => {
  const button = () =>{
    let items = document.querySelectorAll(".Dashboard__item");
}

  return (
    <div className="sidebar" style={{overflow:"scroll"}}>
      <Link to="/">
        <img 
       className="w-full"
        src="https://f17-zpc.zdn.vn/8606657422355013130/f98f2b92e4b930e769a8.jpg" alt="Ecommerce" 
        />
      </Link>
      <Link to="/dashboard">
        <p className="Dashboard__item" onClick={button}>
          <DashboardIcon /> Bảng điều khiển
        </p>
      </Link>
          <Link to="/admin/products">
              <p className="Dashboard__item"><PostAddIcon /> Danh sách sản phẩm</p>
          </Link>

          <Link to="/admin/qrcodes">
              <p className="Dashboard__item"><PostAddIcon /> Danh sách Qrcode</p>
          </Link>
          <Link to="/admin/blogs">
              <p className="Dashboard__item"><PostAddIcon /> Danh sách Blog </p>
          </Link>

          <Link to="/admin/product">
             <p><AddIcon />Tạo sản phẩm</p>
          </Link>

          <Link to="/admin/blog">
             <p><AddIcon />Tạo blog</p>
          </Link>

         
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Đơn hàng
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Người dùng
        </p>
      </Link>

      <Link to="/createqrcode">
        <p>
          <QrCode2Icon />Tạo mã Qrcode
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Đánh giá
        </p>
      </Link>

      <Link to="/admin/quidation">
        <p>
          <AccessTimeIcon />
          Thanh lý
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;