const express = require("express");
const app = express();
const winston = require("winston");
const PORT = process.env.PORT || 3000

// Template Engine

app.set("view-engine","pug");
app.set("views",__dirname+"/views");

require("./start/logging")();
require("./start/config")();
require("./start/db")();
require("./start/routes")(app);

app.listen(PORT,()=>winston.info(`Server is listeninig at ${PORT}`));