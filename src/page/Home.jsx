import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getPopularMovies, searchMovies } from "../hooks/TMDb";
import { useSearchParams } from "react-router-dom";

function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // URL 쿼리 읽기
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    async function fetchMovies() {
      setIsLoading(true);

      try {
        let data;

        if (query) {
          //  검색어가 있을 때
          data = await searchMovies(query, 1);
        } else {
          //  검색어가 없을 때
          data = await getPopularMovies(1);
        }

        const filtered = data.results.filter((movie) => movie.adult === false);
        setMovies(filtered);
      } catch (error) {
        console.error("TMDB API 호출 에러:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [query]); // query가 바뀔 때마다 요청 다시

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
                    id={movie.id}
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
