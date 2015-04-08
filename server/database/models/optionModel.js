var mongoose = require('mongoose');

var OptionsSchema = new mongoose.Schema({
  start_time: { type: Date, default: Date.now },
  end_time: { type: Date },
  student: { type: String },
  available: { type: Boolean, default: false }
});

// compile schema into a model, which is a class from which we construct documents.
// export the model to make available to others.
module.exports = mongoose.model('Options', OptionsSchema);
