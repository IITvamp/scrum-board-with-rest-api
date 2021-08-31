const Card = require("../models/card");

exports.getCards = async (req, res) => {
  try {
    let cards = await Card.find();
    res.status(200).json({
      status: true,
      data: cards,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      status: false,
    });
  }
};

exports.createCard = async (req, res) => {
  try {
    // let cardItem = {
    //   name: req.body.name,
    //   description: req.body.description,
    //   //   image: req.file.path,
    // };
    let card = await Card.create(req.body);
    res.status(200).json({
      status: true,
      data: card,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      status: false,
    });
  }
};

exports.getCardById = async (req, res) => {
  try {
    let id = req.params.id;
    let cardDetails = await Card.findById(id);
    res.status(200).json({
      status: true,
      data: cardDetails,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};

exports.patchCard = async (req, res, next) => {
  try {
    let id = req.params.id;
    let card = Card.findById(id);
    let updatedCardItem = {
      name: req.body.name,
      description: req.body.description,
      //   image: req.file.path,
    };

    card = updatedCardItem;

    let cardDetails = await Card.updateOne(card);
    res.status(200).json({
      status: true,
      data: cardDetails,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    let id = req.params.id;
    let cardDetails = await Card.findByIdAndRemove(id);
    res.status(200).json({
      status: true,
      data: cardDetails,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};
