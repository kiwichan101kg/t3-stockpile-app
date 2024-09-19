import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white py-4">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        {/* コピーライト部分 */}
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Tech📚Stock. All rights reserved.
        </p>

        {/* リンク部分 */}
        <div className="mt-4 flex space-x-6 md:mt-0">
          <Link
            href={"/info/terms"}
            target="_blank"
            className="text-sm text-gray-600 transition hover:text-gray-900"
          >
            利用規約
          </Link>
          <Link
            href={"/info/privacy-policy"}
            target="_blank"
            className="text-sm text-gray-600 transition hover:text-gray-900"
          >
            プライバシーポリシー
          </Link>
        </div>
      </div>
    </footer>
  );
};
