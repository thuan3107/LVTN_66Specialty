import React, { Fragment, useEffect, useState ,useRef } from "react";
import "./newProduct.css"; 
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateProduct, getProductDetails } from "../../../actions/ProductActions";
import { Button } from "@material-ui/core";
import MetaData from "../../../more/Metadata";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DiscountIcon from "@material-ui/icons/LocalOffer";
import Sidebar from "../Sidebar/Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../../constans/ProductConstans";
import WarehouseIcon from '@mui/icons-material/Warehouse';
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from 'react-toastify';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { categoriesData } from "./sidebarData";
import ReactQuill,{ Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from 'quill-image-resize-module-react';


Quill.register('modules/imageResize', ImageResize);
const modules = {
  toolbar: [
    [{ 'font': [] }],
    [{ header: [1, 2,3, false] }],
    [{size: []}],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", 'video'],
    [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
    ["clean"],
    
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize', 'Toolbar']
  },
  
};

const formats = [
  'font',
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  'expand',
  "align",
  "color",
  "background",
];

const UpdateProduct = ({ history, match }) => {

  const dispatch = useDispatch();
  const { error, product } = useSelector((state) => state.productDetails);

  const quillRef = useRef(null);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.deleteProduct);
  const [selectedCategory, setSelectedCategory] = useState('');
 
  const [selectedChild, setSelectedChild] = useState('');
  const [selectedGrandchild, setSelectedGrandchild] = useState('');
  const [selectedSmall, setSelectedSmall] = useState('');
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [offerPrice, setOfferPrice] = useState("");
  const [consignment, setConsignment] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [expiration, setExpiration] = useState();
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [qrcode, setQRcode] = useState([]);
 
  const productId = match.params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setQRcode(product.qrcode);
      setDescription(product.description);
      setStatus(product.status);
      setPrice(product.price);
      setConsignment(product.consignment);
      setStock(product.Stock);
      setOldImages(product.images);
      setExpiration(product.expiration);
      setOfferPrice(product.offerPrice);
      setSelectedCategory(product.setSelectedCategory);
      setSelectedChild(product.subcategory);
      setSelectedGrandchild(product.childcategory)
      setSelectedSmall(product.smallcategory)
     
    
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Cập nhật thành công");
      history.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const handleChange  = (content, delta, source, editor) => {
    console.log(editor.getHTML()); // html 사용시
    // console.log(JSON.stringify(editor.getContents())); // delta 사용시
    setDescription(editor.getHTML());
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setQRcode(reader.result);
    };
  };
  const updateProductSubmitHandler  = (e) => {
    e.preventDefault();
   
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("offerPrice", offerPrice);
    myForm.set("description", description);
    myForm.set("status", status);
    myForm.set("expiration", expiration);
    myForm.set("qrcode", qrcode);
    myForm.set("Stock", Stock);
    myForm.set("consignment", consignment);
    
    myForm.set("category", selectedCategory)
    myForm.set("subcategory", selectedChild);
    myForm.set("childcategory", selectedGrandchild);
    myForm.set("smallcategory", selectedSmall);
  
    
    images.forEach((image) => {
      myForm.append("images", image);
    });
  
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {

  const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });

   
  };

  return (
    <Fragment>
      <MetaData title="Edit Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Cập nhật sản phẩm</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Tên sản phẩm"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <CheckCircleOutlineIcon />
              <input
                type="text"
              
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>


            <div >    
                <div >
                  <DiscountIcon />
                  <input
                    type="String"
                    value={offerPrice}
                    placeholder="Giá đã giảm"
                    onChange={(e) => 
                      setOfferPrice(e.target.value)}
                  />
                </div>

                <div style={{marginLeft:"55px"}} >
                  <TimelapseIcon />
                  <input
                    type="text"
                    placeholder="Hạn sử dụng"
                    required
                    onChange={(e) =>  
                      setExpiration(e.target.value)}
                    value={expiration}
                  />
                </div>
              </div>
           <div>
           <div >
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Giá sản phẩm"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div  style={{marginLeft:"55px"}}>
              <WarehouseIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
            </div>

           </div>
           <div>
                  <Grid3x3Icon />
                  <input
                    type="text"
                    placeholder="Nhập vào mã lô hàng"
                    required
                    onChange={(e) =>  
                      setConsignment(e.target.value)}
                    value={consignment}
                  />
                </div>
          
           
            <div >
              <AccountTreeIcon />
            
                    <select 
                      value={selectedChild}
                      onChange={(e) => {
                        setSelectedChild(e.target.value);
                        setSelectedGrandchild('');
                      }}
                    >
                     
                      {categoriesData
                        .find((category) => category.title === "Sản phẩm")
                        ?.childrens.map((child) => (
                          <option key={child.id} value={child.title}>
                            {child.title}
                          </option>
                        ))}
                    </select>
                  

                  {selectedChild && (
                    <select style={{margin: "0px 10px"}}
                      value={selectedGrandchild}
                      onChange={(e) => setSelectedGrandchild(e.target.value)}
                    >
                      <option value="">Chọn danh mục</option>
                      {categoriesData
                        .find((category) => category.title === "Sản phẩm")
                        ?.childrens.find((child) => child.title === selectedChild)
                        ?.childrens.map((grandchild) => (
                          <option key={grandchild.id} value={grandchild.title}>
                            {grandchild.title}
                          </option>
                        ))}
                    </select>
                  )}

                  {selectedGrandchild && (
                    <select
                      value={selectedSmall}
                      onChange={(e) => setSelectedSmall(e.target.value)}
                    >
                      <option value="">Chọn danh mục</option>
                      {categoriesData
                        .find((category) => category.title === "Sản phẩm")
                        ?.childrens.find((child) => child.title === selectedChild)
                        ?.childrens.find((child) => child.title === selectedGrandchild)
                        ?.childrens.map((grandchild) => (
                          <option key={grandchild.id} value={grandchild.title}>
                            {grandchild.title}
                          </option>
                        ))}
                    </select>
                  )}

             </div>
          
            <span style={{marginRight:"530px"}}>Chọn file Qrcode</span>
            <div id="createProductFormFile">
           
              <input type="file" onChange={handleImageChange} />
            
            </div>

            <div>
                 <a href="" >{qrcode && <img style={{width:"50px"}} src={qrcode} alt="uploaded" />}</a>   
            </div>

            <span style={{marginTop:"10px",marginRight:"520px"}}>Chọn ảnh sản phẩm</span>
            <div id="createProductFormFile">
              <input
              placeholder=""
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>
            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>
            <div className="w-[600px] border-red-500">
                  <ReactQuill
                   className="border-green-500 "
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={description}
                    onChange={handleChange}
                  />
          
            </div>
            
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Cập nhật
            </Button>
          </form>
        </div>
      </div>
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
    </Fragment>
  );
};

export default UpdateProduct;