//SERVER SETUP

//sets the packages that are needed from our package.json file
var express       = require('express'); //=> calls express, the node framework
var app           = express();          //=> define app and connecting it to express
var bodyParser    = require('body-parser');  //=>help POST content from my HTTP request calls

//connect to database
var mongoose = require('mongoose'); //=> connecting mongoose module to variable to create the database
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); //=> connects to the database
//unicornapi-63614.onmodulus.net

//establish the Unicorn model in server
var Unicorn = require('./app/models/unicorn');

//configuration to use bodyParser()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; //=> establish the port at localhost:8080

//ROUTES
var router = express.Router(); //=> pulls the express router method for creating ROUTES

//MIDDLEWARE for all requests...helps keep track of
router.use(function(req, res, next) {
  //prints to server log
  console.log("Actions passing through");
  next(); //=> proceeds to the next route
});

//test to make sure everything is pointing to localhost:8080
router.get('/', function(req,res){
  res.json({message: 'The API connection is stable...'})
});

//List of routes

//establish out routes to be "api"
app.use('/api', router);

//=> ROUTES ending '/unicorns'
router.route('/unicorns')

  //create a unicorn
  .post(function(req, res){
    var unicorn = new Unicorn(); //=>creates an instance of the Unicorn model
    unicorn.name = req.body.name; //=>sets the name of the unicorn in a requests

    //save the new instance of a unicorn and validates for no errors
    unicorn.save(function (err) {
      if(err)
        res.send(err); //=> Notifies the error if unicorn was not added saved all through the log

        res.json({message: "Your new unicorn has been created!"}); //=> Notifies the success if the unicorn was saved.

    });
  }); //=> ERRORR Postman is throwing an error saying that it cannot get unicorns.......

  //get all unicorns
  .get(function(req, res){
    Unicorn.find(function(err, unicorns){ //=> takes two parameters
      if (err)
        res.send(err);

      res.json(unicorns);

    });
  });

//=> ROUTES ending '/unicorns/:unicorn_id'
router.route('/unicorns/:unicorn_id')

  //=> get a specific unicorn with the id as the parameter being passed
  .get(function(req,res){
    Unicorn.findById(req.params.unicorn_id, function(err, unicorn){ //=> pass the id of unicron as the params along with a CB function on Error/Success
      if (err)
        res.send(err);
        res.json(unicorn);
    });
  });

  //=> to update a specific unicorn
  .put(function(req,res){
    Unicorn.findById(req.params.unicorn_id, function(err, unicorn){
      if (err)
        res.send(err);

      unicorn.name = req.body.name; //=>updates unicorns name

      //save the new unicorn information
      unicorn.save(function(err) {
        if(err)
          res.send(err);
        res.json({message: "Unicorn has been updated"});
      });
    });
  });

  //=> to delete a specific unicorn
  .delete(function(req, res){
    Unicorn.remove({
      _id: req.params.unicorn_id
    }, function(err, unicorn){
      if(err)
        res.send(err);

      res.json({message: "Unicorn has been deleted"});
    });
  });


//start SERVER
app.listen(port); //=> Listens for port
console.log('The API connection on port ' + port);
