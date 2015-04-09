var mongoose = require('mongoose');

var ClassesSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  rate: { type: String, default: 0 },
  start_time: { type: Date },
  end_time: { type: Date },
  teacher_username: { type: String },
  teacher_name: { type: String },
  student_username: { type: String },
  student_name: { type: String },
  location: { type: String },
  is_booked: { type: Boolean }
});

// compile schema into a model, which is a class from which we construct documents.
// export the model to make available to others.
module.exports = mongoose.model('Class', ClassesSchema);
