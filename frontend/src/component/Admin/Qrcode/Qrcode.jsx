import React, { Fragment, useEffect, useState ,useRef } from "react";
import "./QRcode.css";
import { useSelector, useDispatch } from "react-redux";
import { Button, Hidden } from "@material-ui/core";
import MetaData from "../../../more/Metadata";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
// import DiscountIcon from "@material-ui/icons/LocalOffer";
import SideBar from "../Sidebar/Sidebar";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { NEW_QRCODE_RESET } from "../../../constans/QrcodeConstans";
import { ToastContainer, toast } from 'react-toastify';
import {QRCodeSVG} from 'qrcode.react';
import qs from 'qs'
import AvTimerIcon from '@mui/icons-material/AvTimer';
import AttachmentIcon from '@mui/icons-material/Attachment';
import HomeIcon from '@mui/icons-material/Home';
import { clearErrors, createQrcode } from "../../../actions/QrcodeAction";
import ReactQuill from "react-quill";
import { toPng } from 'html-to-image';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import "react-quill/dist/quill.snow.css";


const style = {
  position: 'absolute',
  top: '55%',
  left: '50%',
  width: 800,
  height: 600,
  transform: 'translate(-50%, -50%)',
  p: 4,
};

const modules = {
  toolbar: [
    [{ 'font': [] }],
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
const Qrcode = ({ history }) => {

  const handleChange = (content, delta, source, editor) => {
    console.log(editor.getHTML()); // html 사용시
    // console.log(JSON.stringify(editor.getContents())); // delta 사용시
    setDescription(editor.getHTML());
  };
  const dispatch = useDispatch();
  const [qrcodeData, setQRCodeData] = useState(''); // Set the QR code data
const qrCodeRef = useRef(null);
const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { loading, error, success } = useSelector((state) => state.createQrcode);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [exprire_date, setExprireDate] = useState();
  const [images, setImages] = useState("");
  const [category, setCategory] = useState("");


  
  
  const categories = [
    "Thịt",
    "Rau",
    "Gia vị",
    "Trái cây",
    "Thực phẩm chế biến"
  ];
  
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully");
      history.push("/dashboard");
      dispatch({ type: NEW_QRCODE_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createQrcodeSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("code", code);
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("exprire_date", exprire_date);
    myForm.set("description", description);
    myForm.set("images", images);
    myForm.set("category", category);
    
  
    dispatch(createQrcode(myForm));
  };  
 
 
  const productInfo = {
    id: code,
    name: name,
    price: price,
    description: description,
    exprire_date:exprire_date,
    image:images,
    category: category,
  };
  
const handleDownload = () => {
  const qrCodeSvg = document.getElementById('qrcode');

  toPng(qrCodeSvg)
    .then(function (dataUrl) {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'qrcode.png';
      link.click();
    })
    .catch(function (error) {
      console.error('Error generating QR code image:', error);
    });
};
  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createQrcodeForm"
            encType="multipart/form-data"
            onSubmit={createQrcodeSubmitHandler}
      
          >
            <h1>Tạo Qrcode mới</h1>
         
            <div>
          
              <HomeIcon />
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
                value={name} onChange={(e) => setName(e.target.value)}
              />
            </div>


            <div>
                
                  <AttachMoneyIcon />
                  <input
                    type="number"
                    placeholder="Giá"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
            
            </div>

            <div>
             <AvTimerIcon/>
              <input
                type="text"
                placeholder="Hạn sử dụng"
                required
                value={exprire_date}
                onChange={(e) => setExprireDate(e.target.value)}
              />
            </div>
            
          
          <div>
              <AttachmentIcon />
              <input
                type="text"
                placeholder="Hình ảnh"
                value={images}
                onChange={(e) => setImages(e.target.value)}
              />
          
            </div>

            
            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Chọn loại</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
            <div>
                
            <ReactQuill
              placeholder="Nhập vào thông tin"
              theme="snow"
              modules={modules}
              formats={formats}
              value={description}
              onChange={handleChange}
            /> 
            </div>
           
            
            <div>
       
        </div>
        
           <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Tạo mới
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

export default Qrcode;