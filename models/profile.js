import mongoose from 'mongoose'
const Schema = mongoose.Schema


const profileSchema = new Schema({
  name: String,
  avatar: String,
  favorites: [{
    type: Schema.Types.ObjectId, ref: "Flavor"
  }]   
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
