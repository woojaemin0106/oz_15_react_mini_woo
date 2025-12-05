import { TMDB_BASE_URL, TMDB_TOKEN } from "./api";

async function tmdbFetch(path, options = {}) {
  const url = `${TMDB_BASE_URL}${path}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
    ...options, // 나중에 이 함수를 쓸 때 메소드 , 보디를 덮어쓸 수 있게 만들어줌
  });
  if (!res.ok) {
    const message = `TMDb 요청 실패: ${res.status} ${res.statusText}`;
    throw new Error(message);
  }
  return res.json();
}

// ✅ 인기 영화 목록
export async function getPopularMovies(page = 1, language = "ko-KR") {
  return tmdbFetch(`/movie/popular?language=${language}&page=${page}`);
}
// 영화 상세 정보
export async function getMovieDetails(id, { language = "ko-KR" } = {}) {
  if (!id) {
    throw new Error("영화 id가 없습니다.");
  }
  return tmdbFetch(`/movie/${id}?language=${language}`);
}
