import { useSelector} from 'react-redux'
import { getFavoriteMovies } from '../../features/movies/movieSlice';
import { MovieCard } from '../MovieCard/MovieCard';
import "../WatchList/WatchList.scss";

export const WatchList = () => {
  const favoriteMovies = useSelector(getFavoriteMovies);

	let renderFavoriteMovies = favoriteMovies.map((movie, index) => (
		<MovieCard key={index} movieData={movie} />
	));
  return (
    <>
   <div className="favorite-movies">
        <h2>Favorite Movies</h2>
        <div className="favorite_movies_image">
       {renderFavoriteMovies}
        </div>
      </div>
    </>
  );
};
