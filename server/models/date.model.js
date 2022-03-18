const { Schema, model } = require("mongoose");

const dateShema = new Schema({
  date: Date,
  name: String,
  surname: String,
  email: String,
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  picture: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png",
  },
});

const dateModel = model("Date", dateShema);

module.exports = dateModel;
