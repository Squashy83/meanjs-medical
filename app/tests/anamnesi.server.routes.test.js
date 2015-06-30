'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Anamnesi = mongoose.model('Anamnesi'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, anamnesi;

/**
 * Anamnesi routes tests
 */
describe('Anamnesi CRUD tests', function() {
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

		// Save a user to the test db and create new Anamnesi
		user.save(function() {
			anamnesi = {
				name: 'Anamnesi Name'
			};

			done();
		});
	});

	it('should be able to save Anamnesi instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Anamnesi
				agent.post('/anamnesis')
					.send(anamnesi)
					.expect(200)
					.end(function(anamnesiSaveErr, anamnesiSaveRes) {
						// Handle Anamnesi save error
						if (anamnesiSaveErr) done(anamnesiSaveErr);

						// Get a list of Anamnesis
						agent.get('/anamnesis')
							.end(function(anamnesisGetErr, anamnesisGetRes) {
								// Handle Anamnesi save error
								if (anamnesisGetErr) done(anamnesisGetErr);

								// Get Anamnesis list
								var anamnesis = anamnesisGetRes.body;

								// Set assertions
								(anamnesis[0].user._id).should.equal(userId);
								(anamnesis[0].name).should.match('Anamnesi Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Anamnesi instance if not logged in', function(done) {
		agent.post('/anamnesis')
			.send(anamnesi)
			.expect(401)
			.end(function(anamnesiSaveErr, anamnesiSaveRes) {
				// Call the assertion callback
				done(anamnesiSaveErr);
			});
	});

	it('should not be able to save Anamnesi instance if no name is provided', function(done) {
		// Invalidate name field
		anamnesi.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Anamnesi
				agent.post('/anamnesis')
					.send(anamnesi)
					.expect(400)
					.end(function(anamnesiSaveErr, anamnesiSaveRes) {
						// Set message assertion
						(anamnesiSaveRes.body.message).should.match('Please fill Anamnesi name');
						
						// Handle Anamnesi save error
						done(anamnesiSaveErr);
					});
			});
	});

	it('should be able to update Anamnesi instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Anamnesi
				agent.post('/anamnesis')
					.send(anamnesi)
					.expect(200)
					.end(function(anamnesiSaveErr, anamnesiSaveRes) {
						// Handle Anamnesi save error
						if (anamnesiSaveErr) done(anamnesiSaveErr);

						// Update Anamnesi name
						anamnesi.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Anamnesi
						agent.put('/anamnesis/' + anamnesiSaveRes.body._id)
							.send(anamnesi)
							.expect(200)
							.end(function(anamnesiUpdateErr, anamnesiUpdateRes) {
								// Handle Anamnesi update error
								if (anamnesiUpdateErr) done(anamnesiUpdateErr);

								// Set assertions
								(anamnesiUpdateRes.body._id).should.equal(anamnesiSaveRes.body._id);
								(anamnesiUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Anamnesis if not signed in', function(done) {
		// Create new Anamnesi model instance
		var anamnesiObj = new Anamnesi(anamnesi);

		// Save the Anamnesi
		anamnesiObj.save(function() {
			// Request Anamnesis
			request(app).get('/anamnesis')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Anamnesi if not signed in', function(done) {
		// Create new Anamnesi model instance
		var anamnesiObj = new Anamnesi(anamnesi);

		// Save the Anamnesi
		anamnesiObj.save(function() {
			request(app).get('/anamnesis/' + anamnesiObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', anamnesi.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Anamnesi instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Anamnesi
				agent.post('/anamnesis')
					.send(anamnesi)
					.expect(200)
					.end(function(anamnesiSaveErr, anamnesiSaveRes) {
						// Handle Anamnesi save error
						if (anamnesiSaveErr) done(anamnesiSaveErr);

						// Delete existing Anamnesi
						agent.delete('/anamnesis/' + anamnesiSaveRes.body._id)
							.send(anamnesi)
							.expect(200)
							.end(function(anamnesiDeleteErr, anamnesiDeleteRes) {
								// Handle Anamnesi error error
								if (anamnesiDeleteErr) done(anamnesiDeleteErr);

								// Set assertions
								(anamnesiDeleteRes.body._id).should.equal(anamnesiSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Anamnesi instance if not signed in', function(done) {
		// Set Anamnesi user 
		anamnesi.user = user;

		// Create new Anamnesi model instance
		var anamnesiObj = new Anamnesi(anamnesi);

		// Save the Anamnesi
		anamnesiObj.save(function() {
			// Try deleting Anamnesi
			request(app).delete('/anamnesis/' + anamnesiObj._id)
			.expect(401)
			.end(function(anamnesiDeleteErr, anamnesiDeleteRes) {
				// Set message assertion
				(anamnesiDeleteRes.body.message).should.match('User is not logged in');

				// Handle Anamnesi error error
				done(anamnesiDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Anamnesi.remove().exec();
		done();
	});
});