const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleRedirection,
  handleAnalytics,
} = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewShortUrl);
router.get("/:id", handleRedirection);
router.get("/analytics/:id", handleAnalytics);
module.exports = router;
