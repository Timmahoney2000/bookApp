'use strict';

//base url api = thinkful api + my name/bookmarks
let baseUrl = 'https://thinkful-list-api.herokuapp.com/tim/bookmarks';


//function bigFetch is the main fetch function
function bigFetch(...args){
    //variable error for this if statement if fetch fails
  let error;
  return fetch(...args)
  .then(res => {
    if (!res.ok){
      error= { code: res.status };
    }
    return res.json();
  })
  .then(data => {
    if (error) {
      //error message returned to user if fetch fails
      error.message = data.message;
      return Promise.reject(error);
    }
    return data;
  })
  //catch block with console.log. was having issues with this earlier, seems to be resolved
  .catch(error =>{console.log(error)})
  
}

//GET for returning to bookmarks using bigFetch function for api call
function getBookmark() {
  return bigFetch(`${baseUrl}`)
  
}

// POST fetch
//POST for adding a new bookmark & using bigFetch function for confirmation
function newBookmark(title, url, desc, rating){
    //newItem function to update JSON object
  let newItem = JSON.stringify({
     title: title,
     url: url,
     desc: desc,
     rating: rating 
  })
  return bigFetch(`${baseUrl}`, {
    method: "POST",
      headers: {"Content-Type": "application/json"},
      body: newItem
  })
  
}

//DELETE for removing bookmarks & bigFetch function for confirmation
function deleteBookmark(id){
  return bigFetch(`${baseUrl}/${id}`, {
    method: "DELETE"
  })
};

//PATCH for updating bookmarks & bigFetch function for confirmation
function changeBookmark(id, title, url, desc, rating){
    //newItem function to update JSON object
  let newItem = JSON.stringify({
    title: title,
    url: url,
    desc: desc,
    rating: rating 
 })
 return bigFetch(`${baseUrl}/${id}`, {
  method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: newItem
})

}
//exports all functions to related modules
export default{
    
  getBookmark,
  newBookmark,
  deleteBookmark,
  changeBookmark
}
