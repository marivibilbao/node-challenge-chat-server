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
app.get("/messages/:id", (request, response) => {
  const messageId = parseInt(request.params.id);
  const message = messages.find((message) => message.id === messageId);
  if (message) {
    response.send(message);
  } else {
    response.status(400).json({error: "El mensaje con la ID " + messageId + " no se encuentra."});
  }
});

//POST
app.post("/messages", function (request, response){
  const from = request.body.from;
  const text = request.body.text;
  const newMessage = {
    id: messages.length,
    from: from,
    text: text
  };
  messages.push(newMessage);
  response.json({success: true});
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
