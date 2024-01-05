import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/ProductActions.jsx";
import Footer from "../../Footer.jsx";
import MetaData from "../../more/Metadata.jsx";
import Header from "../Home/Header.jsx";
import "./style.css";
import { Rating } from "@material-ui/lab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addItemsToCart } from "../../actions/CartAction.jsx";
import { addFavouriteItemsToCart } from "../../actions/FavouriteAction.jsx";
import ReviewCard from "./ReviewCard.jsx";
import { NEW_REVIEW_RESET } from "../../constans/ProductConstans";
import BottomTab from "../../more/BottomTab.jsx";
import Loading from "../../more/Loader.jsx";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import LocalMallIcon from '@mui/icons-material/LocalMall';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 600,
  p: 4,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
   <>
     <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
   </>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const ProductDetails = ({ match, history,props }) => {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); 
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { isAuthenticated } = useSelector((state) => state.user);

  const reviewSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    {
      isAuthenticated !== true ? history.push(`/login?redirect=/`) : <></>;
    }

    dispatch(newReview(myForm));

    {
      comment.length === 0
        ? toast.error("Please fill the comment box")
        : toast.success("Review done successfully reload for watch it");
    }
    dispatch({ type: NEW_REVIEW_RESET });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert]);

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Increase quantity
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product.Stock <= quantity) 
    return toast.error("Số lượng còn lại đã hết! ");
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    if (product.Stock > 0) {
      dispatch(addItemsToCart(match.params.id, quantity));
      toast.success("Sản phẩm đã thêm vào giỏ hàng");
    } else {
      toast.error("Sản phẩm đã hết hàng!");
    }
  };

  const addToFavouriteHandler = () => {
    dispatch(addFavouriteItemsToCart(match.params.id, quantity));
    toast.success("Sản phẩm đã thêm vào mục yêu thích");
  };

  const handleChange1 = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`${product.name}`} />
          <Header />
          <div className="ProductDetails">
            <div className="first__varse">
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            {/* Đánh giá */}
            <div className="varse__2">
              <div className="detailsBlock-1">
                 <h2 >{product.name}</h2>
            
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span>({product.numOfReviews} Đánh giá )</span>
              </div>
             
              <div className="detailsBlock">
                <div
                  style={{
                    display: "flex",
                    color:"red"
                  }}
                >
                  <h1> {`${
                    new Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format(product.price)
                  }`}
                  
                  </h1>

                  <h1 className="discountPrice">
                    {product.offerPrice 
                  
                    > 0 ? `${ new Intl.NumberFormat('de-DE',{style: 'currency',currency: 
                    'VND'}).format(product.offerPrice)}` : ""}
                  </h1>
                </div>
                <div className="detailsBlock-3-1">
                  <div >
                    <div className="cartInput">
                    <button onClick={decreaseQuantity}>-</button>
                    <input type="number" style={{color:"black"}}readOnly value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  </div>
                   <div className="Qrcode">

                   <img  onClick={handleOpen} style={{border:"3px solid #086D39",marginLeft:"35px", marginTop:"15px",marginBottom:"6px", height:"100px", width:"110px"}} src={product.qrcode} alt="" />
                      <p style={{
                        padding:"0px 14px",
                        fontSize:"15px",
                        marginLeft:"30px",
                        color:"white",
                        background:"#086D39",
                        height:"25px",borderRadius:"25px", width:"120px"}}>
                        
                        <QrCodeScannerIcon/>

                        Scan me!</p>
                   </div>
                       
                </div>
                <p className="stock__meta" style={{ paddingBottom: ".5vmax" }}>
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "Tình trạng: Hết hàng" : "Tình trạng: Còn hàng"}
                  </b>
                </p>
              
                <div
                  style={{
                    // display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="wishlist"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      padding: "15px 5px",
                     
                    }}
                    onClick={addToFavouriteHandler}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                    </svg>
                    <span
                      className="cartBtn"
                      style={{ opacity: 0.7, padding: "0px 5px" }}
                    >
                  Thêm vào yêu thích
                    </span>
                  </div>

                    <div>
                      <button   onClick={addToCartHandler}  class="button-order" role="button">
                        <span class="text"> <LocalMallIcon className="icon-mall "
                        />  
                          Thêm vào giỏ
                        </span>
                      </button>
                    </div>

                  
              
               
                </div>
              </div>
            </div>
            
          </div>

          <div>
            {/* Reviews */}
              
            <Box  className="comment"  sx={{margin:"0px 30px  ", width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange1} aria-label="basic tabs example">
                  <Tab label="Chi tiết" {...a11yProps(0)} />
                  <Tab label="Đánh giá" {...a11yProps(1)} />
                
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
              <div
                  className="Description"
                  style={{
                    display: "flex",
                    alignItems: "center",
                     lineHeight:" 1.5",
                     fontWeight:" 400",
                     fontSize: "20px",
                     width:"95%",
              
                    
                     opacity: "1",
                    //  borderBottom: "1px solid rgb(153, 153, 153)",
                    fontFamily: "Poppins, sans-serif"
                  }}
                >
                 
                 <p dangerouslySetInnerHTML={{__html: product.description}} ></p>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
              <div
              style={{
                padding: "1vmax",
              }}
            >
              {product.reviews && product.reviews[0] ? (
                <div className="review__option">
                  {product.reviews &&
                    product.reviews.map((review) => (
                      <ReviewCard review={review} />
                    ))}
                </div>
              ) : (
                <p
                  className="noReviews"
                  style={{
                    fontFamily: "Poppins,sans-serif",
                  }}
                >
                 Chưa đánh giá *
                </p>
              )}
              <div
                style={{
                  padding: "0px 2vmax",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: "1.8vmax",
                    fontWeight: "700",
                    lineHeight: 1,
                    letterSpacing: "-.0125em",
                    color: "#222",
                    fontFamily: "Poppins,sans-serif",
                  }}
                >
                  Viết đánh giá
                </span>
                <div
                  style={{
                    margin: "1vmax 0",
                    flexDirection: "column",
                    display: "flex",
                  }}
                >
                  <div>
                    <span
                      style={{
                        color: "#222",
                        fontFamily: "Poppins,sans-serif",
                        padding: "1vmax 0",
                      }}
                    >
                      Xếp hạng *
                    </span>
                    <Rating
                      onChange={(e) => setRating(e.target.value)}
                      value={rating}
                      size="large"
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    ></div>
                  </div>
                </div>
                <textarea
                  cols="30"
                  rows="6"
                  placeholder="Comment *"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{
                    maxWidth: "100%",
                    color: "#111",
                    borderColor: "#e1e1e1",
                    background: "#fff",
                    borderRadius: "0.3rem",
                    outline: "none",
                    padding: "5px",
                    fontSize: "1.2vmax",
                    lineHeight: "1.5",
                    resize: "none",
                    display: "block",
                  }}
                ></textarea>
                <button
                  type="submit"
                  style={{
                    width: "12vmax",
                    margin: "1vmax 0px",
                    fontFamily: "sans-serif",
                    padding: "10px 15px",
                    background: "#3BB77E",
                    border: "none",
                    cursor: "pointer",
                    color: "#fff",
                  }}
                  onClick={reviewSubmitHandler}
                >
                  Đánh giá
                </button>
              </div>
    
            </div>
    
              </TabPanel>
             
            </Box>

          </div>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
      >
          <Box sx={style}>
            <img style={{ margin:"100px 200px", height:"405px"}} src={product.qrcode} alt="" />
          </Box>
       </Modal>

          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Footer />
          <BottomTab />


         
        </>
      )}
    </>
  );
};

export default ProductDetails;