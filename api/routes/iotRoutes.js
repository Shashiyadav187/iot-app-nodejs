'use strict';
module.exports = function(app) {
  
  var iotController = require('../controllers/iotController');


  // todoList Routes
  app.route('/average')
    .get(iotController.get_average);

  app.route('/measurement')
//  	.post(iotController.save_measurement)
  	.get(iotController.list_all_measurements)
  	.put(iotController.add_measurements);

/*
  app.route('/measurement/:taskId')
    .get(iotController.read_a_task)
    .put(iotController.update_a_task)
    .delete(iotController.delete_a_task);
    */
};
