'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Anagrafica = mongoose.model('Anagrafica'),
	_ = require('lodash');

/**
 * Create a Anagrafica
 */
exports.create = function(req, res) {
	var anagrafica = new Anagrafica(req.body);
	anagrafica.user = req.user;

	anagrafica.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(anagrafica);
		}
	});
};

/**
 * Show the current Anagrafica
 */
exports.read = function(req, res) {
	res.jsonp(req.anagrafica);
};

/**
 * Update a Anagrafica
 */
exports.update = function(req, res) {
	var anagrafica = req.anagrafica ;

	anagrafica = _.extend(anagrafica , req.body);

	anagrafica.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(anagrafica);
		}
	});
};

/**
 * Delete an Anagrafica
 */
exports.delete = function(req, res) {
	var anagrafica = req.anagrafica ;

	anagrafica.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(anagrafica);
		}
	});
};

/**
 * List of Anagraficas
 */
exports.list = function(req, res) {
	Anagrafica.find().sort('-created').populate('user', 'displayName').exec(function(err, anagraficas) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(anagraficas);
		}
	});
};

/**
 * Anagrafica middleware
 */
exports.anagraficaByID = function(req, res, next, id) { 
	Anagrafica.findById(id).populate('user', 'displayName').exec(function(err, anagrafica) {
		if (err) return next(err);
		if (! anagrafica) return next(new Error('Failed to load Anagrafica ' + id));
		req.anagrafica = anagrafica ;
		next();
	});
};

/**
 * Anagrafica authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.anagrafica.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

exports.getFathers = function(req, res) {
	Anagrafica.find({gender:true,ischild:false}).sort('-created').populate('user', 'displayName').exec(function(err, anagraficas) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(anagraficas);
		}
	});
};

exports.getMothers = function(req, res) {
	Anagrafica.find({gender:false,ischild:false}).sort('-created').populate('user', 'displayName').exec(function(err, anagraficas) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(anagraficas);
		}
	});
};
