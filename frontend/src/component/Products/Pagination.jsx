import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    // Xử lý khi người dùng chuyển trang
    console.log(`Chuyển đến trang số: ${pageNumber}`);
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {/* Hiển thị nội dung trang hiện tại */}
      <h1>Trang {currentPage}</h1>

      {/* Sử dụng ReactPaginate component */}
      <ReactPaginate
        pageCount={10} // Tổng số trang
        pageRangeDisplayed={3} // Số trang hiển thị ở giữa nút first và last
        marginPagesDisplayed={1} // Số trang hiển thị ở hai bên nút first và last
        onPageChange={handlePageChange} // Hàm xử lý khi chuyển trang
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default Pagination;
