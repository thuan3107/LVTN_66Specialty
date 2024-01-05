import React, { useEffect, useState } from "react";
import Footer from "../../Footer";
import Header from "../Home/Header";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../more/Loader";
import ProductCard from "./ProductCard";
import { useHistory } from "react-router-dom";
import { clearErrors, getProduct } from "../../actions/ProductActions";
import Pagination from "react-js-pagination";
import "./Product.css";
import MetaData from "../../more/Metadata";
import Typography from"@material-ui/core/Typography"
// import { useAlert } from "react-alert";
import BottomTab from "../../more/BottomTab";
import DropDown from "./DropDown";
import { categoriesData } from "../Admin/Product/sidebarData";
import axios from "axios";
import Sidebar from "../Admin/Product/Sidebar";
import ListIcon from '@mui/icons-material/List';
const Agriculture = ({ match }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [category,setCategory] = useState("");
  const [childrens,setChildrens] = useState("");
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

  
  const [totalPages, setTotalPages] = useState(1);
  const [product, setProduct] = useState([]);
  const {products,loading, error} = useSelector((state) => state.products);

  const filter = async()=>{
    const response = await axios.get(
      `/api/v2/products?page=${currentPage}&limit=8&subcategory=${subcategory}&childcategory=${childcategory}`
    );
    if (subcategory !== null ) {

      setProduct(response.data.products);
      setTotalPages(response.data.totalPages);
    
    }else if(childcategory !==null && subcategory ===null){
      setProduct(response.data.products);
      setTotalPages(response.data.totalPages);
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `/api/v2/products?page=${currentPage}&limit=8&subcategory=Nông sản`
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
    
    if(subcategory!== null || childcategory !==null){
        filter()
    }else{
      fetchProducts();
    }
    
  }, [dispatch, keyword, category,  error, childrens,currentPage, childcategory,subcategory]);

  
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
        <MetaData title="Products" />
          <Header className="relative" activeHeading={3}/>
          <div className="z-30 absolute ml-[1em] mt-[-6rem] z-5" 
          >
               <Sidebar 
                categoriesData={categoriesData}
             
               />
            
            </div>


          <div>
            <div className="z-20 flex justify-center">
                <div className=" grid grid-cols-1 first-line: gap-[20px] md:grid-cols-2 
                                md:gap-[20px] lg:grid-cols-4 lg:gap-[20px] 
                                  mb-1 " >
                                
                                {product.map((product, index) => (
                                    <ProductCard product={product} key={index} />
                                  ))}
                             </div>
                                  {product && product.length === 0 ? (
                                  <div className="container" id="container">
                                    
                                        {products &&
                                        
                                        products
                                        .filter((product) => product.subcategory === "Thực phẩm chế biến"
                                     )
                                        .map((product) =>(
                                          <ProductCard key={product._id} product={product} />
                                        ))}
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

export default Agriculture;
