import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { TMDB_TOKEN, TMDB_BASE_URL } from "../constants/api";

function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPopularMovies() {
      try {
        const res = await fetch(
          `${TMDB_BASE_URL}/movie/popular?language=ko-KR&page=1`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${TMDB_TOKEN}`, // 공백 추가
            },
          }
        );

        if (!res.ok) {
          throw new Error("TMDB 인기 영화 요청 실패"); //  중괄호로 수정
        }

        const data = await res.json(); //  응답 JSON 파싱

        // 성인영화 제외
        const filtered = data.results.filter((movie) => movie.adult === false);

        // 상태에 저장
        setMovies(filtered);
      } catch (error) {
        console.error("TMDB API 호출 에러:", error);
      } finally {
        setIsLoading(false); //  로딩 종료
      }
    }

    // 실제로 함수 호출
    fetchPopularMovies();
  }, []); // 컴포넌트 처음 마운트될 때만 실행

  return (
    <div className="min-h-screen bg-gradient-to-b from-black/70 to-transparent  text-slate-50">
      <header className="px-6 pt-6 pb-4">
        <h1 className="text-2xl font-bold ">인기 영화</h1>
        <p className="mt-1 text-sm text-slate-400">TMDb 인기 영화</p>
      </header>

      <main className="px-6 pb-10">
        {/* 로딩중일 때 표시 */}
        {isLoading && (
          <p className="text-sm text-slate-400">
            인기 영화를 불러오는 중입니다...
          </p>
        )}

        {/* 로딩이 끝나면 캐러셀 보여주기 */}
        {!isLoading && (
          <section>
            <Swiper
              spaceBetween={50}
              slidesPerView={4}
              breakpoints={{
                0: {
                  slidesPerView: 1, // 모바일
                },
                640: {
                  slidesPerView: 2, // sm
                },
                768: {
                  slidesPerView: 3, // md
                },
                1024: {
                  slidesPerView: 4, // lg
                },
              }}
            >
              {movies.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <MovieCard
                    title={movie.title}
                    posterPath={movie.poster_path}
                    rating={movie.vote_average}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}
      </main>
    </div>
  );
}

export default Home;
