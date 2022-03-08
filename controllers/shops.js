import { Shop } from "../models/shop.js"
import { Flavor } from "../models/flavor.js"

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
  .then(shop => {
    console.log(shop)
    res.render("shops/show", {
      title: "Scoop",
      shop,
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect("/shops/new")
  })
  }

export {
  index,
  newShop as new,
  create,
  show,
}