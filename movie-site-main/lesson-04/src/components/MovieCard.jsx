import { useState } from "react";
import "./MovieCard.css";

function MovieCard({ title, year, duration, genre, rating, poster, available }) {
  const [liked, setLiked] = useState(false);
  const [myRating, setMyRating] = useState(0);
 const [count, setCount] = useState(0);
  function handleLike() {
  setLiked(!liked);
  console.log("liked:", liked);
}

  return (
    <article className="movie-card">
      <div className="movie-card__poster">
        <img src={poster} alt={title} />
        {available &&<span className="movie-card__badge">זמין לצפייה</span>}
        <button className="movie-card__like" onClick={handleLike}>
          {liked ? "♥" : "♡"}
        </button>
      </div>
      <div className="movie-card__body">
        <button onClick={() => setCount(count + 1)}>{count}</button>
        <h3 className="movie-card__title">{title}</h3>
        <p className="movie-card__meta">
          {year} · {duration} דק׳
        </p>
        <div className="movie-card__footer">
          <span className="movie-card__genre">{genre}</span>
          <span className="movie-card__rating">★ {rating}</span>
        </div>
        <div className="movie-card__stars">
    {[1, 2, 3, 4, 5].map((star) => (
    <button
      key={star}
      className="star-button"
      onClick={() => setMyRating(myRating === star ? 0 : star)}
    >
      {star <= myRating ? "★" : "☆"}
    </button>
  ))}
</div>
      </div>
    </article>
  );
}

export default MovieCard;