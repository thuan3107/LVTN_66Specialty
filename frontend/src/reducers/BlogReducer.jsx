import {
    ALL_BLOG_FAIL,
    ALL_BLOG_REQUEST,
    ALL_BLOG_SUCCESS,
    CLEAR_ERRORS,
    BLOG_DETAILS_FAIL,
    BLOG_DETAILS_REQUEST,
    BLOG_DETAILS_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    ADMIN_BLOG_REQUEST,
    ADMIN_BLOG_SUCCESS,
    ADMIN_BLOG_FAIL,
    NEW_BLOG_REQUEST,
    NEW_BLOG_SUCCESS,
    NEW_BLOG_FAIL,
    NEW_BLOG_RESET,
    DELETE_BLOG_REQUEST,
    UPDATE_BLOG_REQUEST,
    DELETE_BLOG_SUCCESS,
    UPDATE_BLOG_SUCCESS,
    DELETE_BLOG_FAIL,
    UPDATE_BLOG_FAIL,
    DELETE_BLOG_RESET,
    UPDATE_BLOG_RESET,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_RESET,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
  } from "../constans/BlogConstans";
  
  export const blogsReducer = (state = { blogs: [] }, action) => {
    switch (action.type) {
      case ALL_BLOG_REQUEST:
      case ADMIN_BLOG_REQUEST:
        return {
          loading: true,
          blogs: [],
        };
      case ALL_BLOG_SUCCESS:
        return {
          loading: false,
          blogs: action.payload.blogs,
          blogsCount: action.payload.blogsCount,
          resultPerPage: action.payload.resultPerPage,
          filteredBlogsCount: action.payload.filteredBlogsCount,
        };
  
      case ADMIN_BLOG_SUCCESS:
        return {
          loading: false,
          blogs: action.payload,
        };
  
      case ALL_BLOG_FAIL:
      case ADMIN_BLOG_FAIL:
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
  
  export const blogDetailsReducer = (state = { blog: {} }, action) => {
    switch (action.type) {
      case BLOG_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case BLOG_DETAILS_SUCCESS:
        return {
          loading: false,
          blog: action.payload,
        };
      case BLOG_DETAILS_FAIL:
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
  
  // BLOG review
  export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case NEW_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_REVIEW_SUCCESS:
        return {
          loading: false,
          success: action.payload,
        };
      case NEW_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_REVIEW_RESET:
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
  
  // New BLOG ----Admin
  export const newBlogReducer = (state = { blog: [] }, action) => {
    switch (action.type) {
      case NEW_BLOG_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_BLOG_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          blog: action.payload.blog,
        };
      case NEW_BLOG_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_BLOG_RESET:
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
  
  // Delete BLOG
  export const deleteBlogReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_BLOG_REQUEST:
      case UPDATE_BLOG_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_BLOG_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_BLOG_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_BLOG_FAIL:
      case UPDATE_BLOG_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_BLOG_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case UPDATE_BLOG_RESET:
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
  
  // All reviews --- Admin
  export const BlogReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
      case ALL_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ALL_REVIEW_SUCCESS:
        return {
          loading: false,
          reviews: action.payload,
        };
      case ALL_REVIEW_FAIL:
        return {
          ...state,
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
  
  // Delete Review ----- Admin
  export const deleteReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_REVIEW_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case DELETE_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_REVIEW_RESET:
        return {
          ...state,
          isDeleted: false,
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