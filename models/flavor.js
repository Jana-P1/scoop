import  mongoose from "mongoose"
const Schema = mongoose.Schema

const flavorSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Flavor = mongoose.model("Flavor", flavorSchema)

export {
  Flavor
}