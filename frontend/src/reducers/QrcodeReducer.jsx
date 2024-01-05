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
    DELETE_QRCODE_RESET,
   
    NEW_QRCODE_FAIL,
    NEW_QRCODE_REQUEST,
    NEW_QRCODE_SUCCESS,
    NEW_QRCODE_RESET,
  
    QRCODE_DETAILS_FAIL,
    QRCODE_DETAILS_REQUEST,
    QRCODE_DETAILS_SUCCESS,
    UPDATE_QRCODE_FAIL,
    UPDATE_QRCODE_REQUEST,
    UPDATE_QRCODE_SUCCESS,
    UPDATE_QRCODE_RESET,
  } from "../constans/QrcodeConstans";
  
  export const qrcodesReducer = (state = { qrcodes: [] }, action) => {
    switch (action.type) {
      case ALL_QRCODE_REQUEST:
      case ADMIN_QRCODE_REQUEST:
        return {
          loading: true,
          qrcodes: [],
        };
      case ALL_QRCODE_SUCCESS:
        return {
          loading: false,
          qrcodes: action.payload.qrcodes,
          qrcodesCount: action.payload.qrcodesCount,
          resultPerPage: action.payload.resultPerPage,
          filteredQrcodesCount: action.payload.filteredQrcodesCount,
        };
  
      case ADMIN_QRCODE_SUCCESS:
        return {
          loading: false,
          qrcodes: action.payload,
        };
  
      case ALL_QRCODE_FAIL:
      case ADMIN_QRCODE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const qrcodeDetailsReducer = (state = { qrcode: {} }, action) => {
    switch (action.type) {
      case QRCODE_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case QRCODE_DETAILS_SUCCESS:
        return {
          loading: false,
          qrcode: action.payload,
        };
      case QRCODE_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  // New Product ----Admin
  export const newQrcodeReducer = (state = { qrcode: {} }, action) => {
    switch (action.type) {
      case NEW_QRCODE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_QRCODE_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          qrcode: action.payload.qrcode,
        };
      case NEW_QRCODE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_QRCODE_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  // Delete Product
  export const deleteQrcodeReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_QRCODE_REQUEST:
      case UPDATE_QRCODE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_QRCODE_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_QRCODE_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_QRCODE_FAIL:
      case UPDATE_QRCODE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_QRCODE_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case UPDATE_QRCODE_RESET:
        return {
          ...state,
          isUpdated: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  