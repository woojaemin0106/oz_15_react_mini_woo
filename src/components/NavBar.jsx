import { Link, useSearchParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

function NavBar() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL에 이미 query가 있으면 그걸 초기값으로 사용
  const initialQuery = searchParams.get("query") || "";
  const [keyword, setKeyword] = useState(initialQuery);

  // 입력값 debounce 처리
  const debouncedKeyword = useDebounce(keyword, 500);

  // debounced 값이 바뀔 때마다 URL의 query 파라미터 업데이트
  useEffect(() => {
    const trimmed = debouncedKeyword.trim();

    if (!trimmed) {
      // 검색어가 비어 있으면 query 파라미터 제거
      setSearchParams({});
    } else {
      // ?query=검색어
      setSearchParams({ query: trimmed });
    }
  }, [debouncedKeyword, setSearchParams]);

  return (
    <header className="bg-black text-white">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link to="/" className="mr-2 text-lg font-semibold">
          OZ 무비
        </Link>

        <div className="flex-1 flex justify-center">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="영화 제목을 입력하세요"
            className="h-9 w-full max-w-xl rounded-md bg-gray-700 px-3 text-sm text-white placeholder-gray-400 outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/login")}
            className="rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white"
          >
            로그인
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white"
          >
            회원가입
          </button>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
