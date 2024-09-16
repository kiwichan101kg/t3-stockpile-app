"use client";
import React from "react";

interface PaginateProps {
  jumpToPage: (page: number) => void;
  prevPage: () => void;
  nextPage: () => void;
  currentPage: number;
  totalPages: number;
}

export const Pagination: React.FC<PaginateProps> = ({
  jumpToPage,
  prevPage,
  nextPage,
  currentPage,
  totalPages,
}) => {
  // ページ番号のレンダリングロジック
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const range = 1;

    // 最初のページ
    pageNumbers.push(
      <button
        key={1}
        onClick={() => jumpToPage(1)}
        className={`${
          currentPage === 1
            ? "bg-blue-400 text-white"
            : "text-gray-500 hover:bg-blue-200 hover:text-white"
        } rounded-full px-3 py-1 transition-colors duration-200 ease-in-out`}
        disabled={currentPage === 1}
      >
        1
      </button>,
    );

    // 現在の前後のページ番号
    if (currentPage > range + 2) {
      pageNumbers.push(<span key="start-ellipsis">...</span>);
    }

    for (
      let i = Math.max(2, currentPage - range);
      i <= Math.min(totalPages - 1, currentPage + range);
      i++
    ) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => jumpToPage(i)}
          className={`${
            currentPage === i
              ? "bg-blue-400 text-white"
              : "text-gray-500 hover:bg-blue-200 hover:text-white"
          } rounded-full px-3 py-1 transition-colors duration-200 ease-in-out`}
        >
          {i}
        </button>,
      );
    }

    // 現在のページの後ろの「...」
    if (currentPage < totalPages - range - 1) {
      pageNumbers.push(<span key="end-ellipsis">...</span>);
    }

    // 最後のページ
    if (totalPages > 1) {
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => jumpToPage(totalPages)}
          className={`${
            currentPage === totalPages
              ? "bg-blue-400 text-white"
              : "text-gray-500 hover:bg-blue-200 hover:text-white"
          } rounded-full px-3 py-1 transition-colors duration-200 ease-in-out`}
          disabled={currentPage === totalPages}
        >
          {totalPages}
        </button>,
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* 左矢印 */}
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="rounded-full p-2 text-gray-500 hover:text-black disabled:text-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* ページ番号 */}
      {renderPageNumbers()}

      {/* 右矢印 */}
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="rounded-full p-2 text-gray-500 hover:text-black disabled:text-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};
