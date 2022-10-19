//Server
let express = require('express');
let server = express();

server.use('/', express.static('public')); //set home folder to find client side files
server.use(express.json()); //let express know we are using JSON data

//database
let DataStore = require('nedb');
let db = new DataStore('messages.db');
db.loadDatabase();

//Routes
server.get('/messages', (request, response) => {

  //get data from DB
  db.find({}, (err, docs) => {
    if (err) {
      response.json({ task: "task failed" });
    } else {
      //create data obj from array
      let messageData = {
        data: docs
      }
      //pass data as JSON
      response.json(messageData);
    }
  })
});

//post request from web page input field
server.post('/new-message', (request, response) => {

  //retrieve data obj
  let messageFromClient = request.body;
  //add time var to it
  messageFromClient.time = Date();

  let messageObj = {
    message: messageFromClient
  }

  //save it to the database
  db.insert(messageFromClient, (err, newDocs) => {
    if (err) {
      response.json({ task: "task failed" });
    } else {
      response.json(messageObj);
    }
  });
});

let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on localhost:${port}`)
})