import { Shop } from "../models/shop.js"
import { Flavor } from "../models/flavor.js"

function index(req, res) {
  Shop.find({})
  .then(shops => {
    res.render("shops/index", {
      shops,
      title: "Scoop"

    })
  })
  .catch(error => {
    console.log(error)
    res.redirect("/shops")
  })
}
function newShop(req, res) {
  res.render("shops/new", {
    title: "Add a New Ice Cream Shop",
  })
  .catch(error => {
    console.log(error)
    res.redirect("/shops")
  })
}
function create(req, res) {
  Shop.create(req.body)
  .then(shop => {
    res.redirect("/shops")
  })
  .catch(error => {
    console.log(error)
    res.redirect("/shops")
  })
}

export {
  index,
  newShop as new,
  create,
}