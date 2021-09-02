const express = require("express");

const router = express.Router();

const listController = require("../controllers/list");

router.get("/", listController.getLists);

router.post("/", listController.createList);

router.patch("/:id", listController.patchList);

router.delete("/:id", listController.deleteList);

router.get("/:id", listController.getListById);

router.get("/:id/cards", listController.getAllCards);

router.post("/:id/add-card", listController.addCardToList);

router.delete("/:id/delete-card", listController.removeCardFromList);

module.exports = router;

