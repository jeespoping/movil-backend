const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const MovilSchema = mongoose.Schema({
  title: String,
  miniature: String,
  description: String,
  url: {
    type: String,
    unique: true,
  },
  price: Number,
  score: Number,
  created_at: Date,
});

MovilSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Movil", MovilSchema);
