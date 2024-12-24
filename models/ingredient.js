const mongoose = require("mongoose")

const ingredientSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  }
})

const ingredient = mongoose.model("ingredient", ingredientSchema);
module.exports = ingredient;