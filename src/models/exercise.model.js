const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  description: {type: String, required: true, maxLength: 100},
  duration: {type: Number, required: true, minLength: 1, maxLength: 4},
  date: String,
});

module.exports = model("Exercise", exerciseSchema);
