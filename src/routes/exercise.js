const { Router } = require("express");
const router = Router();
const exerciseModel = require("../models/exercise.model");
const userModel = require("../models/user.model");

/***
 * Conversion date to string
 * @param   {Date} date
 * @return  {String}
 */
const dateToString = (date) => {
  if (!date) {
    return new Date().toDateString();
  }
  return new Date(date).toDateString();
};

// POST add new exercise
router.post("/:_id/exercises", async (req, res) => {
  // Format the date param
  req.body.date = req.body.date
    ? dateToString(req.body.date)
    : dateToString(""); //return current date

  try {
    const [dataExercise, dataUser] = await Promise.all([
      new exerciseModel({ ...req.body, user: req.params._id }).save(),
      userModel.findOne({ ...req.params }, "username"),
    ]);

    // Destructuring data
    const { description, duration, date } = dataExercise;
    const { username } = dataUser;

    res.status(201).json({
      username,
      description,
      duration,
      date,
      ...req.params,
    });
  } catch (err) {
    console.error(`Error to save the exercise model: `, err);
    res.status(500).send("Error to save the exercise.");
  }
});

module.exports = router;
