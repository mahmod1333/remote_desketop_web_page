const express = require('express');
const { ServerPage, ServerOnActivePage } = require("../controllers/server.controllers");
const router = express.Router();
router.get("/", ServerPage);

router.get("/ServerOnActivePage", ServerOnActivePage);
module.exports = router