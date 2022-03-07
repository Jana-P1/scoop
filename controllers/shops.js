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
  // create functionality to read location property as: String, String
  Shop.create(req.body)
  .populate("")
  .then(shop => {
    res.redirect(`/shops/${shop._id}`)
  })
  .catch(error => {
    console.log(error)
    res.redirect("/shops/new")
  })
}

function addFlavorToShop (req, res) {
  Shop.findById
}

export {
  index,
  newShop as new,
  create,
}