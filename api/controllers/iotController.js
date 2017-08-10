'use strict';

var loki = require('lokijs')

var db = new loki('loki.json');
var iotCollection = db.addCollection('iot');

exports.list_all_measurements = function(req, res) {
  console.log("list_all_measurements");
  
  /*
  Measurement.find({}, function(err, measurement){
    if(err)
      res.send(err);
    res.json(measurement)
  })
  */
  var data = iotCollection.find();
  console.log(data)

  res.json(data);
};

exports.get_average = function(req, res) {
  console.log("get_average");

  var mp = "mp2"
  var selection = iotCollection.find({measurepoint : mp });
  var count = selection.length;
  console.log(count);
  
  var avg = 0;
  for (var i = 0; i< selection.length; i++){
    avg += selection[i].value;
  }

  avg = avg / selection.length;
  console.log("average: "+avg);

  res.json({"measurepoint": mp, "count": count, "avg": avg});
};

/*
exports.create_a_measurement = function(req, res) {
  var new_measure = new Measurement(req.body);
  new_measure.save(function(err, measurement) {
    if (err)
      res.send(err);
    res.json(measurement);
  });
};

*/


exports.add_measurement = function(){
  
  var value = (Math.random()*100) % 30;
  var timestamp = Math.floor(Math.random()*1000000);
  var new_measure = {"measurepoint" : "mp2", "value" : value, "timestamp" : timestamp};
  //console.log(new_measure);

  iotCollection.insert(new_measure);
  //res.json(new_measure);
  return new_measure;
};

exports.add_measurements = function(req, res){
  console.log("add_measurement");

  for(var i=0; i<10; i++){
    var new_measure = exports.add_measurement();
  }
  return new_measure;
};

/*
exports.save_measurement = function(req, res){
  console.log(req)
  console.log("save_measurement: "+req);
  var new_measure = new Measurement(req.body);
  console.log(new_measure);

  new_measure.save(function(err, measurement) {
    if (err)
      res.send(err);
    res.json(measurement);
  });
}

exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

*/