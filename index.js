const express = require("express");
const bodyParser = require("body-parser");
const contactsRouter = require("./src/routes/contactAPI");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
// contacts router
app.use(contactsRouter);

// Start the server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
