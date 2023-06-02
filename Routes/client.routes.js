const express = require('express');
const { ClientOnActivePage, ClientPage } = require("../controllers/client.controllers");
const router = express.Router();
router.get("/", ClientPage);
router.get("/ClientOnActivePage", ClientOnActivePage);
module.exports = router