var mongoose = require('mongoose');

var ClassesSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  rate: { type: String, default: 0 },
  start_time: { type: Date },
  end_time: { type: Date },
  student: { type: String },
  available: { type: Boolean, default: false }
});

// compile schema into a model, which is a class from which we construct documents.
// export the model to make available to others.
module.exports = mongoose.model('Class', ClassesSchema);
