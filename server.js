var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  //mongoose = require('mongoose'),

  //Measurement = require('./api/models/iotModel'),
  bodyParser = require('body-parser');
  
//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/iot'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/iotRoutes');
routes(app);


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);

var iotController = require('./api/controllers/iotController');

var CronJob = require('cron').CronJob;
var job = new CronJob('* * * * * *', function() {
  /*
   * Runs every weekday (Monday through Friday)
   * at 11:30:00 AM. It does not run on Saturday
   * or Sunday.
   */
   console.log("cron ... add measurement.")
   iotController.add_measurement();
  }, function () {
    /* This function is executed when the job stops */
    console.log("cron.stop")
  },
  true, /* Start the job right now */
  'America/Los_Angeles' /* Time zone of this job. */
);