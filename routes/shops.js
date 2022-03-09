import { Router } from "express"
const router = Router()
import * as shopsCtrl from "../controllers/shops.js"
import { isLoggedIn } from "../middleware/middleware.js"

// GET 
// localhost:3000/shops
router.get("/", isLoggedIn, shopsCtrl.index)
// localhost:3000/shops/new
router.get("/new", isLoggedIn, shopsCtrl.new )
// localhost:3000/books/:id
router.get("/:id", isLoggedIn, shopsCtrl.show)
// localhost:3000/books/:id/edit
router.get("/:id/edit", isLoggedIn, shopsCtrl.edit)

// POST
// localhost:3000/shops
router.post("/", isLoggedIn, shopsCtrl.create)
// localhost:3000/:id/flavors
router.post("/:id/flavors", isLoggedIn, shopsCtrl.addFlavorToShops)
// DELETE - localhost:3000/shops
router.delete("/:id", shopsCtrl.delete)
router.delete("/:id/flavors/:flavorId", shopsCtrl.deleteFlavor)

export {
  router
}