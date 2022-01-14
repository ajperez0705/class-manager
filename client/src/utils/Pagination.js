import React, { useState, useEffect } from "react";
import { Grid, Transition } from "semantic-ui-react";

export default function Pagination({
  data,
  RenderComponent,
  pageLimit,
  dataLimit,
  setCurrentId,
  filter,
}) {
  const [pages, setPages] = useState(Math.ceil(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setPages(Math.ceil(data.length / dataLimit));
  }, [data, dataLimit]);

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
      {data.length > 0 ? (
        <>
          <Grid.Row>
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
          </Grid.Row>
          <Grid.Row className="pagination-row">
            <div className="pagination">
              {/* previous button */}
              {currentPage > 1 && (
                <button onClick={goToPreviousPage} className="secondary-btn">
                  prev
                </button>
              )}

              {/* show page numbers */}
              {getPaginationGroup().map((item, index) => (
                <button
                  key={index}
                  onClick={changePage}
                  className={`paginationItem ${
                    currentPage === item && "active"
                  }`}
                >
                  <span>{item}</span>
                </button>
              ))}

              {/* next button */}
              {currentPage === pages ? null : (
                <button onClick={goToNextPage} className="secondary-btn">
                  next
                </button>
              )}
            </div>
          </Grid.Row>
        </>
      ) : (
        <p>
          You have not created any posts yet. Use the create post button above
          to create content for your class!
        </p>
      )}
    </>
  );
}
