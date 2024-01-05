import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../../Home/Header';

const VnpayReturn = (props) => {
    const [resultCode, setResultCode] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
           
                const params = new URLSearchParams(props.location.search);
                const code = params.get('vnp_ResponseCode');
            
                setResultCode(code);
            } catch (error) {
                setResultCode('97'); 
            }
        };

        fetchData();
    }, [props.location.search]); // Dependency array includes the search string to trigger the effect when the search string changes

    return (
       <div>

            <Header/>
        <div className="">
          
            <div style={{ textAlign: 'center' }}>
             <h3>   {resultCode === '00' ? 'Thanh toán thành công' : 'Thanh toán thất bại'}</h3>
            </div>
            <div style={{ textAlign: 'center' }}>
                <Link to="/" className="block"> 
                    Về trang chủ
                </Link>
            </div>
        </div>
       </div>
    );
};

export default VnpayReturn;
