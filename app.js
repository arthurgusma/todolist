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

const item1 = new Item({
  name: 'Breakfast'
});
const item2 = new Item({
  name: 'lunch'
});


const defaultItems = [item1, item2]


Item.insertMany(defaultItems, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Sucessfuly added.');
  }
});

app.get("/", (req, res) => {
  const day = date.getDate();
  res.render("list", {
    listTitle: day,
    newListItems: defaultItems
  });
});

app.post("/", (req, res) => {
  const item = req.body.newItem;
  console.log(req.body.list);

  if (req.body.list === "Work") {
    workItems.push()
    res.redirect("/work")
  } else {
    items.push(item)
    res.redirect("/")
  };
});

app.get("/work", (req, res) => {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.listen(3000, () => {
  console.log("server running.");
});
