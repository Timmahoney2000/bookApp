# Bookmarks-App

https://timmahoney2000.github.io/BookApp/

# User Stories

 I can add bookmarks to my bookmark list
The bookmarks contain 'title', 'url link', 'description', & a 'rating 1-5'

 I can see a list of my bookmarks when I first open the app
All bookmarks in the list default to a 'condensed' view showing only title & rating

 I can click on a bookmark to display the 'detailed' view
Detailed view expands to additionally display description and a 'visit site' link

 I can remove bookmarks from my bookmark list

 I receive appropriate feedback when I cannot submit a bookmark
Check all validations in the API documentation(e.g. title & url field required)

 I can select from a dropdown(a <select> element) a 'minimum rating to filter the list by all bookmarks rated at or above the chosen selection

 (Extension feature - optional) I can edit the rating and description of a bookmark in my list

 Technical Requirements

Uses fetch AJAX calls and jQuery for DOM manipulation
Use namespacing to adhere to good architecture practices
 -Minimal glabal variables
 -Create modules in seperate files to organize your code
 -Logically grouped functions(e.g. API methods, store methods...)
 Keep your data our of the DOM
 -No direct DOM manipulation in your event handlers!
 -Follow the React-ful design pattern 0 change your state, re-render your component
 Uses semantic HTML
 Uses a responsive and mobile first design
 -Visually and functionally solid in viewpoints for mobile & desktop
 Follow a11y best practices
 -Refer back to the accessibility checklist and the lesson on forms