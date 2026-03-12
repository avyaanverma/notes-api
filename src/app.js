// app.js
const express = require("express");
const router = require("./routes/notesRoutes")
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    status: "Notes API Running....."
  });
});

app.get("/task", (req,res)=>{
  res.json({status: "Task app currently offline"})
})

app.use("/notes", router);

module.exports = app;


