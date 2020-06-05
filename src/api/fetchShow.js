import React from 'react';
import axios from 'axios';

//moved the fetch data from app to aoi folder.
  export const fetchShow = () => {
     return axios
     .get("https://api.tvmaze.com/singlesearch/shows?q=stranger-things&embed=episodes")
     .then(data => {
         console.log('find the episode', data);
         return data;
     })
     .catch(error => {
         console.error("error fetching data from api, err: ", error.message);
     });
 };