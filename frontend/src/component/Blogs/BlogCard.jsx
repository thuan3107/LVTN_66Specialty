import React from "react";
import { Link } from "react-router-dom";
import "../Home/Home.css";
import { Rating } from "@material-ui/lab";
const BlogCard = ({ blog }) => {
  const options = {
    value: blog?.ratings,
    readOnly: true,
    precision: 0.5,
  };
  
  return (
    <>
    
      <Link to= {`/blog/${blog._id}`}
            style={{
              lineHeight: "1.3",
              marginTop: "0.1em",
              marginBottom: "0.1em",
              color: "#E6297C"
            }}
            className="relative flex w-[40vh] h-[20vmax] flex-col hover:no-underline
                        m-[1vmax] transition-all  ease duration-1000 hover:scale-90 mb-[-5vmax] ">
                          
            <img src={blog.images[0].url}
               className="  h-[150px]"
            />
            <p className="text-lg">{blog.title}</p>
            
          </Link>
    </>
  );
};

export default BlogCard;
