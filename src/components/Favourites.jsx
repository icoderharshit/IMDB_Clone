import React,{useState,useEffect} from 'react';
import Pagination from '../components/Pagination';
import {EmojiSadIcon} from '@heroicons/react/solid';
import axios from "axios";
let genreids = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
  27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
}

function Favourites() {
  var user=localStorage.getItem("userId");
  const [currGenre,setCurGenre] =useState("All genres");
const [favourites,setFavourites]=useState([]);
const [genres,setGenres]=useState([]);

useEffect(()=>{
  let oldFav=JSON.parse(localStorage.getItem("movies"));
  // console.log()
  oldFav=JSON.parse(localStorage.getItem("movies")) || [];
  setFavourites(oldFav);
  },[]); 

useEffect(()=>{
let temp=favourites.map((movie)=>genreids[movie.genre_ids[0]])
setGenres(["All genres",...new Set(temp)]);
},[favourites])

let del = (movie)=>{
  let newArray=favourites.filter((m)=>m.id!==movie.id);
  let updatedMovies=[...new Set(newArray)];
  setFavourites([...new Set(newArray)]);
  localStorage.setItem("movies",JSON.stringify([...new Set(newArray)]));   
  // updatedMovies=updatedMovies;
  axios.put(`https://trip2movies-backend.herokuapp.com/updateFavourites/${user}`,updatedMovies);
  console.log("Favourites record updated for current user.");
}
let filteredMovies=currGenre==="All genres"?favourites:
  favourites.filter((movie)=>genreids[movie.genre_ids[0]]===currGenre)

const [rating,setRating]=useState(0);
if(rating===-1){
  filteredMovies.sort((objA,objB)=>{
      return objA.vote_average-objB.vote_average;
  })
}
else if(rating===1){
  filteredMovies.sort((objA,objB)=>{
    return objB.vote_average-objA.vote_average;
})
}

const [popularity,setPopularity]=useState(0);
if(popularity===-1){
  filteredMovies.sort((objA,objB)=>{
      return objA.popularity-objB.popularity;
  })
}
else if(popularity===1){
  filteredMovies.sort((objA,objB)=>{
    return objB.popularity-objA.popularity;
})
}

const [search,setSearch]=useState("");
filteredMovies=filteredMovies.filter((movie)=>movie.title.toLowerCase().includes(search.toLowerCase()));
 
 
const [rows,setRows]=useState(5); 
const [curPage,setCurPage]=useState(1);

let maxPages=Math.ceil(filteredMovies.length/rows);
let startIndex=(curPage-1)*rows;
let endIndex=Number(startIndex)+Number(rows);
filteredMovies=filteredMovies.slice(startIndex,endIndex);
let prev=()=>{
  if(curPage>1)
  {
    setCurPage(curPage-1);
  }
}
let next=()=>{
  if(curPage<maxPages)
  {
    setCurPage(curPage+1);
  }
}

return <>
    <div className='mt-4 flex justify-center flex-wrap space-x-2'>
        {
          genres.map((genre)=>{
            return <button className={
              currGenre===genre?
              'm-2 text-md p-1 px-2 bg-indigo-900 text-white rounded-xl font-bold'
            :'m-2 text-md p-1 px-2 bg-gray-500 text-white rounded-xl font-bold hover:bg-indigo-900'} onClick={()=>{
              setCurPage(1);
              setCurGenre(genre);
            }}>
              {genre}
            </button>
          })
        }
       
     
    </div>
    <div className='text-center'>
      <input placeholder="Search" value={search} onChange={(e)=>{
        setSearch(e.target.value)}} type="text" className='border border-2 text-center m-2 p-1' />
      <input placeholder="Rows" min={1} value={rows} onChange={(e)=>setRows(e.target.value)} type="number" className='border border-2 text-center m-2 p-1'/>

    </div>
    <div className='mt-4'>
    <div className="flex flex-col justify-center">
      <div className="overflow-x-auto">
        <div className="min-w-full py-2 align-middle inline-block  sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex">
                    <img src="https://img.icons8.com/material-outlined/18/000000/down-squared.png" alt="" className='mr-2 cursor-pointer' onClick={()=>{setPopularity(0); setRating(-1)}}/> 
                    Rating
                    <img src="https://img.icons8.com/material-outlined/18/000000/up-squared.png" alt="" className='ml-2 mr-2 cursor-pointer' onClick={()=>{setPopularity(0); setRating(1)}}/> 
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex">
                    <img src="https://img.icons8.com/material-outlined/18/000000/down-squared.png" alt="" className='mr-2 cursor-pointer' onClick={()=>{setRating(0); setPopularity(-1)}}/> 
                    Popularity
                    <img src="https://img.icons8.com/material-outlined/18/000000/up-squared.png" alt="" className='ml-2 mr-2 cursor-pointer' onClick={()=>{setRating(0); setPopularity(1)}}/> 
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    Genre
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                   Remove
                  </th>
                </tr>
              </thead>
           
              <tbody className="bg-white divide-y divide-gray-200">
                {
                filteredMovies.length!==0?  
                filteredMovies.map((movie) => (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div key={movie.id} className="flex items-center">
                        <div className="flex-shrink-0 md:h-28 md:w-40 md:inline-block hidden">
                          <img className="h-28 w-40" src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">{movie.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-500">{movie.vote_average}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{movie.popularity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 rounded-full bg-indigo-200">
                      <div className="text-sm font-semibold text-gray-500">
                        {/* {
                            genres.find((m,index)=>{
                              if(m.id === movie.genre_ids[0])
                              genreName=genres[index].name;
                            })
                        } */}
                       {genreids[movie.genre_ids[0]]}
                      </div>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm ">
                      <button href="#" className="text-red-600 font-semibold  hover:text-red-900" onClick={()=>del(movie)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                )):<tr><td colSpan={5} className='text-center text-indigo-600 p-4' >
                  No movies added to favourites yet... <EmojiSadIcon style={{"width":"20px","height":"20px","display":"inline-block"}} /> 
                  </td></tr>
                      }
              </tbody>
           


            </table>
          </div>
        </div>
      </div>
    </div>


    </div>
    <div className='mt-4'>
      {
        filteredMovies.length!==0?
      <Pagination pageProp={curPage} prev={prev} next={next} />:<></>}
      </div>
</>
}
export default Favourites;
      