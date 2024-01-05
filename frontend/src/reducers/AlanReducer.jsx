// reducers/index.js

const initialState = {
  hoten: "",
  // other state properties...
};

const alanReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_HOTEN":
      return {
        ...state,
        hoten: action.payload,
      };
    case "SET_ADDRESS":
        return {
          ...state,
          address: action.payload,
        };  
    case "SET_PHONE":
      return {
        ...state,
        phone: action.payload,
      };      
    case "SET_PROVINCE":
      return {
        ...state,
        province: action.payload,
      };      
    case "SET_CITY":
        return {
          ...state,
          city: action.payload,
        };      
    // other cases...
    default:
      return state;
  }
};

// Combine reducers if you have multiple reducers
// const rootReducer = combineReducers({ user: userReducer, otherReducer });

export default alanReducer;
