import React, { Fragment, useEffect, useState } from "react";
import "../Product/newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../../actions/ProductActions";
import { Button } from "@material-ui/core";
import MetaData from "../../../more/Metadata";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DiscountIcon from "@material-ui/icons/LocalOffer";
import Sidebar from "../Sidebar/Sidebar";
import { NEW_PRODUCT_RESET } from "../../../constans/ProductConstans";
import { ToastContainer, toast } from 'react-toastify';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import ReactQuill from "react-quill";
import { categoriesData } from "./sidebarData";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    //[{ 'font': [] }],
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
    ["clean"],
  ],
};

const formats = [
  //'font',
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
  "align",
  "color",
  "background",
];
const CreateProduct = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.createProduct);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedChild, setSelectedChild] = useState('');
  const [selectedGrandchild, setSelectedGrandchild] = useState('');
  const [selectedSmall, setSelectedSmall] = useState('');
 
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [consignment, setConsignment] = useState("");
  const [expiration, setExpiration] = useState();
  const [Stock, setStock] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [qrcode, setQRcode] = useState([]);
  
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully");
      history.push("/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("offerPrice", offerPrice);
    myForm.set("description", description);
    myForm.set("Stock", Stock);
    myForm.set("expiration", expiration);
    myForm.set("consignment", consignment);
    myForm.set("qrcode", qrcode);
    myForm.set("category", selectedCategory)
    myForm.set("subcategory", selectedChild);
    myForm.set("childcategory", selectedGrandchild);
    myForm.set("smallcategory", selectedSmall);
    images.forEach((image) => {
      myForm.append("images", image);
    });

   
    
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
  
    setImages([]);
    setImagesPreview([]);
  

    files.forEach((file) => {
      const reader = new FileReader();
        console.log(file)
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
       
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });

  
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setQRcode(reader.result);
    };
  };
  const handleChange  = (content, delta, source, editor) => {
    console.log(editor.getHTML()); // html 사용시
    // console.log(JSON.stringify(editor.getContents())); // delta 사용시
    setDescription(editor.getHTML());
  };
 
  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Thêm sản phẩm mới</h1>

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
                <div>
                  <DiscountIcon />
                  <input
                    type="String"
                    value={offerPrice}
                    placeholder="Giá gốc"
                    onChange={(e) => 
                      setOfferPrice(e.target.value)}
                  />
                </div>

                <div style={{marginLeft:"30px"}}>
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


          <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Giá khuyến mãi"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div style={{marginLeft:"30px"}}>
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
          </div>
       
           <h4 style={{marginRight:"0vmax"}}>Chọn file Qrcode</h4>
            <div id="createProductFormFile">
            
              <input type="file" onChange={handleImageChange} />
   
            </div>
            <div>
                 <a href="" >{qrcode && <img style={{width:"50px"}} src={qrcode} />}</a>   
            </div>

            <span  style={{marginRight:"0vmax"}}>Chọn ảnh cho sản phẩm </span>
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
            {imagesPreview.map((image) => (
                <img key={image} src={image} alt="uploaded" />
             ))}
            </div>

       

            <div>
              <AccountTreeIcon />
                
              <select 
                      value={selectedChild}
                      onChange={(e) => {
                    
                        setSelectedChild(e.target.value);
                        setSelectedGrandchild('');
                      }}
                    >
                         <option value="">Chọn danh mục</option>
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
                        .find((category) => category.title ===  "Sản phẩm")
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
                        .find((category) => category.title ===  "Sản phẩm")
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

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Còn lại"
                value={Stock}
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div>
                  <ReactQuill
                  
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
              Tạo mới
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

export default CreateProduct;