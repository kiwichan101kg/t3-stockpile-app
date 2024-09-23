import Link from "next/link";
import React from "react";

export const Logo = () => {
  return (
    <Link href="/" className="cursor-pointer">
      <h1 className="font-serif text-2xl font-extrabold text-gray-800 sm:text-3xl">
        <span className="text-gray-900">Tech📚</span>
        <span className="text-blue-500">Stock</span>
      </h1>
    </Link>
  );
};
