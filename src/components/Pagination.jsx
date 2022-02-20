import React from "react";
function Pagination({pageProp,next,prev}){
    return <>
        <div className="w-full flex justify-center mb-8">
            <button className="p-2 border-2 border-indigo-500 text-indigo-500 border-r-0 rounded-l-xl" 
            onClick={prev}
            >Previous</button>
            <button className="p-2 border-2 border-indigo-500 text-indigo-500 bg-gray-300">
                {pageProp}
                </button>
            <button className="p-2 border-2 border-indigo-500 text-indigo-500 border-l-0 rounded-r-xl" 
            onClick={next}
            >Next</button>
        </div>
    </>
}
export default Pagination;