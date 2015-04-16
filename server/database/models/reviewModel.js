var mongoose = require('mongoose');
var User = require('./userModel.js');

var ReviewSchema = new mongoose.Schema({
  rating: { type: Number },
  review: { type: String },
  date: { type: Date },
  student_name: { type: String },
  teacher_username: { type: String },
  class_id: { type: String }
});

// compile schema into a model, which is a class from which we construct documents.
// export the model to make available to others.
module.exports = mongoose.model('Review', ReviewSchema);
