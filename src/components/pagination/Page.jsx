import React, { useCallback, useMemo } from "react";
import "./page.css";

export default function Pagination({ paginationData, setPaginationData }) {
  const handlePagination = (from = "next") => {
    if (from === "next") {
      if (
        paginationData.page ===
        Math.ceil(paginationData.total / paginationData.items_per_page) - 1
      )
        return;
      setPaginationData((p) => ({
        ...p,
        page: p.page + 1,
      }));
    } else {
      if (paginationData.page === 0) return;
      setPaginationData((p) => ({
        ...p,
        page: Math.max(p.page - 1, 0),
      }));
    }
  };

  const renderButtons = useCallback(() => {
    return Array.from({ length: 5 }, (_, i) => paginationData.page + i + 1)
      .filter(
        (ele) =>
          ele <= Math.ceil(paginationData.total / paginationData.items_per_page)
      )
      .map((value) => (
        <button
          key={value}
          disabled={value === paginationData.page + 1}
          onClick={() => setPaginationData((p) => ({ ...p, page: value - 1 }))}
          aria-label={`Go to page ${value}`}
          aria-current={paginationData.page === value ? "page" : undefined}
        >
          {value}
        </button>
      ));
  },[paginationData]);

  return (
    <div className="pagination">
      <div className="meta-data">
        Page {paginationData.page + 1} of{" "}
        {Math.ceil(paginationData.total / paginationData.items_per_page)}
      </div>
      <div className="controller">
        <button
          disabled={paginationData.page === 0}
          onClick={() => handlePagination("prev")}
          aria-label="Go to previous page"
          aria-disabled={paginationData.page === 0}
        >
          Prev
        </button>
        {renderButtons()}
        <button
          disabled={
            paginationData.page >=
            Math.ceil(paginationData.total / paginationData.items_per_page) - 1
          }
          onClick={() => handlePagination("next")}
          aria-label="Go to next page"
          aria-disabled={
            paginationData.page >=
            Math.ceil(paginationData.total / paginationData.items_per_page) - 1
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
