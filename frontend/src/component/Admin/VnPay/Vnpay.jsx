import React, { useState ,useEffect} from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";


const VnPay = () => {
  const [amount, setAmount] = useState("");
  const [vnpUrl, setVnpUrl] = useState('');
  const [bankCode, setBankCode] = useState("");
  const [language, setLanguage] = useState("vn"); // Ngôn ngữ mặc định
  let history = useHistory();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gửi yêu cầu thanh toán đến backend
      const response =  await axios.post("/api/v2/order/createvnpay", {
        amount: amount,
        bankCode: bankCode,
        language: language,
        
      })
        setVnpUrl(response.data.vnpUrl)
    
        window.location.href = response.data.vnpUrl;
    } catch (error) {
      console.error(error);
      // Xử lý lỗi nếu cần thiết
    }
  };
 


  return (
    <div className="w-[35vmax] mx-[450px]">
      <h3>Thanh toán Vnpay</h3>
   
      <div className="table-responsive">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h4 htmlFor="amount">Số tiền</h4>
        
            <input
              className="form-control rounded-xl"
              type="text"
              id="amount"
              name="amount"
              placeholder="Số tiền"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="form-group">
            <h4>Chọn Phương thức thanh toán:</h4>
            <div>
              <h4>
                <input
                  type="radio"
                  name="bankCode"
                  value=""
                  checked={bankCode === ""}
                  onChange={() => setBankCode("")}
                />
                Cổng thanh toán VNPAYQR
              </h4>
            </div>
            <div>
              <h4>
                <input
                  type="radio"
                  name="bankCode"
                  value="VNPAYQR"
                  checked={bankCode === "VNPAYQR"}
                  onChange={() => setBankCode("VNPAYQR")}
                />
                Thanh toán qua ứng dụng hỗ trợ VNPAYQR
              </h4>
            </div>
            <div>
              <h4>
                <input
                  type="radio"
                  name="bankCode"
                  value="VNBANK"
                  checked={bankCode === "VNBANK"}
                  onChange={() => setBankCode("VNBANK")}
                />
                Thanh toán qua ATM-Tài khoản ngân hàng nội địa
              </h4>
            </div>
            <div>
              <h4>
                <input
                  type="radio"
                  name="bankCode"
                  value="INTCARD"
                  checked={bankCode === "INTCARD"}
                  onChange={() => setBankCode("INTCARD")}
                />
                Thanh toán qua thẻ quốc tế
              </h4>
            </div>
          </div>

          <div className="form-group">
            <h4>Ngôn ngữ:</h4>
            <div>
              <h4>
                <input
                  type="radio"
                  name="language"
                  value="vn"
                  checked={language === "vn"}
                  onChange={() => setLanguage("vn")}
                />
                Tiếng việt
              </h4>
            </div>
            <div>
              <h4>
                <input
                  type="radio"
                  name="language"
                  value="en"
                  checked={language === "en"}
                  onChange={() => setLanguage("en")}
                />
                Tiếng anh
              </h4>
            </div>
          </div>
  
                <button className="btn btn-default" >
                  Thanh toán
                </button>
          
        </form>
      </div>
    </div>
  );
};

export default VnPay;
