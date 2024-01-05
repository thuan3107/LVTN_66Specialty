import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Home/Header'
import {PayPalButton}  from 'react-paypal-button-v2';
import { useDispatch } from 'react-redux';
import { getOrderDetails } from '../../actions/OrderAction';
import Loading from '../../more/Loader';
export default function OrderScreen ({match}) {

    const orderId= match.params.id
    const dispatch =useDispatch()
    const  myOrderDetails  = useSelector((state) => state.myOrderDetails);
    const {order,loading,error} = myOrderDetails
    useEffect(() => {
      dispatch(getOrderDetails(orderId))
    
     
    }, [dispatch,orderId])
    
    return (
      <>    
          <Header/>
          
            {
                loading ? (<Loading/>) :error ? (<Message variant='alert-danger'>   {error}  </Message>):
                (
                    <>
                      <div className="confirmshippingArea">
          <Typography>Thông tin giao hàng</Typography>
          <div className="confirmshippingAreaBox">
            <div>
              <p>Tên:</p>
              <span>{order.user.name}</span>
            </div>
            <div>
              <p>Email:</p>
              <span>{order.user.email}</span>
            </div>
            <div>
              <p>Địa chỉ:</p>
              <span>{shippingInfo.address}</span>
            </div>
          </div>
        </div>
                    </>
                )
            }

           
        

      </>
    
    )
  
}
