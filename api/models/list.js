const mongoose = require("mongoose");

// const cardSchema = mongoose.Schema({
//   cardId: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Card",
//   }]
  
// });

const listSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please include the list name"],
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
  ],
});

module.exports = mongoose.model("List", listSchema);
