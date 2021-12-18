import React, { useState, useEffect } from "react";

// const pages = [1, 2, 3, 4, 5];
export default function Index(props) {
  const {  currentPage, data } = props;
  const [pages, setPageCount] = useState([]);

  const paginationData=data.totalPages

  console.log(props, "props pagination",paginationData);
  // // const pages = Array.from(Array(props.paginationData.total_pages).keys())
  const [pageNum, setPage] = useState(1);
  const isFirst = parseInt(currentPage) === 1 ? true : false;
  const isLast = parseInt(currentPage) === paginationData ? true : false;
  // console.log(props.paginationData.total_pages)

  useEffect(() => {
    if (paginationData) {
      const pages = [];
      for (let i = 0; i < paginationData; i++) {
        pages.push(i + 1);
      }
      console.log('pages',pages)
      setPageCount(pages);
    } else {
      setPageCount([]);
    }
  }, [paginationData]);
  
  const onPageChange = (val, b) => {
    console.log(b, val, "triggere");
    // setPage(val);
    if (val) {
      props.changeGoTo(val);
    }
    if (b) {
      props.changeGoTo(b);
    }
    // props.currentPage(val + 1);
  };

  return (
    <div className="pagination-wrapper">
      <div className="pages-section">
        {paginationData && paginationData > 0 ? (
          <ul className="pages-inner-section">
            <li
              onClick={isFirst ? () => {} : () => onPageChange(1)}
              className="single-page"
            >
              <svg
                width="17"
                height="10"
                viewBox="0 0 17 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.3999 1L9.04885 4.98182L16.3999 8.96364"
                  stroke={isFirst ? "#C7C7C7" : "#313A46"}
                />
                <path
                  d="M9.35107 1L2.00002 4.98182L9.35107 8.96364"
                  stroke={isFirst ? "#C7C7C7" : "#313A46"}
                />
              </svg>
            </li>
            <li
              onClick={
                isFirst
                  ? () => {}
                  : () => onPageChange(parseInt(currentPage) - 1)
              }
              className="single-page"
            >
              <svg
                width="9"
                height="10"
                viewBox="0 0 9 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.3999 1L1.0999 4.98182L8.3999 8.96364"
                  stroke={isFirst ? "#C7C7C7" : "#313A46"}
                />
              </svg>
            </li>
            {pages.map((page, index) => {
              return (
                <li
                  onClick={() => onPageChange(page)}
                  className={`single-page ${
                    parseInt(currentPage) === page ? "active-page" : ""
                  }`}
                >
                  {page}
                </li>
              );
            })}
            <li
              onClick={
                isLast
                  ? () => {}
                  : () => onPageChange(parseInt(currentPage) + 1)
              }
              className="single-page"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.999512 1L8.29951 4.98182L0.999512 8.96364"
                  stroke={isLast ? "#C7C7C7" : "#313A46"}
                />
              </svg>
            </li>
            <li
              onClick={isLast ? () => {} : () => onPageChange(pages.length)}
              className="single-page"
            >
              <svg
                width="17"
                height="10"
                viewBox="0 0 17 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.999512 1L8.35056 4.98182L0.999512 8.96364"
                  stroke={isLast ? "#C7C7C7" : "#313A46"}
                />
                <path
                  d="M8.04834 1L15.3994 4.98182L8.04834 8.96364"
                  stroke={isLast ? "#C7C7C7" : "#313A46"}
                />
              </svg>
            </li>
          </ul>
        ) : (
          ""
        )}
      </div>
      <div className="total-pages-section">
        <label className="pagination-label">
          Page <b>{currentPage}</b> of {paginationData}
        </label>
      </div>
    </div>
  );
}
