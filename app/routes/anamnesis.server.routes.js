'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var anamnesis = require('../../app/controllers/anamnesis.server.controller');

	// Anamnesis Routes
	app.route('/anamnesis')
		.get(anamnesis.list)
		.post(users.requiresLogin, anamnesis.create);

	app.route('/anamnesis/:anamnesiId')
		.get(anamnesis.read)
		.put(users.requiresLogin, anamnesis.hasAuthorization, anamnesis.update)
		.delete(users.requiresLogin, anamnesis.hasAuthorization, anamnesis.delete);
    
    app.route('/anamnesist')
		.get(anamnesis.listByAnagrafica);
    

	// Finish by binding the Anamnesi middleware
	app.param('anamnesiId', anamnesis.anamnesiByID);
};
