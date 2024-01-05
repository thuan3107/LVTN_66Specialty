import React,{useState,useEffect} from 'react';
import { Link} from 'react-router-dom';
import "./FavouriteItemsCard.css";
import { useSelector,useDispatch } from "react-redux";

const FavouriteItemsCard = ({item, deleteFavouriteItems}) => {
    const dispatch = useDispatch();
    const { product} = useSelector(
        (state) => state.productDetails
      );

    return (    
        <div className='FavouriteItemsCard'>
        <div>
        <img src={item.image} alt="ssa" />
        <p onClick={() => deleteFavouriteItems(item.product)}>Xóa</p>
        <Link to={`/product/${item.product}`} style={{
            fontSize:"300 0.9vmax",
            fontFamily:"cursive",
        }}>{item.name}</Link>
        </div>

        <div>
            <span>
            
            {`${
                    new Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format(item.price)
                  }`}
            </span> 
        </div>

        <div>
        <p style={{ paddingBottom: ".5vmax" }}>
              <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                {product.Stock < 1 ? "Hết hàng" : "Còn hàng"}
              </b>
            </p>
        </div>
        
        <div>
          <Link to={`/product/${item.product}`}>
           <button className='favouritesButton' onClick={() => deleteFavouriteItems(item.product)}>Thêm vào giỏ hàng</button>
           </Link>
        </div>

    </div>
    )
}

export default FavouriteItemsCard
