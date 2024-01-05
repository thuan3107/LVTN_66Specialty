import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import MenuIcon from '@mui/icons-material/Menu';
const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useHistory();
  const submitHandle = (i) => {
    navigate.push(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();
  };
 

  return (
    <>
      <div className="px-[1rem] py-[1rem] w-[230px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
        {categoriesData &&
          categoriesData.map((i, index) => (
            <div key={index} className={`w-[29vh] mb-[10px] flex`}>
              <img
                src={i.image_Url}
                style={{
                  width: "25px",
                  height: "35px",
                  userSelect: "none",
                }}
                alt=""
                onClick={() => submitHandle(i)}
              />

              <div className="w-full mx-[20px] text-[14px] cursor-pointer select-none">
                {i.title}
                {i.childrens && (
                  <ul>
                    {i.childrens.map((item) => (
                      <li key={item.id}>
                        <a to={item.path}>{item.title}</a>
                      </li>
                    ))}
                  </ul>
                )}
              
              
              </div>
            </div>
          ))}
      </div>
       

    </>
  );
};

export default DropDown;
