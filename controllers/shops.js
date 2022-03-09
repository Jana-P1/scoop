import { Shop } from "../models/shop.js"
import { Flavor } from "../models/flavor.js"
import methodOverride from "method-override"

function index(req, res) {
  let modelQuery = req.query.name 
    ? { name: new RegExp(req.query.name, "i") } 
    : {}
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
  const shop = new Shop(req.body)
  shop.save((error) => {
    if (error) return res.render("shops/new")
    res.redirect(`/shops/${shop._id}`)
  })
}

function show(req, res) {
  Shop.findById(req.params.id)
  .populate("flavors")
  .exec(function(error, shop) {
    Flavor.find({_id: {$nin: shop.flavors}}, function(error, flavors) {
      res.render("shops/show", {
        title: "What's the scoop?",
        shop,
        flavors,
      })
    })
  })
  }
  function addFlavorToShops(req, res) {
    console.log("flavor: ", req.body.flavor)
    Shop.findById(req.params.id, function (error, shop) {
      shop.flavors.push(req.body.flavorId)
      shop.save(function(error) {
        res.redirect(`/shops/${shop._id}`)
      })
    })
  }

export {
  index,
  newShop as new,
  create,
  show,
  addFlavorToShops,
}