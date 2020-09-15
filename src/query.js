'use strict';
//refactored 9/11
import $ from 'jquery';
import store from './store'
import api from './api'




//add html to html file for collapsing 
function addHtml(item) {
  //adds rating for bookmarks to store
  if (item.rating >= store.store.filter) {

    return `<li class="element" data-item-id="${item.id}">

    <div class = 'list'>
      <div class = 'item'>
        ${item.title}
      </div>
      <div class = 'item'>  
        ⭐${item.rating}⭐
     </div>
    </div>
    </li>`
  }
}

//function for expanded html
function addHtmlOpen(item) {
  if (item.rating >= store.store.filter) {
    //connect functions between files correctly
    return `<li class="element" data-item-id="${item.id}">
    <div class = 'list'>
      <div class = 'item'>
        ${item.title}
      </div>
      <div class = 'item'>  
        ⭐${item.rating}⭐
     </div>
     <div class = 'expand'>
      ${item.desc} 
      <a class = 'button' href='${item.url}';"}'>Link</a>
      <button class = 'edit'>Edit</button>
      <button class = 'delete'>Delete</button>
      
     </div>
    </div>
    </li>`

  }
} //I have no idea why this closing bracket is red but if I delete the code gets angry, so it stays

//function for returning to the main home page
function homePage() {
  return `   <!--changed name of "home" to "main"-->
  <div class= "main">
      <!--change button class "new" to "add"-->
      <button class= "add">Add Bookmark</button>
      <!--changed select class "select" to "choose"-->
     
  </div>
  <ul>

  </ul> `
}

//function to add form into html via this js file
function addForm() {
  return `<form id="addBookmark">
  <fieldset>
    
  <h3>Create a Bookmark</h3>
  <div class = 'all'>
    <div class = 'column'>
      <div class = 'row'>
        <input class= 'title' type="text" placeholder ='Title' name ='title'>
        <input class = 'link' type="text" placeholder = 'Link goes here'name ='link'>
      </div>
      <textarea id="desc" placeholder = 'Description goes here.' name ='description'></textarea>
    </div>
    <form id= "add-bookmark-form">
    <select class= "choose" name="star-rating" size= "1">
        <!--change option value names. good the way they are-->
        <option value="0" disabled selected hidden>Rating</option>
        <option value="5" 5 Stars>5 Stars</option>
        <option value="4" 4 Stars>4 Stars</option>
        <option value="3" 3 Stars>3 Stars</option>
        <option value="2" 2 Stars>2 Stars</option>
        <option value="1" 1 Star>1 Stars</option>
    </select>

  </div>
  <button type ='submit'>Submit</button>
  <button type = 'reset'>Reset</button>
  </fieldset>
  </form>`
}

//function for editing bookmarks in html via this js file
function editValues(item) {
  return `<li class="element" data-item-id="${item.id}">
<form>
<div class = 'list'>
  <div class = 'item'>
  <label for ='changeName'>Edit the Title!</label>  
  <input id = 'changeName' class ='changeName' type = 'text' value = "${item.title}">
    
    </div>
  <div class = 'item'>  
  <label for ='changeRating'>⭐How many stars?⭐</label>
  <input id ='changeRating' class = 'changeRating' type = 'text' value = '${item.rating}'>
  
 </div>
 <div class = 'expands'>
 <label for = 'newDesc'>Change the Description?</label> 
 <textarea type = 'text' id = 'newDesc'>${item.desc}</textarea>
  
  <label for ='newLink'>New Link?</label>
  <input id ='newLink' type = 'text' value = '${item.url}' class = 'changeUrl'>
  
  <button class = 'changeVals'>Submit Changes</button>
  <button class = 'delete'>Delete</button>
 </div>
</div>
</form>
</li>`
}

//creates strings from bookmarks for visibility
function createString(bookmarks) {
  //maps through the bookmarks to create the strings
  const items = bookmarks.map((item) => addHtml(item));
  return items.join('');
}

//render function for displaying errors and data
function render() {

  //add data to the store module
  let data = store.store
  //console.log('cldd');
  //console.log(data);
  if (data.error !== null) {
    //alertMessage(data.error)
    store.clearError

  } else {
    if (data.add === false) {
      //console.log('tacocat');
      //console logged tacocat to find a bug because it sounds funny & palindromes are cool
      let items = [...store.store.bookmarks]
      if (data.expanded !== null) {
        //maps through the stringified bookmarks
        const newHtmlString = store.store.bookmarks.map(function (val) {
          if (val.id === store.store.expanded) {
            if (data.editing === false) {
              return addHtmlOpen(val)
            } else {

              return editValues(val)
            }

          } else {

            return addHtml(val)
          }
        })
        //connects to <ul> in html file
        $('ul').html(newHtmlString);

      } else {
        // console.log('bigJoe');
        //console logged 'bigJoe' because my large brother in law Joe helped me debug this app
        const newBookmark = createString(items)
        $('main').html(homePage())
        $('ul').html(newBookmark)
      }

    } else {

      //entryForm variable to create a new form in html
      let entryForm = addForm()
      $('main').html(entryForm)
      //jQuery to main for html updating
      let items = [...store.store.bookmarks]
      //items variable for updating store array
      const newBookmark = createString(items);
      //jQuery call for updating the unordered list in html
      $('ul').html(newBookmark)
    }

  }



}

//function for adding new bookmarks
function newAdd() {
  $('main').on('click', 'button.add', function () {
    store.toggleAdd();
    render()
  })
}
//function for alert message when invalid types are entered
function alertMessage(msg) {
  //variable for jQuery to confirmation
  let confirmation = $("#confirm");
  //confirmation find on 'message'
  confirmation.find(".message").text(msg);
  //confirmation for find on 'yes'
  confirmation.find(".yes").unbind().click(function () {
    //confirmation on hide 
    confirmation.hide();
  });
  //confirmation to show
  confirmation.show();
}

//function to add new bookmarks to store module
function newLink() {
  //jQuery call to 'main' for bookmark submit
  $('main').on('submit', '#addBookmark', function (event) {
    event.preventDefault();
    //console.log for checking errors on button click
    console.log('create button click');
    //variable for calling jQuery to input title
    let title = $('input.title').val();
    //variable for calling jQuery to input link
    let link = $('input.link').val();
    //variable for calling jQuery to input description
    let desc = $('#desc').val();
    //variable for calling jQuery to input rating associated with the new bookmark
    let rating = $('select.choose').val();
    //boolean if statement for title
    if (!title || typeof title !== typeof '') {
      //alert message telling user they need to input a title for their bookmark
      alertMessage('You need a title')
    } else if (!link.includes('http') || link.length < 5) {
      //alert message telling user they need to input a valid url for their bookmark
      alertMessage('Please use a valid link with http or https protocol.')
      //else if statement so the user inputs a minimum number of letters/numbers for their bookmark
    } else if (desc.length < 1) {
      //alert message telling user they need to add a description for their bookmark
      alertMessage(`Please add a description!`)
    } else if (!rating) {
      //else if statement which triggers alert message if no rating chosen for their bookmark
      alertMessage('Please Choose a rating!')
    } else {
      //sends the users new bookmark to the api with all related data
      api.newBookmark(title, link, desc, rating)
        .then(newItem => {
          //then & arrow function for pushing all info associated with users new bookmark to api
          store.addStore(newItem)
          console.log(store);
          store.addFalse()
          console.log(store);
          render()
        })
        .catch((error) => { //addStore toggleAdd? if error
          store.setError(error.message)
          console.log(error);
          render()
        })
    }
  })
}

function endMenu() {
//jQuery call with on.click event handler to the cancel button & end the menu
  $('main').on('click', 'button.cancel', function () {
    store.toggleAdd()
    render();
  })
}

//function for opening the view of the bookmark
function openView() {
  $('main').on('click', 'li', function (event) {
    if (store.store.editing === false) {
      const id = getItemIdFromElement(event.currentTarget)
      //toggles open for store to show current bookmark
      store.toggleOpen(id);
      render()
    }
  })
}

//variable to pull 'id' from the most current bookmark
const getItemFromElement = function (item) {
  return $(item)
    .closest('.element')
}

//variable to return from the 'id' of most current bookmark
const getItemIdFromElement = function (item) {
  return $(item)
    .closest('.element')
    .data('item-id');
};

//function for deleting a bookmark from the store module
function removeItem() {
  //jQuery call to connect on.clicks for delete/removing a bookmark
  $('main').on('click', 'button.delete', function (event) {
    //possible variable naming issue check lines 295 & 302
    const id = getItemIdFromElement(event.currentTarget)
    if (store.store.editing === true) {
      store.toggleChange()
    }
    //deletes the bookmark at api
    api.deleteBookmark(id)
      .then(() => {
        //deletes bookmark from the store module
        store.findDelete(id)
        render();
      })
      .catch((error) => {
        //catch block for error message if user is incorrectly attempting to delete a bookmark
        store.createError(error.message)
        render()
      })
  });
}

//function for rating filter 
function createRatingFilter() {
  $('select').on('change', function () {
    //variable for setting this.value
    let rating = this.value
    //toggle rating in store module
    store.toggleRate(rating) //change (rating to rate)?
    render();
  })
}


//extra credit part of the project for editing boomarks & their data
//function for editing those previously stored bookmarks
function openEdit() {
  $('main').on('click', '.edit', function (event) {
    event.preventDefault();
    //toggles change in store module
    store.toggleChange();
    //variable to get 'item' from current bookmark target
    const id = getItemFromElement(event.currentTarget)
    render()
  })
}

// extra credit portion of project
//function for editing bookmarks
//this damn thing broke so many times I damn near gave up on it. Still not 100% sure it works correctly
function editValue() {
  $('main').on('click', 'button.changeVals', function (event) {
    //variable to jQuery for editing title of bookmark
    let title = $('input.changeName').val();
    //variable to jQuery for editing the url/link or bookmark
    let link = $('input.changeUrl').val();
    //variable to jQuery for editing description of bookmark
    let desc = $('#newDesc').val();
    //variable to jQuery for editing rating of bookmark
    let rating = $('input.changeRating').val();
    //variable to get 'id' from current bookmark
    const id = getItemIdFromElement(event.currentTarget)
    //console logged out title as it was giving me issues & now I'm too scared to remove it 
    console.log(title)
    //if & else if statements with boolean for creating rules/boundaries on editing. logic af up in here
    if (title.length < 1) {
      //alert messages through else if statements & booleans to warn user of incorrect editing
      alertMessage('Title required for new bookmarks')
    } else if (!link.includes('http') || link.length < 5) {
      alertMessage('Error! Valid URL required')
    } else if (description.length < 1) {
      alertMessage(`Please add a description for your bookmark`)
    } else if (!rating || rating <= 0 || rating > 5) {
      alertMessage('Please choose a rating between 1 - 5 stars')
    } else {
      //updates bookmarks in api for editing purposes
      api.updateBookmark(id, title, link, description, rating)
        .then(() => {
          //.then function to update the store function after editing bookmark
          store.findAndUpdate(id, {
            title: title,
            url: link,
            desc: description,
            rating: rating
          })
          render();
        })
        .catch((error) => {
          store.setError(error.message)
          render()
        })
      //toggles the change in store module
      store.toggleChange();
      render()
    }
  })
}

//function to connect all event handlers for streamlined export. 1 function to rule them all!
function eventHandlers() {
  newAdd();
  newLink();
  addForm();
  endMenu();
  removeItem();
  createRatingFilter();
  openEdit();
  openView();
  editValue();

}
//exports render and all modules listed in eventHandlers function above
export default {
  render,
  eventHandlers
}
