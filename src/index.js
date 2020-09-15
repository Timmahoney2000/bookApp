//entry point for app
//imports all exported modules & api info
import 'normalize.css';
import './index.css';
import api from './api'
import store from './store'
import query from './query'
import $ from 'jquery'

//main function for bulk of the app
function main(){
//GET method for api call
  api.getBookmark()
    .then(items => {
       items.forEach(function (item){
       store.addStore(item)
    })
    //renders bulk of the app
    query.render()
})
query.eventHandlers()
}
//jQuery call to main app
$(main)