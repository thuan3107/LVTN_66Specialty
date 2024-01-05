import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEM
} from "../constans/CartConstans";

export const cartReducer = (state = { cartItems: [], shippingInfo: {} ,  paymentInfo1:  []}, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
   
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
    }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

      case SAVE_PAYMENT_METHOD:
        return {
          ...state,
          paymentInfo1: action.payload,
        };

        case CART_CLEAR_ITEM:
        return {
          ...state,
          cartItems:[]
        };
  
    default:
      return state;

  }
};

