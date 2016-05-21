var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UnicornSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Unicorn', UnicornSchema);
