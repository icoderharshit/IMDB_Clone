import React, { useState,useEffect } from "react";
import Pagination from './Pagination'; 
import axios from "axios";
import {Oval} from "react-loader-spinner";
function Movies(){
    let [movies,setMovies]=useState([]);
    let [page,setPage]=useState(1);
    let [hover,setHover]=useState();
    let [favourites,setFavourites]=useState([]);
    function next(){
        setPage(page+1);
    }
    function prev(){
        if(page>1)
        setPage(page-1);
    }
    useEffect(function(){
        axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=5fa9983dcd57ee2bd5036fb4f2bdad3d&page=${page}`).then((res)=>{
            setMovies(res.data.results);
            let oldFav=localStorage.getItem("imdb");
            oldFav=JSON.parse(oldFav) || [];
            setFavourites([...oldFav]);
        })
    },[page])
    let add=(movie)=>{
        let newArray=[...favourites,movie]
        setFavourites([...newArray]);
        console.log(newArray);
        localStorage.setItem("imdb",JSON.stringify(newArray));
    }
    let del = (movie) => {
        let newArray = favourites.filter((m) => m.id !== movie.id)
        setFavourites([...newArray])
        localStorage.setItem("imdb", JSON.stringify(newArray))
    }

    return <>
        <div className="mb-8">
        <div className="mt-8 mb-8 font-bold text-2xl text-center">Trending Movies</div>
        {
            movies.length===0?
            <div className="flex justify-center">
            <Oval color="grey" height={100} width={100} secondaryColor="grey" />
            </div>:
        <div className="flex flex-wrap justify-center">
            {
               movies.map((movie)=>(
                    <div className=
                    {`bg-[url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})] md:h-[30vh] md:w-[250px] h-[25vh] w-[150px]
                    bg-center bg-cover rounded-xl flex items-end m-4 hover:scale-110 ease-out duration-300 relative 
                 `} onMouseEnter={()=>{setHover(movie.id)
                 console.log(movie.id)
                 }}
                 onMouseLeave={
                     ()=>
                     setHover("")
                 }
                 >
                     {
                         hover===movie.id &&
                         <>
                         {
                             favourites.find((currentMovie)=>
                             currentMovie.id===movie.id
                             )? <div className="absolute top-2 right-2 p-2 bg-gray-800 rounded-xl text-xl cursor-pointer"
                             onClick={()=>del(movie)}
                             >❌</div>:
                             <div className="absolute top-2 right-2 p-2 bg-gray-800 rounded-xl text-xl cursor-pointer"
                             onClick={()=>add(movie)}
                             >😍</div>
                         }
                         </>
                       
                        
                     }
                    <div className="bg-gray-900 w-full text-white py-2 text-center rounded-b-xl text-xl font-bold">
                        {movie.title}
                    </div>
                        </div>
                ))
            }
        </div>
        }
        </div>
        <Pagination pageProp={page} next={next} prev={prev} />
    </>
}
export default Movies;