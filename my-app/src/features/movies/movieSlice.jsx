import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies',
async (term) => {
const response = await axios
.get(`http://www.omdbapi.com/?s=${term}&apikey=9f9293c6&type=movie`);
return response.data;
})



export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows',
async (term) => {
	const response = await axios
	.get(`http://www.omdbapi.com/?s=${term}&apikey=9f9293c6&type=series`);
    return response.data;
})
	

export const fetchAsyncMovieOrShowDetail = createAsyncThunk('movies/fetchAsyncMovieOrShowDetail',
async (id) => {
	const response = await axios
	.get(`http://www.omdbapi.com/?i=${id}&apikey=9f9293c6&Plot=full`);
    return response.data;
})
	

const initialState = {
	movies: {},
	shows:{},
	selectMovieOrShow: {},
	isLoading: false,
	favoriteMovies: [],
  };
  
  
  const movieSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {
		removeSelectedMovieOrShow:(state)=>{
        state.selectMovieOrShow = {};
		},
		setLoading: (state) => {
			state.isLoading = true;
		},
		setNotLoading: (state) => {
			state.isLoading = false;
		},
		addFavoriteMovie: (state, { payload }) => {
			state.favoriteMovies.push(payload);
		},
		removeFavoriteMovie: (state, { payload }) => {
			state.favoriteMovies = state.favoriteMovies.filter(movie => movie.imdbID !== payload.imdbID);
		}
	},
	extraReducers: (builder) => {
		builder
		.addCase(fetchAsyncMovies.pending, () => {
	console.log("Pending");
		})		
		.addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
		console.log("Fetched Successfully!");
		return { ...state, movies: payload };
		})
		.addCase(fetchAsyncMovies.rejected, () => {
		console.log("Rejected!");
		})
		.addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
			console.log("Fetched Successfully!");
			return { ...state, shows: payload };
		})
		.addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, { payload }) => {
			console.log("Fetched Successfully!");
			return { ...state, selectMovieOrShow: payload };
		});
	},
});
  
export const {removeSelectedMovieOrShow, setLoading, setNotLoading,addFavoriteMovie, removeFavoriteMovie} = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export const getFavoriteMovies = (state) => state.movies.favoriteMovies;
export default movieSlice.reducer;
