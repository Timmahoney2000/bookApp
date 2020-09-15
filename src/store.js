'use strict';


//store object containing all object keys for bookmark
let store = {
  bookmarks: [],
  add: false,
  error: null,
  filter: 0,
  editing: false,
  expanded: null
};

//function for creating error from store 
function createError(err){
  store.error = (err)
}
//function for clearing error from store
function endError(){
  store.error = null
}

//function for adding bookmarks to store
function toggleAdd(){
    //if else statement for adding bookmark to store
  if (store.add === false){
    store.add = true
  } else {
    store.add = false
  }
}

function addFalse(){
  store.add = false;
}

//function for creating a star rating for bookmark
function toggleRate(val){
  store.filter = val
}

//function for adding a new bookmark to store module
function addStore(item){
  store.bookmarks.push(item)
}

//function for deleting bookmark from store module
const findDelete = function (id) {
  this.store.bookmarks = this.store.bookmarks.filter(currentItem => currentItem.id !== id)
};


//function for editing existing bookmarks
function toggleChange(){
    //if else statement for editing existing bookmarks
  if (store.editing === false){
    store.editing = true
  } else {
    store.editing = false
  }
}

//function for a detailed view of bookmark
function toggleOpen(val){
  store.expanded = val
}

//function for updating the data of a bookmark in the store module
function findUpdate(id, newData){
    //variable for item to add new data/update bookmark in store module using 'id'
  let item = this.store.bookmarks.find(element => element['id'] === id);
  Object.assign(item, newData);
}

//exports all functions to other modules
export default {
  addStore,
  store,
  findDelete,
  toggleAdd,
  //changed to toggleRate
  toggleRate,
  //changed to toggleChange
  toggleChange,
  toggleOpen,
  findUpdate,
  createError,
  addFalse,
  endError
}