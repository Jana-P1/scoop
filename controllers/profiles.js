import { Profile } from "../models/profile.js"
import { Shop } from "../models/shop.js"

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render("profiles/index", {
      profiles,
      title: "Ice Cream Lovers"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}
function show(req, res) {
  console.log("a profile")
  Profile.findById(req.params.id)
  console.log(req.params.id)
  .populate("favorites")
  .exec(function(error, profile) {
    Favorite.find({_id: {$nin: profile.favorites}},
      function(error, favorites) {
        res.render("profiles/show", {
          profile,
          favorites
        })
      })
    })
  }

export {
  index,
  show,
}