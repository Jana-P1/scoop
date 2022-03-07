import { Shop } from "../models/shop.js"

function index(req, res) {
  Shop.find({})
  .then(tacos => {
    res.render("shops/index", {
      shops: "Ice Cream Shops",
      title: "Scoop"

    })
  })
}

export {
  index,
}