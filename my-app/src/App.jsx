import './App.scss'
import { Route,Routes } from "react-router-dom";
import {Header} from './components/Header/Header'
import {MovieDetail} from './components/MovieDetail/MovieDetail';
import {PageNotFound} from './components/PageNotFound/PageNotFound';
import {Footer} from './components/Footer/Footer';
import {Home} from './components/Home/Home'
import { WatchList } from './components/WatchList/WatchLIst';


function App() {
 return (
    <>
   <div className="app">
        <Header/>
        <div className="container">
         <Routes>
            <Route path="/"  element={<Home/>} />
            <Route path="/movie/:imdbID" element={<MovieDetail/>} />
            <Route path="/watchlist" element={<WatchList/>}/>
            <Route element={<PageNotFound/>} />
          </Routes>
        </div>
        <Footer />
    </div>
    </>
  )
}

export default App
