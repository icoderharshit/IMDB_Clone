import React,{useState,useEffect} from 'react';
import axios from "axios";
import "./Banner.css"
function Banner() {
    let [movie,setMovie]=useState([]);
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=5fa9983dcd57ee2bd5036fb4f2bdad3d`).then((res)=>{
            setMovie(res.data.results[0]);
        })
    },[]);
    return <>
        <div className=
        {`bg-[url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})] h-[40vh] md:h-[60vh] 
        bg-center bg-cover banner
        flex items-end  
    `}>
        <div className=" text-xl md:text-3xl text-white
            p-3 title
            bg-gray-900 bg-opacity-40
            w-full
            flex justify-center
        ">
               {movie.title}
                </div>
        </div>
    </>;
}

export default Banner;
