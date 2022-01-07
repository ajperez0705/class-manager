import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";

export default function Pagination({
  data,
  RenderComponent,
  pageLimit,
  dataLimit,
  setCurrentId,
  filter,
}) {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (currentPage !== 1) {
      setTimeout(() => {
        setCurrentPage(1);
      }, 1500);
    }
  }, [filter]);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    if (currentPage === 1) return;
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <>
      {/* show the posts, 6 posts at a time */}
      {getPaginatedData().map((data, idx) => (
        <Grid.Column key={idx} style={{ marginBottom: 20 }}>
          <RenderComponent
            data={data}
            _id={data._id}
            title={data.title}
            message={data.message}
            createdAt={data.createdAt}
            selectedFile={data.selectedFile}
            comments={data.comments}
            likes={data.likes}
            setCurrentId={setCurrentId}
          />
        </Grid.Column>
      ))}

      {/* show the pagiantion
        it consists of next and previous buttons
        along with page numbers, in our case, 5 page
        numbers at a time
    */}
      <div className="pagination">
        {/* previous button */}
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          prev
        </button>

        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? "active" : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}

        {/* next button */}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? "disabled" : ""}`}
        >
          next
        </button>
      </div>
    </>
  );
}
