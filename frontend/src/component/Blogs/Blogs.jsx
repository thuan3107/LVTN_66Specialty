import React, { useEffect, useState } from "react";
import Footer from "../../Footer";
import Header from "../Home/Header";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../more/Loader";
import BlogCard from "./BlogCard";
import { clearErrors, getBlog } from "../../actions/BlogActions";
import Pagination from "react-js-pagination";
import MetaData from "../../more/Metadata";
import BottomTab from "../../more/BottomTab";
import axios from "axios";
const Blogs = ({ match }) => {
  const dispatch = useDispatch();
 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const keyword = match.params.keyword;

  const [blog, setBlog] = useState([]);
  const { loading, error } = useSelector((state) => state.blogs);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        `/api/v2/blogs?page=${currentPage}&limit=8`
      );
      setBlog(response.data.blogs);
      setTotalPages(response.data.totalPages);
     
    } catch (error) {
      console.error("Error fetching blogs: ", error);
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
    dispatch(getBlog(keyword));
      fetchBlogs();
    

  }, [dispatch, keyword, alert, error,currentPage]);

 



  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
        <MetaData title="Blogs" />
          <Header activeHeading={4}/>

        <div>
             {blog.length === 0 ?
             <span style={{
               display:"block",
               padding:"30px 0",
               fontSize:"1.5rem",
               flex:".9",
               textAlign:"center"
             }}>Không có bài blog nào hết!</span>
             : 
             <div
             className="products"
             style={{
               display: "flex",
               flexWrap: "wrap",
               justifyContent: "center",
               flex:".9"
             }}
           >
             {blog &&
               blog.map((blog) => (
                 <BlogCard key={blog.id} blog={blog} />
               ))}
           </div>
              }
             
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
        
          <Footer />
          <BottomTab />
        
        </>
      )}
    </>
  );
};

export default Blogs;
