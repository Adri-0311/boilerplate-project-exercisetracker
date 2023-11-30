const { Router } = require("express");
const router = Router();
const userModel = require("../models/user.model");
const exerciseModel = require("../models/exercise.model");

const dateFormat = (date) => {
  const regexDate = new RegExp("/\\d{4}-\\d{2}-\\d{2}/", "g");
  return regexDate.test(date);
};

router.get("/:_id/logs/", async (req, res) => {
  try {
    const { _id } = req.params;
    const { from, to, limit } = req.query;
    const queryFilters = { user: _id };
    const queryLimit = { limit: 0 };

    // Verify "from" query
    if (from !== "" && dateFormat(from)) {
      queryFilters.date = { $gte: from };
    }
    // Verify "to" query
    if (to !== "" && dateFormat(to)) {
      Object.assign(queryFilters.date, { $lte: to });
    }
    // Verify "limit" query
    if (limit !== "" && parseInt(limit)) {
      queryLimit.limit = parseInt(limit);
    }

    const [dataUser, dataExercises] = await Promise.all([
      userModel.findOne({ _id: _id }, "username"),
      exerciseModel.find(
        queryFilters,
        "-_id description duration date",
        queryLimit
      ),
    ]);

    const { username } = dataUser;

    res.status(200).json({
      _id: _id,
      username,
      count: dataExercises.length,
      log: dataExercises,
    });
  } catch (err) {
    console.error("Error to find the exercises logs: ", err);
    res.status(500).send("Error to find the exercises logs");
  }
});

module.exports = router;
