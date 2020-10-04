const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/todolistDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const itemSchema = {
  name: String
};

const Item = mongoose.model('Item', itemSchema);
const items = [];

const day = date.getDate();

app.get('/', (req, res) => {
  Item.find({}, (err, found) => {
    res.render('list', {
      listTitle: day,
      newListItems: found
    });
  });

});

app.post("/", (req, res) => {
  const value = req.body.newItem;
  const nameItem = new Item({
    name: value
  });
  nameItem.save();
  res.redirect("/");
});


app.listen(3000, () => {
  console.log("server running.");
});
