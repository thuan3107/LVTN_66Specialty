import axios from "axios";
import {
  ADMIN_QRCODE_FAIL,
  ADMIN_QRCODE_REQUEST,
  ADMIN_QRCODE_SUCCESS,
  ALL_QRCODE_FAIL,
  ALL_QRCODE_REQUEST,
  ALL_QRCODE_SUCCESS,
  CLEAR_ERRORS,
  DELETE_QRCODE_FAIL,
  DELETE_QRCODE_REQUEST,
  DELETE_QRCODE_SUCCESS,
 
  NEW_QRCODE_FAIL,
  NEW_QRCODE_REQUEST,
  NEW_QRCODE_SUCCESS,

  QRCODE_DETAILS_FAIL,
  QRCODE_DETAILS_REQUEST,
  QRCODE_DETAILS_SUCCESS,
  UPDATE_QRCODE_FAIL,
  UPDATE_QRCODE_REQUEST,
  UPDATE_QRCODE_SUCCESS,
 
} from "../constans/QrcodeConstans";


export const getQrcode= (keyword="",currentPage=1,category) => async (dispatch)=>{
  try {
      dispatch({
          type: ALL_QRCODE_REQUEST
      });

     let link = `/api/v2/qrcodes?keyword=${keyword}&page=${currentPage}`;
      
     if(category){
      link = `/api/v2/qrcodes?keyword=${keyword}&page=${currentPage}&category=${category}`;
     }
      const {data} = await axios.get(link);

      dispatch({
          type:ALL_QRCODE_SUCCESS,
          payload: data,
      })
  } catch (error) {
      dispatch({
          type:ALL_QRCODE_FAIL,
          payload: error.response.data.message,
      })
  }
}; 


// Get All Products Details
export const getQrcodeDetails= (id) => async (dispatch)=>{
  try {
      dispatch({ type: QRCODE_DETAILS_REQUEST });
  
      const { data } = await axios.get(`/api/v2/qrcode/${id}`);
  
      dispatch({
        type: QRCODE_DETAILS_SUCCESS,
        payload: data.qrcode,
      });
    } catch (error) {
      dispatch({
        type: QRCODE_DETAILS_FAIL,
        payload: error.response.message,
      });
    }
  };


// Create Product --------Admin
export const createQrcode = (qrcodeData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_QRCODE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v2/qrcode/new`,
      qrcodeData,
      config
    );

    dispatch({
      type: NEW_QRCODE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_QRCODE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Admin Products -----Admin
  export const getAdminQrcodes = () => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_QRCODE_REQUEST });
  
      const { data } = await axios.get("/api/v2/admin/qrcodes");
  
      dispatch({
        type: ADMIN_QRCODE_SUCCESS,
        payload: data.qrcodes,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_QRCODE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // Delete Product ------Admin
export const deleteQrcode = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_QRCODE_REQUEST });

    const { data } = await axios.delete(`/api/v2/qrcode/${id}`);

    dispatch({
      type: DELETE_QRCODE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_QRCODE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Product
export const updateQrcode = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_QRCODE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v2/qrcode/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_QRCODE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_QRCODE_FAIL,
      payload: error.response.data.message,
    });
  }
};


//   Clearing errors
export const clearErrors= () => async (dispatch)=>{
  dispatch({
      type: CLEAR_ERRORS
  })
}