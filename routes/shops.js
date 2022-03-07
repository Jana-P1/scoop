import { Router } from "express"
const router = Router()
import * as shopsCtrl from "../controllers/shops.js"
import { isLoggedIn } from "../middleware/middleware.js"

router.get("/", isLoggedIn, shopsCtrl.index)

export {
  router
}