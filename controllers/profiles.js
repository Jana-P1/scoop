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
  .exec(function(err, profile) {
    Flavor.find({_id: {$nin: profile.favorites}},
      function(error, favorites) {
        res.render("profiles/show", {
          title: `${profile.name}'s Profile`,
          profile,
          favorites
        })
      })
  })
  }
function addFavoriteFlavors(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    profile.favorites.push(req.body.flavorId)
    profile.save(function(error) {
      res.redirect(`/profiles/${profile._id}`)
    })
  })
}

export {
  index,
  show,
  addFavoriteFlavors,
}

