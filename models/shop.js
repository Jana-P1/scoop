import mongoose from "mongoose"
const Schema = mongoose.Schema
const shopSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: String,
  location: {
    type: String,
    required: true,
  },
  flavors: [{
    type: Schema.Types.ObjectId, ref: "Flavor"}],
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}  
}, {
  timestamps: true
}
)

const Shop = mongoose.model("Shop", shopSchema)

export {
  Shop
}