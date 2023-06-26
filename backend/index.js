const connetToMongo =require("./db");
const express = require('express');

var cors = require('cors')
connetToMongo();

const app = express()
app.use(cors())

const port = 5000
app.get("/",(req,res)=>{
  res.send("Hello");
})

// to use req.body
app.use(express.json());

  // Available Routes
app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
