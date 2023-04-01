import React from "react";

const Pagination = ({
  postPerPage,
  totalPosts,
  paginate,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];

  let lastIdx=totalPosts /5

  for (let i = 1; i <= Math.ceil(totalPosts) / postPerPage; i++) {
    pageNumbers.push(i);
  }

  function moveToPage(pageNum){
   pageNum=currentPage

   setCurrentPage(pageNum)
   if(pageNum>lastIdx){
    setCurrentPage(1)
   }else if(pageNum<1){
    setCurrentPage(lastIdx)
   }
  
  }
  return (
    <div>
      <ul className="pagination">
        <li class="page-item">
          <a className="page-link" onClick={()=>moveToPage(currentPage-3)}>
          <span className={currentPage === 1?"hide":""}>&laquo;</span>
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" onClick={()=>setCurrentPage(currentPage-1)}>
          <span className={currentPage === 1?"hide":""}>&lt;</span>
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li className="page-item">
            <a onClick={() => paginate(number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}

<li class="page-item">

          <a className="page-link" onClick={()=>setCurrentPage(currentPage+1)}>
            <span className={currentPage === lastIdx?"hide":""}>&gt;</span>
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" onClick={()=>setCurrentPage(currentPage+3)}>
          <span className={currentPage === lastIdx?"hide":""}>&raquo;</span>
          </a>
        </li>



      </ul>
    </div>
  );
};

export default Pagination;
