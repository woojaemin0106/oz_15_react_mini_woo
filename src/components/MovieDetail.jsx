import { useState } from "react";
import movieDetailData from "../data/movieDetailData.json";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieDetail() {
  const [movie] = useState(movieDetailData);

  {
    /* 안전장치 */
  }
  if (!movie) return null;
  const { title, poster_path, backdrop_path, vote_average, genres, overview } =
    movie;

  {
    /* 포스터 이미지 , 경로  */
  }
  const posterPath = poster_path || backdrop_path;
  const posterSrc = posterPath ? `${IMAGE_BASE_URL}${posterPath}` : "";

  {
    /* 숫자일 경우 -> 소수점 한자리 아닐 시 - 표기 */
  }
  const ratingText =
    typeof vote_average === "number" ? vote_average.toFixed(1) : "-";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 md:flex-row">
        {/* 왼쪽: 포스터 영역 */}
        <section className="md:w-1/3">
          <div className="overflow-hidden rounded-md bg-slate-800">
            {posterSrc ? (
              <img
                src={posterSrc}
                alt={title}
                className="aspect-2/3 w-full object-cover"
              />
            ) : (
              <div className="flex aspect-2/3 items-center justify-center text-sm text-slate-300">
                포스터 이미지 없음
              </div>
            )}
          </div>
        </section>

        {/* 오른쪽: 제목 / 평점 / 장르 / 줄거리 */}
        <section className="flex flex-1 flex-col gap-4">
          {/* 제목 + 평점 */}
          <header className="flex items-center gap-3">
            <h1 className="text-xl font-semibold md:text-2xl">{title}</h1>
            <span className="inline-flex items-center rounded-md bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
              ⭐ {ratingText}
            </span>
          </header>

          {/* 장르 */}
          <div className="rounded-md bg-slate-900 px-4 py-3">
            <p className="text-xs font-semibold text-slate-400">장르</p>
            <p className="mt-1 text-sm text-slate-100">
              {genres?.length
                ? genres.map((g) => g.name).join(" · ")
                : "장르 정보 없음"}
            </p>
          </div>

          {/* 줄거리 */}
          <div className="flex-1 rounded-md bg-slate-900 px-4 py-3">
            <p className="text-xs font-semibold text-slate-400">줄거리</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-100">
              {overview || "줄거리 정보가 아직 등록되지 않았습니다."}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
