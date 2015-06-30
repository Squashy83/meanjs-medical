'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var anagraficas = require('../../app/controllers/anagraficas.server.controller');

	// Anagraficas Routes
    app.route('/anagraficas/fathersList')
        .get(anagraficas.getFathers)
        .post(users.requiresLogin, anagraficas.create);
    
    app.route('/anagraficas/mothersList')
        .get(anagraficas.getMothers)
        .post(users.requiresLogin, anagraficas.create);
    
	app.route('/anagraficas')
		.get(anagraficas.list)
		.post(users.requiresLogin, anagraficas.create);

	app.route('/anagraficas/:anagraficaId')
		.get(anagraficas.read)
		.put(users.requiresLogin, anagraficas.hasAuthorization, anagraficas.update)
		.delete(users.requiresLogin, anagraficas.hasAuthorization, anagraficas.delete);
    
    

	// Finish by binding the Anagrafica middleware
	app.param('anagraficaId', anagraficas.anagraficaByID);
};
