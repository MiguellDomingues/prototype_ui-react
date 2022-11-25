
import {useState, useEffect} from 'react'
import React from "react";


export const useLocationFilter = ( initialFilters = [] ) =>{

  

 // console.log("//////////////////////FilterContextProvider///////////////////////////")
 // console.log("input data: ", initialData)
 // console.log("posts: ", posts)

// const [posts, setPosts] = useState()

  const [filters, setFilters] = useState(initialFilters);

 // const [filteredPosts, setFilteredPosts] = useState()

  //const [filteredPosts, setFilteredPosts] = useState( posts )
   
const selectFilter = (iconName) => {
    return (e) => {
      e.preventDefault();
      console.log("select FILTER GP: ", iconName, filters)
      const copyFilters = [...filters].concat( [iconName] )
      setFilters(copyFilters )
     // updateFilters (copyFilters)
  }}

  const deSelectFilter = (iconName) => {
    return (e) => {
      e.preventDefault();
      console.log("deselect FILTER GP: ", iconName, filters)
      const copyFilters = [...filters.filter( (element) => {return element !== iconName} )]
      setFilters(copyFilters )
     // updateFilters (copyFilters)
  }}

  //const initFilter = (new_posts, new_filters) => {
   // setPosts(new_posts)
   // setFilters(new_filters)
   // setFilteredPosts(filterPosts(new_posts,new_filters))
 // }

  // A AND B AND C.. filter for tags/icons
    /* this peice of code sais:
        for EACH post p:
          is every string within updatedFilters included in p.icons string array ? (thats what arr.every(..) does)
    */
  const applyFilters = (posts, filters) =>{
     //the output is a list of posts with icons that contains all the entries in filters
    return posts.filter( (post) => filters.every( (filterName) => post.icons.includes(filterName) ) )
  }

  /*
  const updateFilters = (updatedFilters) => {
   //the output is a list of posts with icons that contains all the entries in filters
   // setFilteredPosts(filterPosts(posts, updatedFilters))
    //console.log("apply new filters ", updatedFilters)
   // setFilters(updatedFilters)
  }
  */

   // useEffect( () => {
        
    //  console.log("loc filter useffect: ", filters)
 // },[filters] );

 // console.log("//////////////////////Filter///////////////////////////")
 // console.log("filteredPosts: ", filteredPosts)
 // console.log("filters: ", filters)
 // console.log("posts: ", posts)

 

  return [
    filters,
    {
      applyFilters, 
      selectFilter,
      deSelectFilter,
    },
  ]; 
}

