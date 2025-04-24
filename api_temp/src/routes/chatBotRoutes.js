const express = require("express");
const router = express.Router();
const { sendChatMessage } = require("../controllers/chatBotController.js");

router.post("/chatbot", sendChatMessage);

module.exports = router;
