import { Flavor } from "../models/flavor.js"

function newFlavor(req, res) {
  Flavor.find({})
  .then(flavors => {
    res.render("flavors/new", {
      title: "Add Flavor",
      flavors,
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect("/flavors/new")
  })
}

function create(req, res) {
  Flavor.create(req.body)
  .then(flavor => {
    res.redirect("/shops")
  })
}

export {
  newFlavor as new,
  create
}