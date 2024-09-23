"use client";
import Link from "next/link";
import { useState } from "react";

export const HamburgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="hidden md:block">
        <Link
          href={"api/auth/signout"}
          className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          ログアウト
        </Link>
      </div>

      <div className="relative">
        {/* ハンバーガーメニューアイコン */}
        {!isMenuOpen && (
          <button
            className="inline-flex items-center justify-center rounded-full bg-gray-200 p-2 text-gray-700 transition hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 md:hidden"
            onClick={handleClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 36 24"
              fill="none"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <circle cx="6" cy="12" r="2" fill="currentColor" />
              <circle cx="18" cy="12" r="2" fill="currentColor" />
              <circle cx="30" cy="12" r="2" fill="currentColor" />
            </svg>
          </button>
        )}

        {/* 閉じるアイコン */}
        {isMenuOpen && (
          <button
            className="inline-flex items-center justify-center rounded-full bg-gray-200 p-2 text-gray-700 transition hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 md:hidden"
            onClick={handleClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* メニュー */}
        {isMenuOpen && (
          <div className="absolute right-0 top-full z-20 mt-2 w-32 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:hidden">
            <div className="p-2">
              <Link
                href="api/auth/signout"
                className="block rounded-md px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100"
              >
                ログアウト
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
