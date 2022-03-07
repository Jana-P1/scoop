import { Router } from "express"
const router = Router()
import * as shopsCtrl from "../controllers/shops.js"
import { isLoggedIn } from "../middleware/middleware.js"

// GET 
// localhost:3000/shops
router.get("/", isLoggedIn, shopsCtrl.index)
// localhost:3000/shops/new
router.get("/new", isLoggedIn, shopsCtrl.new )

// POST
// localhost:3000/shops
router.post("/", isLoggedIn, shopsCtrl.create)

export {
  router
}