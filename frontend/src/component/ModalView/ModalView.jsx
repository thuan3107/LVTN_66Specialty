import CartItemModal from "../cart/Cart/CartItemModal";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItemsFromCart } from "../../actions/CartAction";
function ModalView({ isDivOpen }) {
  const [showCartItems, setShowCartItems] = useState(false);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const isCartEmpty = cartItems.length === 0;

  let Price = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  let totalPrice = Price;
  useEffect(() => {
    if (isCartEmpty) setShowCartItems(false);
  }, [isCartEmpty]);

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  return (
    <section className=" mt-[50px] mr-[30px] justify-center flex">
      <div className=" mr-[200px]  absolute h-full w-[25rem] ">
        <div className=" bg-white text-gray-700 body-font shadow-lg border rounded-lg">
          <div className="overflow-y-scroll h-[15rem] pt-2">
            {cartItems &&
              cartItems.map((item) => (
                <div key={item.product}>
                  <CartItemModal
                    item={item}
                    deleteCartItems={deleteCartItems}
                  />
                </div>
              ))}
          </div>
          <div className="flex justify-between items-end border-t border-b py-2 px-4">
            <td className="font-bold text-lg"> Tổng tiền:</td>

            <td>
              {" "}
              {`${new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "VND",
              }).format(totalPrice)}`}
            </td>
          </div>

          <button className="text-white py-2 px-4 text-lg bg-red-500 rounded hover:bg-red-700 m-4">
            <Link
              className="hover:no-underline hover:text-green-400"
              to="/cart"
            >
              Xem giỏ hàng
            </Link>
          </button>

          <button className="text-white py-2 px-4 text-lg bg-red-500 rounded hover:bg-red-700 m-4">
            <Link
              className="hover:no-underline hover:text-green-400"
              to="/shipping"
            >
              Thanh toán
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}

export default ModalView;
