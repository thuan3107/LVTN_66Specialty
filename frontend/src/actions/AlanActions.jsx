// actions/UserActions.js

export const setHoten = (hoten) => {
    return {
      type: 'SET_HOTEN',
      payload: hoten,
    };
  };
export const setAddress = (address) => {
    return {
      type: 'SET_ADDRESS',
      payload: address,
    };
  };
export const setPhone = (phone) => {
    return {
      type: 'SET_PHONE',
      payload: phone,
    };
  };
export const setCity = (city) => {
    return {
      type: 'SET_CITY',
      payload: city,
    };
  }; 
export const setProvince = (province) => {
    return {
      type: 'SET_PROVINCE',
      payload: province,
    };
  };    