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
}

function create(req, res) {
  if(req.body.location) {
    console.log("Location:", location) 
  }
  const shop = new Shop(req.body)
  shop.save((error) => {
    if (error) return res.render("shops/new")
    res.redirect(`/shops/${shop._id}`)
  })
}

// function addFlavorToShop (req, res) {
//   Shop.findById
// }

export {
  index,
  newShop as new,
  create,
}