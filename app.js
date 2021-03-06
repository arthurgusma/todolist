const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect('mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@cluster0.kz0h8.mongodb.net/todolistDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const itemSchema = {name: String};
const Item = mongoose.model('Item', itemSchema);
const items = [];

const day = date.getDate();

app.get('/', (req, res) => {
  Item.find({}, (err, found) => {
    res.render('list', {
      listTitle: day, newListItems: found
    });
  });

});

app.post('/', (req, res) => {
  const value = req.body.newItem;
  const nameItem = new Item({name: value});
  nameItem.save();
  res.redirect('/');
});

app.post('/delete', (req, res) => {
  const deletedItem = req.body.listItem;
  Item.deleteOne({_id: deletedItem}, (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.redirect('/');
});


app.listen(process.env.PORT || 3000, () => {
  console.log("server running.");
});
