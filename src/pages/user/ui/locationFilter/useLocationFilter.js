
import {useState, useEffect} from 'react'
import React from "react";


export const useLocationFilter = ( initialFilters = [] ) =>{

const [filters, setFilters] = useState(initialFilters);

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

  // A AND B AND C.. filter for tags/icons
    /* this peice of code sais:
        for EACH post p:
          is every string within updatedFilters included in p.icons string array ? (thats what arr.every(..) does)
    */
  const applyFilters = (posts, filters) =>{
     //the output is a list of posts with icons that contains all the entries in filters
    return posts.filter( (post) => filters.every( (filterName) => post.icons.includes(filterName) ) )
  }

  return [
    filters,
    {
      applyFilters, 
      selectFilter,
      deSelectFilter,
    },
  ]; 
}

