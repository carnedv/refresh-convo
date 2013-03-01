# RefreshBR Convo Tracker

This is a small test app built to showcase Angular.js and Socket.io. It was demoed at [RefreshBR](http://refreshbr.com)'s Show and Tell meeting on February 28th, 2013.

To run the app you need the following installed:

* [node.js](http://nodejs.org/)
* [CouchDb](http://couchdb.apache.org/)

One-time configuration tasks to run the app:

* Create a CouchDb database named *refresh-convo*
* Add the following design document to the above database (this is the query to pull all topics):
	* `{
   "_id": "_design/topics",
   "language": "javascript",
   "views": {
       "all": {
           "map": "function(doc) {\nif (doc.type == 'topic') {\n  emit(doc._id, doc);\n}\n}"
       }
   }
}`

To start the app 

* cd into the app/ folder and run ***node server***
* visit ***http://localhost:8080/*** in your browser

To Do

* Make a wish list of additional functionality