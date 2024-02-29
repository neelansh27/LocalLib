const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.send("Wiki Home Page");
});

router.get("/about(us)?", function (req, res) { // can also use js regex
  res.send("Wiki About Page");
});

module.exports = router;

