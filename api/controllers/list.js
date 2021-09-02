const List = require("../models/list");
const Card = require("../models/card");

exports.getLists = async (req, res) => {
  try {
    let lists = await List.find();
    for (const list in lists) {
      let id = lists[list]._id;
      let listItem = await List.findById(id).populate("cards");
      lists[list].cards = listItem.cards;
    }
    res.status(200).json({
      data: lists,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      status: false,
    });
  }
};

exports.createList = async (req, res) => {
  try {
    let listItem = {
      name: req.body.name,
    };
    let list = await List.create({
      ...listItem,
    });
    res.status(200).json({
      status: true,
      data: list,
    });
  } catch (err) {
    console.log(err);
    res.status(700).json({
      error: err,
      status: false,
    });
  }
};

exports.getListById = async (req, res) => {
  try {
    let id = req.params.id;
    let listDetails = await List.findById(id);
    res.status(200).json({
      status: true,
      data: listDetails,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};

exports.deleteList = async (req, res) => {
  try {
    let id = req.params.id;
    let listDetails = await List.findByIdAndRemove(id);
    res.status(200).json({
      status: true,
      data: listDetails,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};

exports.patchList = async (req, res, next) => {
  try {
    let id = req.params.id;
    let list = await List.findById(id);
    list.name = req.body.name;

    let listDetails = await list.save();
    res.status(200).json({
      status: true,
      data: list,
      msg: id,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};

exports.getAllCards = async (req, res, next) => {
  try {
    let id = req.params.id;
    let list = await List.findById(id).populate("cards");
    res.status(200).json({
      status: true,
      cards: list,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};

exports.addCardToList = async (req, res, next) => {
  try {
    let id = req.params.id;

    let card = await Card.create(req.body);

    let listDetails = await List.findOneAndUpdate(
      { _id: id },
      { $push: { cards: card._id } },
      { new: true }
    );

    let cardDetails = await Card.findOneAndUpdate(
      { _id: card._id },
      { $push: { parentListId: id } },
      { new: true }
    );
    res.status(200).json({
      status: true,
      data: listDetails,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};

exports.removeCardFromList = async (req, res, next) => {
  try {
    let cardId = req.params.id;
    let card = await Card.findById(cardId);

    let parentId = card.parentListId[0];
    let list = await List.findById(parentId);

    let cardArr = await list.cards;
    let index = cardArr.indexOf(cardId);
    if (index < 0) {
      throw "list does not have any card";
    }

    let listDetails = await List.findOneAndUpdate(
      { _id: parentId },
      { $pull: { cards: cardId } },
      { new: true }
    );

    let cardtoremove = await Card.findByIdAndRemove(cardId);
    res.status(200).json({
      status: true,
      data: listDetails,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};
