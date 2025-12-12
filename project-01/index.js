const express = require("express");

const app = express();
const PORT = 8000;

//Routes

app.listen(PORT, () => console.log("Server listening " + PORT));
