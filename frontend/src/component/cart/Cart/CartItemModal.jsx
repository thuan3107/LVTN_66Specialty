import React from "react";
import { Link } from "react-router-dom";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
const CartItemModal = ({ item, deleteCartItems }) => {
  return (
    <div className=" mt-[20px] ">
      <div className="flex justify-center">
        <span href="">
          <img className="w-[150px]" src={item.image} alt="#" />
        </span>
        <div style={{ width: "30rem" }}>
          <div className="text-[16px]  ">
            <Link to={`/product/${item.product}`}>{item.name}</Link>
            <span
              className="ml-[30px]"
              onClick={() => deleteCartItems(item.product)}
            >
              <DeleteSweepIcon />
            </span>
          </div>
          <div className="">
            <span className="text-md ">{`${new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "VND",
            }).format(item.price)}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemModal;
