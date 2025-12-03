import { Link } from "react-router-dom";
import React from "react";
function NavBar() {
  return (
    <header className="bg-black text-white">
      <div className="mx-auto flex max-w-6xl items-center px-4 py-3">
        <Link to="/" className="mr-4 font-semibold">
          OZ 무비
        </Link>

        <div className="flex-1 flex justify-center">
          <div className="h-8 w-full max-w-xl rounded-md bg-gray-700" />
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white">
            로그인
          </button>
          <button className="rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white">
            회원가입
          </button>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
