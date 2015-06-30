'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Anamnesi = mongoose.model('Anamnesi');

/**
 * Globals
 */
var user, anamnesi;

/**
 * Unit tests
 */
describe('Anamnesi Model Unit Tests:', function() {
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
			anamnesi = new Anamnesi({
				name: 'Anamnesi Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return anamnesi.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			anamnesi.name = '';

			return anamnesi.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Anamnesi.remove().exec();
		User.remove().exec();

		done();
	});
});