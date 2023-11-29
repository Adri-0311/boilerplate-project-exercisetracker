const { Router } = require("express");
const router = Router();
const userModel = require("../models/user.model");
const exerciseModel = require("../models/exercise.model");
const dateToString = require("../utils/date-to-string");

router.get("/:_id/logs", async (req, res) => {
  const { _id } = req.params;

  try {
    const [dataUser, dataExercises] = await Promise.all([
      userModel.findOne({ _id: _id }, "username"),
      exerciseModel.find({ user: _id }, "-_id description duration date"),
    ]);

    const { username } = dataUser;

    const newDataExercises = dataExercises.map((exercise) => {
      if (exercise.date) {
        const newDate = dateToString(exercise.date);
        const {description, duration} = exercise;
        return {description, duration, date: newDate};
      }
      return exercise;
    });

    res.status(200).json({
      _id: _id,
      username,
      count: dataExercises.length,
      log: newDataExercises,
    });
  } catch (err) {
    console.error("Error to find the exercises logs: ", err);
    res.status(500).send("Error to find the exercises logs");
  }
});

module.exports = router;
