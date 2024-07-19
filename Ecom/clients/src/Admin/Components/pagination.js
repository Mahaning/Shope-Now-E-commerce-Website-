import React from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li className={`page-item ${currentPage === i ? 'active' : ''}`} key={i}>
          <button className="page-link" onClick={() => handleClick(i)}>
            {i}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {renderPageNumbers()}
      </ul>
    </nav>
  );
};

export default Pagination;
