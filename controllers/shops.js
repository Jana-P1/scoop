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
  req.body.owner = req.user.profile._id
  const shop = new Shop(req.body)
  shop.save((error) => {
    if (error) return res.render("shops/new")
    res.redirect(`/shops/${shop._id}`)
  })
}

function show(req, res) {
  Shop.findById(req.params.id)
  .populate("flavors")
  .populate("owner")
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
function deleteShop(req, res) {
  req.body.owner = req.user.profile._id
  Shop.findByIdAndDelete(req.params.id)
  .then(shop => {
    res.redirect("/shops")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/shops")
  })
}
function edit(req, res) {
  Shop.findById(req.params.id)
  .populate("flavors")
  .then(shop => {
    res.render("shops/edit", {
      shop,
      title: "Edit shop",
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/shops/${shop._id")
  })
}
function update(req, res) {
  Shop.findByIdAndUpdate(req.params.id, req.body)
  .then(shop => {
    if(shop.owner.equals(req.user.profile._id)) {
      res.redirect(`/shops/${shop._id}`)
    } else {
      throw new Error ("🚫 Only the owner of this profile can edit")
    }
  })
  .catch(error => {
    console.log(error)
    res.redirect("/shops")
  })
}
function deleteFlavor(req, res) {
  Shop.findById(req.params.id, req.body.flavors)
  .then(shop => {
    shop.flavors.remove({_id: req.params.flavorId})
    shop.save(function(error) {
      res.redirect(`/shops/${shop._id}`)
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect(`/shops`)
  })
}


export {
  index,
  newShop as new,
  create,
  show,
  addFlavorToShops,
  deleteShop as delete,
  edit,
  deleteFlavor,
  update
}