// eslint-disable-next-line
import React, { useRef, useState, useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "./Navbar";
import logo from "./logo.png";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SpeechRecognition from "../AlanAi/SpeechRecognition";
import ModalView from "../ModalView/ModalView";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  height:350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Header = ({ activeHeading }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const searchResultsRef = useRef(null);
  const divRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isToggled, setIsToggled] = useState(false);
  const { favouriteItems } = useSelector((state) => state.favourite);
  const [searchData, setSearchData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.products);

  const switcherTab = useRef(null);
  document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 70) {
        navbar?.classList.add("active");
      } else {
        navbar?.classList.remove("active");
      }
    });
  });
  useEffect(() => {
    const handleMouseDown = (event) => {
      // Kiểm tra xem click có diễn ra bên ngoài element hay không
      if (divRef.current && !divRef.current.contains(event.target)) {
        setIsToggled(false);
      }
    };

    // Đăng ký sự kiện mousedown cho toàn bộ document
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      // Hủy đăng ký sự kiện khi component unmount
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []); // Chạy một lần khi component được mount
  useEffect(() => {
    const handleBodyClick = (e) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(e.target)
      ) {
        setSearchData(null);
      }
    };
    document.body.addEventListener("click", handleBodyClick);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      products &&
      products.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <SpeechRecognition />
          </Box>
        </Modal>
      </div>
      <div className="Header relative">
        <div className="Header__topbar space__beetween ">
          <div className="w-[250px] pxy-8 flex mb-2 ml-8 ">
            <a href="" className="w-[160px]">
              <img
                style={{ width: "150px", height: "50px", objectFit: "cover" }}
                src={logo}
                alt="#"
              />
            </a>
          </div>

          <div
            className=" flex pz__10 space__beetween"
            ref={switcherTab}
            id="navbar"
          >
            <div
              className="navigation"
              style={{
                padding: "3px 50px",
              }}
            >
              <div className="w-[40vmax] relative">
                <input
                  type="search"
                  placeholder="Tìm kiếm sản phẩm"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="h-[43px]  w-full px-2 border-[white] border-[2px] rounded-md"
                />
                <SearchIcon
                  size={20}
                  className="absolute right-2 top-2.5 cursor-pointer"
                />

                {searchData && searchData.length !== 0 ? (
                  <div
                    className="border-b-gray-40 absolute max-h-[55vh] border-blue-300 mt-[5px] flow-none 
                    overflow-hidden bg-white shadow-sm-2 z-[9] p-4 "
                    ref={searchResultsRef}
                  >
                    {searchData &&
                      searchData.map((i, index) => {
                        return (
                          <Link
                            to={`/product/${i._id}`}
                            className="hover:no-underline"
                          >
                            <div
                              className="w-[75vh] flex items-start-py-"
                              style={{
                                borderBottom: "1px solid #e5f7db",
                                overflow: "hidden",
                              }}
                            >
                              <div className="w-[90%] py-[12px] px-0  ">
                                <a className=" text-[17px] text-[#252A2B]  mr-10">
                                  {i.name}
                                </a>
                                <span className="block text-[14px]-500  ">{`${new Intl.NumberFormat(
                                  "de-DE",
                                  { style: "currency", currency: "VND" }
                                ).format(i.price)}`}</span>
                              </div>
                              <img
                                src={`${i.images[0].url}`}
                                alt=""
                                className="w-[2.5em] h-[auto] mr-[15px]"
                              />
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                ) : null}
              </div>
            </div>
            <div onClick={handleOpen}>
              <img
                style={{ width: "30px" }}
                src="https://cdn-icons-png.flaticon.com/128/3128/3128290.png"
                alt=""
              />
            </div>

            <div className="rightOption flex align__items__center">
              <div className="heart__products flex pointer relative">
                <Link to="/favourites">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-heart pxz__20 white"
                    viewBox="0 0 16 16"
                    background="var(--clr-bg-grey)"
                  >
                    <path
                      d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 
                        2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-
                        4.385C13.486.878 
                        10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 
                        1.143c.06.055.119.112.176.171a3.12 
                        3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                    />
                  </svg>
                </Link>
                <div
                  className="heart__numbers"
                  style={{
                    height: "20px",
                    width: "20px",
                    borderRadius: "50%",
                    backgroundColor: "#95C730",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    top: "-30%",
                    right: "3.5%",
                  }}
                >
                  <span>{favouriteItems.length}</span>
                </div>
              </div>
              <div className="cart__items flex align__items__center">
                <div className="cart__items flex pointer relative">
                  {/* <Link to=""> */}
                  <svg
                    onClick={handleToggle}
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    right="100"
                    height="25"
                    fill="currentColor"
                    class="bi bi-cart3 pxz__20 white"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 
                0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 
                0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                    />
                  </svg>

                  {/* </Link> */}
                  <div
                    className="heart__numbers"
                    style={{
                      height: "20px",
                      width: "20px",
                      borderRadius: "50%",
                      backgroundColor: "#95C730",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                      top: "-30%",
                      right: "5%",
                    }}
                  >
                    <span className=" fixed">{cartItems.length}</span>

                    <div ref={divRef} style={{ height: "1rem" }}>
                      {isToggled && (
                        <ModalView style={{ border: "1px solid red" }} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="user__account flex pointer">
                <Link to="/login">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    class="bi bi-person pxz__20 white"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Navbar active={activeHeading} />
    </>
  );
};

export default Header;
