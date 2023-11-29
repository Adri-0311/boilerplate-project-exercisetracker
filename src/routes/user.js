const { Router } = require("express");
const router = Router();
const userModel = require("../models/user.model");

// POST add new user
router.post("/", async (req, res) => {
  const { username } = req.body;

  try {
    if (!username || username.length === 0) {
      return res.status(500).send("username not recived...");
    }

    const data = await new userModel({ username: username }).save();
    res.status(201).json({ username: data.username, _id: data._id });
  } catch (err) {
    console.error(`Error ocurred during save user name ${username}: `, err);
    res.status(500).send("Error during save user...");
  }
});

// GET all users
router.get("/", async (req, res) => {
  try {
    const data = await userModel.find({}, 'username _id');
    res.status(201).json(data);
  } catch (err) {
    console.error(`Error ocurred during finding all users: `, err);
    res.status(500).send("Error during finding all users...");
  }
});

module.exports = router;
