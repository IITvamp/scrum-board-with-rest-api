const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please include the product name"],
  },
  description: {
    type: String,
  },
  parentListId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "List",
  }],
});

const Card = mongoose.model("Card", cardSchema);
module.exports = Card;
