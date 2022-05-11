import React, { useState,useEffect } from "react";
import Pagination from './Pagination'; 
import axios from "axios";
import {Oval} from "react-loader-spinner";
import {CameraIcon} from '@heroicons/react/solid';
import "./scrollbar.css";
function Movies(){
    var user=localStorage.getItem("userId");
    let [movies,setMovies]=useState([]);
    let [page,setPage]=useState(1);
    let [hover,setHover]=useState();
    let [favourites,setFavourites]=useState([]);
    let [userMovies,setUserMovies]=useState([]);
    useEffect(function(){
        getMovies();
    },[userMovies])
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
        })
       
    },[page])

   async function getMovies(){
      await  axios.get(`https://trip2movies-backend.herokuapp.com/getMovies/${user}`).then((response)=>{
            console.log(response.data.movies);
      let oldFav=response.data.movies;
      localStorage.setItem("movies",JSON.stringify(oldFav));   
        oldFav=oldFav || [];
        setFavourites([...oldFav]);
        })  
    }
 
 
    let add=(movie)=>{
        let newArray=[...favourites,movie]
        let updatedMovies=[...new Set(newArray)];
        setFavourites([...new Set(newArray)]);
        localStorage.setItem("movies",JSON.stringify([...new Set(newArray)]));   
        axios.put(`https://trip2movies-backend.herokuapp.com/updateFavourites/${user}`,updatedMovies);
        console.log("Favourites record updated for current user.");
    }
    let del = (movie) => {
        let newArray = favourites.filter((m) => m.id !== movie.id)
        let updatedMovies=[...new Set(newArray)];
        setFavourites([updatedMovies])
        localStorage.setItem("movies",JSON.stringify([...new Set(newArray)]));   
        axios.put(`https://trip2movies-backend.herokuapp.com/updateFavourites/${user}`,updatedMovies);
        console.log("Favourites record updated for current user.");
    }

    return <>
        <div className="mb-8">
        <div className="mt-8 flex justify-center mb-8 font-bold text-2xl md:text-3xl text-center uppercase text-indigo-900"><CameraIcon style={{"width":"25px","display":"inline-block"}} className="mr-2 text-indigo-900" />Trending Movies</div>
        {
            movies.length===0?
            <div className="flex justify-center">
            <Oval color="grey" height={100} width={100} secondaryColor="grey" />
            </div>:
        <div className="flex flex-wrap justify-center">
            {
               movies.map((movie)=>(
                    <div className=
                    {`bg-[url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})] md:h-[35vh] md:w-[250px] sm:h-[40vh] sm:w-[250px] h-[48vh] w-[320px]
                    bg-center bg-cover rounded-lg flex items-end m-4 hover:scale-110 ease-out duration-300 relative 
                 `}
                 key={movie.id} onMouseEnter={()=>{setHover(movie.id)}}
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
                    <div className="bg-gray-900 w-full text-white py-1 px-1 text-center rounded-b-xl text-lg">
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