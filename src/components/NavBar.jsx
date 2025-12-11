import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { useSupabaseAuth } from "../supabase";

function NavBar() {
  const { logout, getUserInfo } = useSupabaseAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // NavBar user 상태
  const [user, setUser] = useState(null);

  // URL에 이미 query가 있으면 그걸 초기값으로 사용
  const initialQuery = searchParams.get("query") || "";
  const [keyword, setKeyword] = useState(initialQuery);

  // 입력값 debounce 처리
  const debouncedKeyword = useDebounce(keyword, 500);

  // 마운트 시 + 로그인 후 재렌더링 시 유저 정보 동기화
  useEffect(() => {
    async function fetchUser() {
      try {
        const info = await getUserInfo();
        setUser(info?.user ?? null); // user가 있으면 상태에 저장
        console.log("NavBar user info:", info);
      } catch (err) {
        console.error("유저 정보 가져오기 실패:", err);
      }
    }

    fetchUser();
  }, []);

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

  // 로그아웃 버튼 클릭 시 실행
  const handleLogout = async () => {
    try {
      await logout(); // Supabase 세션 제거 + localStorage 정리
      setUser(null); // NavBar 상태에서도 유저 제거
      navigate("/");
    } catch (err) {
      console.error("로그아웃 실패:", err);
    }
  };

  return (
    <header className="bg-black text-white">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        {/* 로고 */}
        <Link to="/" className="mr-2 text-5xl font-semibold">
          잼빙
        </Link>

        {/* 검색창 */}
        <div className="flex-1 flex justify-center">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="영화 제목을 입력하세요"
            className="h-9 w-full max-w-xl rounded-md bg-gray-700 px-3 text-sm text-white placeholder-gray-400 outline-none"
          />
        </div>

        {/* 오른쪽 영역: 로그인 전/후 UI 분기 */}
        <div className="flex items-center gap-2">
          {/* user가 없으면 → 로그인 / 회원가입 버튼 */}
          {!user && (
            <>
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
            </>
          )}

          {/* user가 있으면 → 프로필 + 로그아웃 */}
          {user && (
            <div className="flex items-center gap-2">
              {/* 썸네일 / 이니셜 */}
              <div className="flex items-center gap-2">
                {user.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt="프로필"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-violet-500 flex items-center justify-center text-xs font-bold">
                    {user.userName
                      ? user.userName[0].toUpperCase()
                      : user.email[0].toUpperCase()}
                  </div>
                )}
                <span className="text-xs text-slate-200">
                  {user.userName || user.email}
                </span>
              </div>

              {/* 로그아웃 버튼 */}
              <button
                onClick={handleLogout}
                className="rounded-full bg-slate-700 px-3 py-1 text-xs font-semibold text-white hover:bg-slate-600"
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
