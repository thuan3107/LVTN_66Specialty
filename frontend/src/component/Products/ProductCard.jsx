import React from "react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Link } from "react-router-dom";
import "../Home/Home.css";
import { Rating } from "@material-ui/lab";
const ProductCard = ({ product }) => {
  const options = {
    value: product?.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <>
      <Link to={`/product/${product._id}`} className="hover:no-underline">
        <div className="ProductCard ">
          <div className="h-[15rem] ">
            <img
              style={{ margin: "15px 20px", width: "160px" }}
              src={product.images[0].url}
              alt=""
            />

            <span
              style={{
                margin: "0px",
                fontWeight: "400",
                color: "252A2B",
                fontSize: "15px",
                overflow: "hidden",
              }}
            >
              {product.name}
            </span>
          </div>
          <div className="">
            <Rating {...options} />
            <span>({product.numOfReviews} Đánh giá)</span>
          </div>
          <div>
            <div className="offerPriceBox flex  mb-3 w-[200px] ">
              <span
                style={{ color: "#333333", fontWeight: "600" }}
              >{`${new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "VND",
              }).format(product.price)}`}</span>
              <h1
                className="discountPrice"
                style={{
                  paddingLeft: "2.5vmax",
                  fontSize: ".9vmax",
                  paddingBottom: "0",
                }}
              >
                {product.offerPrice > 0
                  ? `${new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.offerPrice)}`
                  : ""}
              </h1>
            </div>
          </div>
          <div
            className="flex justify-center w-[95%] hover:no-underline hover:border-orange-600 
          hover:scale-105 hover:text-white  duration-200 ease"
          >
            <button class="button-48 " role="button">
              <span class="text mt-3 ">
                <LocalMallIcon id="icon-mall" />
                MUA NGAY
              </span>
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
