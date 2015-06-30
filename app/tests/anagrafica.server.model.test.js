'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Anagrafica = mongoose.model('Anagrafica');

/**
 * Globals
 */
var user, anagrafica;

/**
 * Unit tests
 */
describe('Anagrafica Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			anagrafica = new Anagrafica({
				name: 'Anagrafica Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return anagrafica.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			anagrafica.name = '';

			return anagrafica.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Anagrafica.remove().exec();
		User.remove().exec();

		done();
	});
});