import { Router } from "express"
const router = Router()
import * as shopsCtrl from "../controllers/shops.js"

router.get("/", shopsCtrl.index)

export {
  router
}