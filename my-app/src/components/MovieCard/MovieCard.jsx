import { Link } from 'react-router-dom';
import './MovieCard.scss'
import PropTypes from 'prop-types';
import { useDispatch,useSelector } from 'react-redux';
import {addFavoriteMovie,removeFavoriteMovie} from '../../features/movies/movieSlice';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { useState } from 'react';



export const MovieCard = ({ movieData}) => {
  const dispatch = useDispatch();

  const handleAddToFavorites = () => {
    dispatch(addFavoriteMovie(movieData));
  };

  const handleRemoveFromFavorites = () => {
    dispatch(removeFavoriteMovie(movieData));
  };

  const isFavorite = useSelector((state) =>
    state.movies.favoriteMovies.some((movie) => movie.imdbID === movieData.imdbID)
  );
 
  const [hover, setHover] = useState(false);
return(
 <div className='card-item'>
    {isFavorite ? (
        <button onClick={handleRemoveFromFavorites} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {hover ? <BookmarkRemoveIcon /> : <BookmarkAddedIcon />}</button>
      ) : (
        <button onClick={handleAddToFavorites}> <BookmarkAddIcon /></button>
      )}
<Link to={`/movie/${movieData.imdbID}`}>
        <div className="card-inner">
          <div className="card-top">
          <img src={movieData.Poster} alt={movieData.Title} />
          </div>
          <div className="card-bottom">
            <div className="card-info"> 
  <Link className='link_title' to={`/movie/${movieData.imdbID}`}><h4>{movieData.Title}</h4></Link>
              <p>{movieData.Year}</p>
            </div>
          </div>
        </div>
      </Link>
</div>
)
}
MovieCard.propTypes = {
  movieData: PropTypes.shape({
    imdbID:PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Poster: PropTypes.string.isRequired
  }).isRequired
};