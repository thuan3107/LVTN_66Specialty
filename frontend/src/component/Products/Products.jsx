import React, { useEffect, useState } from "react";
import Footer from "../../Footer";
import { useHistory } from "react-router-dom";
import Header from "../Home/Header";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../more/Loader";
import ProductCard from "./ProductCard";
import { clearErrors, getProduct } from "../../actions/ProductActions";

import Pagination from "react-js-pagination";
import axios from "axios";
import "./Product.css";
import MetaData from "../../more/Metadata";
import BottomTab from "../../more/BottomTab";

import { categoriesData } from "../Admin/Product/sidebarData";
import Sidebar from "../Admin/Product/Sidebar";

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [childrens, setChildrens] = useState("");

  const [totalPages, setTotalPages] = useState(1);
  const keyword = match.params.keyword;

  const history = useHistory();
  const queryParams = new URLSearchParams(
    history.location.search.split("?")[1]
  );
  const queryParams1 = new URLSearchParams(
    history.location.search.split("?")[1]
  );
  const queryParams2 = new URLSearchParams(
    history.location.search.split("?")[1]
  );
  const subcategory = queryParams.get("category");
  const childcategory = queryParams1.get("childcategory");
  const smallcategory = queryParams2.get("child");

  const [product, setProduct] = useState([]);
  const { loading, error } = useSelector((state) => state.products);
  const filter = async () => {
    const response = await axios.get(
      `/api/v2/products?page=${currentPage}&limit=8&subcategory=${subcategory}`
    );
    if (subcategory !== null) {
      setProduct(response.data.products);
      setTotalPages(response.data.totalPages);
    } else if (childcategory !== null && subcategory === null) {
      setProduct(response.data.products);
      setTotalPages(response.data.totalPages);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `/api/v2/products?page=${currentPage}&limit=8&subcategory=Thực phẩm chế biến`
      );
      setProduct(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, category, childrens));

    if (subcategory !== null || childcategory !== null) {
      filter();
    } else {
      fetchProducts();
    }
  }, [
    dispatch,
    keyword,
    category,
    alert,
    error,
    childrens,
    currentPage,
    childcategory,
    subcategory,
  ]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Products" />
          <Header className="relative" activeHeading={2} />
          <div className="z-30 absolute ml-[1em] mt-[-6rem] z-5">
            <Sidebar categoriesData={categoriesData} />
          </div>

          <div>
            <div className="z-20 flex justify-center">
              <div
                className=" grid grid-cols-1 first-line: gap-[20px] md:grid-cols-2 
                                md:gap-[20px] lg:grid-cols-4 lg:gap-[20px] 
                                  mb-1 "
              >
                {product &&
                  product.map((i, index) => (
                    <ProductCard product={i} key={index} />
                  ))}
              </div>
              {product && product.length === 0 ? (
                <div className="container" id="container">
                  Không có sản phẩm cần tìm
                </div>
              ) : null}
            </div>

            <div
              className="pagination__box"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "6vmax",
              }}
            >
              <Pagination
                activePage={currentPage}
                style
                itemsCountPerPage={6}
                totalItemsCount={totalPages * 10}
                pageRangeDisplayed={3}
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
                prevPageText="<<"
                nextPageText=">>"
              />
            </div>
          </div>

          <Footer />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default Products;
