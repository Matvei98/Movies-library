import { useEffect} from "react";
import { MovieListing } from "../MovieListing/MovieListing";
import { useDispatch } from 'react-redux';
import { fetchAsyncMovies, fetchAsyncShows} from '../../features/movies/movieSlice';

export const Home = () => {

  const dispatch = useDispatch();

  const movieText1 = "Harry";
  const showText = "Friends";
  useEffect(() => {
    dispatch(fetchAsyncMovies(movieText1));
    dispatch(fetchAsyncShows(showText));
  }, [dispatch]);

  return (
    <>
      <div className="banner-img"></div>
      <MovieListing />
    </>
  );
};
