import { Link } from "react-router-dom";

const Image_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ title, posterPath, rating }) {
  const posterUrl = Image_URL + posterPath;
  const formattedRating =
    typeof rating === "number" ? rating.toFixed(1) : rating;

  return (
    <Link to="/details" className="block cursor-pointer">
      <article className="flex flex-col bg-slate-900 rounded-md overflow-hidden shadow-md hover:-translate-y-1 hover:shadow-xl transition-transform">
        {/*포스터 부분 */}
        <div className="relative w-full aspect-2/3 bg-slate-700">
          <img
            src={posterUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        {/* 제목 + 평점  */}
        <div className="flex flex-col gap-1 px-3 py-2">
          <h3
            className="text-sm font-semibold text-slate-50 truncate"
            title={title}
          >
            {title}
          </h3>
          <p className="text-xs text-amber-300">평점 {formattedRating}</p>
        </div>
      </article>
    </Link>
  );
}

export default MovieCard;
