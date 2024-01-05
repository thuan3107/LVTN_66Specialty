import React from 'react';
import { useParams, Link } from 'react-router-dom';

const TransactionResult = () => {
  const { code } = useParams(); // Lấy giá trị của code từ URL

  return (
    <div>
      <h3>Transaction Result</h3>
      {code === "00" ? (
        <p style={{ textAlign: 'center' }}>GD thành công</p>
      ) : (
        <p style={{ textAlign: 'center', color: 'red' }}>GD thất bại</p>
      )}
      <p style={{ textAlign: 'center' }}>
        <Link className="btn btn-default" to="/order">
          Về danh sách
        </Link>
      </p>
    </div>
  );
};

export default TransactionResult;
