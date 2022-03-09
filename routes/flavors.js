import { Router } from "express"
import * as flavorsCtrl from "../controllers/flavors.js"
const router = Router()

// GET - localhost:3000/flavors/new
router.get("/new", flavorsCtrl.new)

// POST - localhost:3000/flavors
router.post("/", flavorsCtrl.create)

export {
  router
}