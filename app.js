const express = require("express")
const bodyParser = require("body-parser")
const app = express()

let items = []
let workItems = []

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))


app.get("/", (req, res) => {
  const today = new Date()

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }

  const day = today.toLocaleDateString("en-US", options)

  res.render("list", {listTitle: day, newListItems: items})

})

app.post("/", (req, res) => {
  let item = req.body.newItem
  console.log(req.body.list)

  if (req.body.list === "Work") {
    workItems.push(item)
    res.redirect("/work")
  } else {
    items.push(item)
    res.redirect("/")
  }

})

app.get("/work", (req, res) => {
  res.render("list", {listTitle: "Work List", newListItems: workItems})
})


app.listen(3000, () => {
  console.log("server running.")
})
