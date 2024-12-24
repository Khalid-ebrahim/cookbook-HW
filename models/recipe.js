const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  ingredients: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  }

});

const recipe = mongoose.model("recipe", recipeSchema);
module.exports = recipe;