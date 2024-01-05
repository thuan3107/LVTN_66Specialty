import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateBlog, getBlogDetails } from "../../../actions/BlogActions";
import { Button } from "@material-ui/core";
import MetaData from "../../../more/Metadata.jsx";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import Sidebar from "../Sidebar/Sidebar";
import { UPDATE_BLOG_RESET } from "../../../constans/BlogConstans";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from 'react-toastify';
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
    modules: ['Resize', 'DisplaySize','Toolbar'],
    editable: true,
    
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
const UpdateBlog = ({ history, match }) => {

  const dispatch = useDispatch();

  const { error, blog } = useSelector((state) => state.blogDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.deleteBlog);

  const [title, setTitle] = useState("");
      // eslint-disable-next-line
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const blogId = match.params.id;

  useEffect(() => {
    if (blog && blog._id !== blogId) {
      dispatch(getBlogDetails(blogId));
    } else {
      setTitle(blog.title);
      setDescription(blog.description);
      setOldImages(blog.images);
    
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
      history.push("/admin/blogs");
      dispatch({ type: UPDATE_BLOG_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    blogId,
    blog,
    updateError,
  ]);

  const handleChange  = (html) => {
    setDescription(html);
  };

  const updateBlogSubmitHandler  = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("title", title);
    myForm.set("description", description);
    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(updateBlog(blogId, myForm));
  };

  const updateBlogImagesChange = (e) => {
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
      <MetaData title="Chỉnh sửa blog" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateBlogSubmitHandler}
          >
            <h1>Cập nhật blog</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Tên blog"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          
            <h3 style={{width:"99%",marginRight:"10px "}}>Chọn ảnh cho blog</h3>
            <div id="createProductFormFile">
              <input
              placeholder=""
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateBlogImagesChange}
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
            <div className=" border-red-500">
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
        autoClose={200}
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

export default UpdateBlog;