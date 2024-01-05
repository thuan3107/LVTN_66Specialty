import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="Footer flex space__around pz__15" style={{"borderTop":".3px solid rgba(21,21,21,0.5)"}}>
      {/* Footer 1st part */}
      <div className="footer1st">
        <h5>Về chúng tôi</h5>
       
        <div className="location ml-[25px] flex py__10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            class="bi bi-geo-alt icon__color"
            viewBox="0 0 16 16"
          >
            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
             <b>Địa chỉ:</b>
              <h6 className="text-md mt-[4px] mx-[5px]">3/2, phường Xuân Khánh, Q.Ninh Kiều, Cần Thơ</h6>
        </div>

        <div className="location ml-[25px] flex py__10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            right="5"
            fill="currentColor"
            class="bi bi-geo-alt icon__color"
            viewBox="0 0 16 16"
          >
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
          </svg>
          <b >Email:</b>
          <h6 className="text-md mt-[3px] mx-[5px]">congty@gmail.com</h6>
        </div>

        <div className="location ml-[25px] flex py__10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-geo-alt icon__color"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z" />
          </svg>
          <b>Liên hệ</b>
          <h6 className="text-md mt-[3px] mx-[5px]">(+84) 9321106</h6>
        </div>

       
      </div>
      {/* Footer 2nd part */}
      <div className="mobile">
        <div className="footer__2nd__part">
             <h5>Hỗ trợ khách hàng</h5>
            <ul >
                  <li className="text-md font-medium mb-[8px] pl-[15px]"><a >Tìm kiếm</a></li>
                  <li className="text-md font-medium mb-[8px] pl-[15px]"><a>Giới thiệu</a></li>
                  <li className="text-md font-medium mb-[8px] pl-[15px]"><a href="">Điều khoản dịch vụ</a></li>
                  <li className="text-md font-medium mb-[8px] pl-[15px]"><a href="">Chính sách bảo mật</a></li>
            </ul>
        </div>
       
       <div className="footer__2nd__part">
             <h5>Theo dõi</h5>
             <ul>
                  <li className="text-md font-medium mb-[8px] pl-[15px]"><a >FaceBook</a></li>
                  <li className="text-md font-medium mb-[8px] pl-[15px] "><a>Intagram</a></li>
                  <li className="text-md font-medium mb-[8px] pl-[15px]"><a href="">Youtube</a></li>
                  
            </ul>
        </div> 
     
    
        </div>
    </div>
  );
};

export default Footer;
