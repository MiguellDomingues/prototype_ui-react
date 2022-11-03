
import {useState} from 'react'
import React from "react";


export const useFilterContext= (data) =>{

  console.log("//////////////////////FilterContextProvider///////////////////////////")

    const [filters, setFilters] = useState([]);

    const [filteredPosts, setFilteredPosts] = useState(data)
   
const selectFilter = (iconName) => {
    return (e) => {
      e.preventDefault();
      console.log("select FILTER GP: ", iconName, filters)
      const copyFilters = [...filters].concat( [iconName] )
      updateFilters (copyFilters)
  }}

  const deSelectFilter = (iconName) => {
    return (e) => {
      e.preventDefault();
      console.log("deselect FILTER GP: ", iconName, filters)
      const copyFilters = [...filters.filter( (element) => {return element !== iconName} )]
      updateFilters (copyFilters)
  }}

  const updateFilters = (updatedFilters) => {

    // A AND B AND C.. filter for tags/icons
    /* this peice of code sais:
        for EACH post p:
          is every string within updatedFilters included in p.icons string array ? (thats what arr.every(..) does)
    */
   //the output is a list of posts with icons that contains all the entries in filters
    setFilteredPosts(data.posts.filter( (post) => updatedFilters.every( (filterName) => post.icons.includes(filterName) ) ))
    //batch update both the new filters and the filtered list
    setFilters(updatedFilters)
  }

  const value = {
    filteredPosts, 
    setFilteredPosts:setFilteredPosts, 
    filters, 
    setFilters: setFilters,
    handleSelectFilter:selectFilter,
    handleDeselectFilter: deSelectFilter,

  }

  return value
}

