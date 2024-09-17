import Link from "next/link";
import React from "react";

export const Logo = () => {
  return (
    <Link href="/" className="cursor-pointer">
      <h1 className="text-3xl font-bold text-gray-800">Tech📚Stock</h1>
    </Link>
  );
};
