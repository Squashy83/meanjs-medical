'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Anagrafica = mongoose.model('Anagrafica'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, anagrafica;

/**
 * Anagrafica routes tests
 */
describe('Anagrafica CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Anagrafica
		user.save(function() {
			anagrafica = {
				name: 'Anagrafica Name'
			};

			done();
		});
	});

	it('should be able to save Anagrafica instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Anagrafica
				agent.post('/anagraficas')
					.send(anagrafica)
					.expect(200)
					.end(function(anagraficaSaveErr, anagraficaSaveRes) {
						// Handle Anagrafica save error
						if (anagraficaSaveErr) done(anagraficaSaveErr);

						// Get a list of Anagraficas
						agent.get('/anagraficas')
							.end(function(anagraficasGetErr, anagraficasGetRes) {
								// Handle Anagrafica save error
								if (anagraficasGetErr) done(anagraficasGetErr);

								// Get Anagraficas list
								var anagraficas = anagraficasGetRes.body;

								// Set assertions
								(anagraficas[0].user._id).should.equal(userId);
								(anagraficas[0].name).should.match('Anagrafica Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Anagrafica instance if not logged in', function(done) {
		agent.post('/anagraficas')
			.send(anagrafica)
			.expect(401)
			.end(function(anagraficaSaveErr, anagraficaSaveRes) {
				// Call the assertion callback
				done(anagraficaSaveErr);
			});
	});

	it('should not be able to save Anagrafica instance if no name is provided', function(done) {
		// Invalidate name field
		anagrafica.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Anagrafica
				agent.post('/anagraficas')
					.send(anagrafica)
					.expect(400)
					.end(function(anagraficaSaveErr, anagraficaSaveRes) {
						// Set message assertion
						(anagraficaSaveRes.body.message).should.match('Please fill Anagrafica name');
						
						// Handle Anagrafica save error
						done(anagraficaSaveErr);
					});
			});
	});

	it('should be able to update Anagrafica instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Anagrafica
				agent.post('/anagraficas')
					.send(anagrafica)
					.expect(200)
					.end(function(anagraficaSaveErr, anagraficaSaveRes) {
						// Handle Anagrafica save error
						if (anagraficaSaveErr) done(anagraficaSaveErr);

						// Update Anagrafica name
						anagrafica.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Anagrafica
						agent.put('/anagraficas/' + anagraficaSaveRes.body._id)
							.send(anagrafica)
							.expect(200)
							.end(function(anagraficaUpdateErr, anagraficaUpdateRes) {
								// Handle Anagrafica update error
								if (anagraficaUpdateErr) done(anagraficaUpdateErr);

								// Set assertions
								(anagraficaUpdateRes.body._id).should.equal(anagraficaSaveRes.body._id);
								(anagraficaUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Anagraficas if not signed in', function(done) {
		// Create new Anagrafica model instance
		var anagraficaObj = new Anagrafica(anagrafica);

		// Save the Anagrafica
		anagraficaObj.save(function() {
			// Request Anagraficas
			request(app).get('/anagraficas')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Anagrafica if not signed in', function(done) {
		// Create new Anagrafica model instance
		var anagraficaObj = new Anagrafica(anagrafica);

		// Save the Anagrafica
		anagraficaObj.save(function() {
			request(app).get('/anagraficas/' + anagraficaObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', anagrafica.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Anagrafica instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Anagrafica
				agent.post('/anagraficas')
					.send(anagrafica)
					.expect(200)
					.end(function(anagraficaSaveErr, anagraficaSaveRes) {
						// Handle Anagrafica save error
						if (anagraficaSaveErr) done(anagraficaSaveErr);

						// Delete existing Anagrafica
						agent.delete('/anagraficas/' + anagraficaSaveRes.body._id)
							.send(anagrafica)
							.expect(200)
							.end(function(anagraficaDeleteErr, anagraficaDeleteRes) {
								// Handle Anagrafica error error
								if (anagraficaDeleteErr) done(anagraficaDeleteErr);

								// Set assertions
								(anagraficaDeleteRes.body._id).should.equal(anagraficaSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Anagrafica instance if not signed in', function(done) {
		// Set Anagrafica user 
		anagrafica.user = user;

		// Create new Anagrafica model instance
		var anagraficaObj = new Anagrafica(anagrafica);

		// Save the Anagrafica
		anagraficaObj.save(function() {
			// Try deleting Anagrafica
			request(app).delete('/anagraficas/' + anagraficaObj._id)
			.expect(401)
			.end(function(anagraficaDeleteErr, anagraficaDeleteRes) {
				// Set message assertion
				(anagraficaDeleteRes.body.message).should.match('User is not logged in');

				// Handle Anagrafica error error
				done(anagraficaDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Anagrafica.remove().exec();
		done();
	});
});