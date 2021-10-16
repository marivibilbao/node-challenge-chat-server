const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Steve Jobs",
  text: "El único modo de hacer un gran trabajo es amar lo que haces.",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//GET Messages
app.get("/messages", (request, response) => {
  response.send(messages);
});

//GET by ID
app.get("/messages/id/:id", (request, response) => {
  const messageId = parseInt(request.params.id);
  const message = messages.find((message) => message.id === messageId);
  if (message) {
    response.send(message);
  } else {
    response.status(400).json({error: "El mensaje con la ID " + messageId + " no se encuentra."});
  }
});

//GET Search
app.get("/messages/search/:text", (request, response) => {
  const searchText = request.params.text.toLowerCase();
  const result = messages.filter((message) => {
    return message.text.toLocaleLowerCase().includes(searchText);
  })
  response.send(result);
});

//GET Latest
app.get("/messages/latest", (request, response) => {
  const messagesToShow = 10;
  const result = messages.slice(-messagesToShow);
  response.send(result);
});

//POST
app.post("/messages", function (request, response){
  const from = request.body.from;
  const text = request.body.text;

  if (!from && !text) {
    return response.status(400).json({error: "Las propiedades de autor y texto están vacías"});
  } else if (!from){
    return response.status(400).json({error: "Autor está vacío"});
  } else if (!text){
    return response.status(400).json({error: "Texto está vacío"})
  }

  const newMessage = {
    id: messages.length,
    from: from,
    text: text
  };
  messages.push(newMessage);
  response.json({success: true});
});

//DELETE
app.delete("/messages/:id", function(request, response){
  const id = parseInt(request.params.id);
  const index = messages.findIndex(message => message.id === id);
  messages.splice(index, 1);
  response.send({success: true});
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});

