import { Link } from "react-router-dom";
import { useState } from "react";
import user from "../../images/user.png";
import "./Header.scss";
import CircularColor from '../../common/Circular';
import { useDispatch,useSelector } from "react-redux";
import {
  fetchAsyncMovies,
  fetchAsyncShows,setLoading,setNotLoading
} from "../../features/movies/movieSlice";
import TheatersRoundedIcon from '@mui/icons-material/TheatersRounded';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';




export const Header = () => {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();
 
  const isLoading = useSelector((state) => state.movies.isLoading); 

  const submitHandler = (e) => {
    e.preventDefault();
    if (term === "") return alert("Please enter search term!");
	dispatch(setLoading());
    dispatch(fetchAsyncMovies(term))
      .then(() => {
        dispatch(fetchAsyncShows(term));
        dispatch(setNotLoading()); 
      });
    
    setTerm("");
  };

  return (
    <>
      <div className="header">
        <div className="logo">
          <Link to="/"><TheatersRoundedIcon/></Link>
        </div>
        <div className="search-bar">
         
          <form onSubmit={submitHandler}>
            {isLoading &&  <CircularColor/>}
           <input
              type="text"
              value={term}
              placeholder="Search Movies or Shows"
              onChange={(e) => setTerm(e.target.value)}
            />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
        <div className='watchlist'>
         <Link to="/watchlist" className='link'>
          <BookmarkAddIcon/>
         <span>WatchList</span></Link>
        </div>
        <div className="user-image">
          <img src={user} alt="user" />
        </div>
      </div>
    </>
  );
};


