import { Profile } from "../models/profile.js"
import { Flavor } from "../models/flavor.js"

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
  Profile.findById(req.params.id)
  .populate("favorites")
  .exec(function(error, profile) {
    Flavor.find({_id: {$nin: profile.favorites}},
      function(error, favorites) {
        res.render("profiles/show", {
          title: "Scoop",
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