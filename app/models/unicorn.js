var mongoose = require('mongoose'); //=> connecting mongoose module to variable to create the database
mongoose.connect('mongodb://localhost/test'); //=> connects to the database
var Schema = mongoose.Schema;

var UnicornSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Unicorn', UnicornSchema);
