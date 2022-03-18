const express = require("express");
const router = express.Router();
const dateModel = require("../models/date.model");
const uploader = require("../config/cloudinary");

//All route prefix by date
//get all date
router.get("/", async (req, res, next) => {
  try {
    const dateList = await dateModel.find();
    res.status(200).json(dateList);
  } catch (error) {
    res.status(500).json({ message: "Internal error" });
    next(error);
  }
});

router.post("/", uploader.single("picture"), async (req, res, next) => {
  const newDate = { ...req.body };
  if (!req.file) newDate.picture = undefined;
  else newDate.picture = req.file.path;

  try {
    await dateModel.create(newDate);
    res.status(201).json(newDate);
  } catch (error) {
    res.status(500).json({ messasge: "Internal server error" });
    next(error);
  }
});

module.exports = router;
