import { useState } from "react";
import movieListData from "./data/movieListData.json";
import MovieCard from "./components/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
function Home() {
  const [movies] = useState(movieListData.results);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black/70 to-transparent  text-slate-50">
      <header className="px-6 pt-6 pb-4">
        <h1 className="text-2xl font-bold ">인기 영화</h1>
        <p className="mt-1 text-sm text-slate-400">더미 메인 페이지</p>
      </header>
      <main className="px-6 pb-10">
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
              <SwiperSlide>
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                  rating={movie.vote_average}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </main>
    </div>
  );
}

export default Home;
