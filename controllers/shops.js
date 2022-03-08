import { Shop } from "../models/shop.js"
import { Flavor } from "../models/flavor.js"

function index(req, res) {
  let modelQuery = req.query.name ?
  { name: new RegExp(req.query.name, "i") } : {}
  Shop.find(modelQuery)
  .sort("name")
  .exec(function (error, shops) {
    if (error) return next(error)
    res.render("shops/index", {
      shops,
      title: "Scoop"
    })
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
  .populate("flavors")
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