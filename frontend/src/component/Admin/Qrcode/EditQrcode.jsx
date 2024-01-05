import React, { Fragment, useEffect, useState } from "react";
import "./QRcode.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateQrcode, getQrcodeDetails } from "../../../actions/QrcodeAction";
import { Button } from "@material-ui/core";
import MetaData from "../../../more/Metadata";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
    // eslint-disable-next-line
import qs from 'qs';
import SideBar from "../Sidebar/Sidebar";
import { UPDATE_QRCODE_RESET } from "../../../constans/QrcodeConstans";
import { ToastContainer, toast } from 'react-toastify';
import ImageIcon from '@mui/icons-material/Image';
import {QRCodeSVG} from 'qrcode.react';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HomeIcon from '@mui/icons-material/Home';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const style = {
  position: 'absolute',
  top: '55%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 600,
  // bgcolor: 'background.paper',
  // border: '2px solid #000',

  p: 4,
};

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
const UpdateQrcode= ({ history, match }) => {

  const dispatch = useDispatch();

  const { error, qrcode } = useSelector((state) => state.qrcodeDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.deleteQrcode);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState(0);
      // eslint-disable-next-line
 
  const [description, setDescription] = useState("");

  const [exprire_date, setExprireDate] = useState(0);
  const [images, setImages] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const categories = [
    "Thịt",
    "Rau",
    "Gia vị",
    "Trái cây",
    "Thực phẩm chế biến"
  ];

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImages(reader.result);
    };
  };
  const handleChange = (content, delta, source, editor) => {
    console.log(editor.getHTML()); // html 사용시
    // console.log(JSON.stringify(editor.getContents())); // delta 사용시
    setDescription(editor.getHTML());
  };

  const qrcodeId = match.params.id;
 
  const productInfo = {
    idcode:"asc",
    id: code,
    name: name,
    price: price,
    description: description,
    exprire_date:exprire_date,
    image:images,
    category: category,
  };
  useEffect(() => {
    if (qrcode && qrcode._id !== qrcodeId) {
      dispatch(getQrcodeDetails(qrcodeId));
    } else {
      setName(qrcode.name);
      setExprireDate(qrcode.exprire_date);
      setDescription(qrcode.description);
      setPrice(qrcode.price);
      setImages(qrcode.images);
      setCategory(qrcode.category);
      setCode(qrcode.code);
 
    
     
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
      history.push("/admin/qrcodes");
      dispatch({ type: UPDATE_QRCODE_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    qrcodeId,
    qrcode,
    updateError,
  ]);

  const updateQrcodeSubmitHandler  = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("code", code);
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("exprire_date", exprire_date);
    myForm.set("description", description);
    myForm.set("images", images);
    myForm.set("category", category);
    
    // images.forEach((image) => {
    //   myForm.append("images", image);
    // });
    dispatch(updateQrcode(qrcodeId, myForm));
  };
   

  return (
    <Fragment>
      <MetaData title="Edit Qrcode" />
      <div className="dashboard">

        
        <SideBar />
        <div className="newProductContainer">
          <form
            className="  createQrcodeForm"
            encType="multipart/form-data"
            onSubmit={updateQrcodeSubmitHandler}
          >
            <h1>Cập nhật thông tin Qrcode</h1>
          <div>
          <HomeIcon/>
         
            <input
              type="text"
              placeholder="Nhập vào mã sản phẩm"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
        </div>
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
          
          <AttachMoneyIcon />
          <input
            type="number"
            placeholder="Giá sản phẩm"
            required
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>


            <div>
              <PendingActionsIcon />
              <input
                type="text"
                placeholder="Exprire_date"
                required
                value={exprire_date}
                onChange={(e) => setExprireDate(e.target.value)}
              />
            </div>


              <div>
              <ImageIcon/>
              <input
                type="text"
                placeholder="Hình ảnh"
                required
              
                onChange={(e) => setImages(e.target.value)}
                value={images}
              />
               {/* <div id="createProductFormFile">
           
                 <input type="file" onChange={handleImageChange} />
                 {images && <img style={{width:"50px"}} src={images} alt="uploaded" />}
              </div> */}
            </div>
          
           

            <div>
      
            </div>
           
           <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Chọn loại</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>


            <div>
            {/* <DescriptionIcon /> */}
                    
            <ReactQuill
              placeholder="Nhập vào thông tin"
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


          <QRCodeSVG
           id="qrcode"
           className="qr-scanner-result" 
           value={`https://animated-chimera-2d55f2.netlify.app/?${qs.stringify((productInfo))}`}
           onClick={handleOpen}
          level={'L'}
          includeMargin={true}
        
        />
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           {/* <img style={{width:"650px" }} src={logo} alt="" /> */}
           <QRCodeSVG
           id="qrcode1"
           className="qr-scanner-result" 
           value={`https://animated-chimera-2d55f2.netlify.app/?${qs.stringify((productInfo))}`}
           onClick={handleOpen}
          level={'L'}
          includeMargin={true}
        
        />
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
    </Fragment>
  );
};

export default UpdateQrcode;