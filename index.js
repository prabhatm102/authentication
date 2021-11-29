const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000

// Template Engine

app.set("view-engine","pug");
app.set("views",__dirname+"/views");

require("./start/routes")(app);
require("./start/db")();


app.listen(PORT,()=>console.log(`Server is listeninig at ${PORT}`));