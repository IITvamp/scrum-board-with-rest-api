const express = require("express");

const router = express.Router();

const cardController = require("../controllers/card");

router.get("/", cardController.getCards);

router.post("/", cardController.createCard);

router.get("/:id", cardController.getCardById);

router.patch("/:id", cardController.patchCard);

router.delete("/:id", cardController.deleteCard);

module.exports=router;
