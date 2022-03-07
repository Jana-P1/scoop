import { Shop } from "../models/shop.js"

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

export {
  index,
}