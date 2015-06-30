'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Anamnesi = mongoose.model('Anamnesi'),
	_ = require('lodash');

/**
 * Create a Anamnesi
 */
exports.create = function(req, res) {
	var anamnesi = new Anamnesi(req.body);
	anamnesi.user = req.user;

	anamnesi.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(anamnesi);
		}
	});
};

/**
 * Show the current Anamnesi
 */
exports.read = function(req, res) {
	res.jsonp(req.anamnesi);
};

/**
 * Update a Anamnesi
 */
exports.update = function(req, res) {
	var anamnesi = req.anamnesi ;

	anamnesi = _.extend(anamnesi , req.body);

	anamnesi.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(anamnesi);
		}
	});
};

/**
 * Delete an Anamnesi
 */
exports.delete = function(req, res) {
	var anamnesi = req.anamnesi ;

	anamnesi.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(anamnesi);
		}
	});
};

/**
 * List of Anamnesis
 */
exports.list = function(req, res) {

	Anamnesi.find().sort('-created').populate('user', 'displayName').exec(function(err, anamnesis) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(anamnesis);
		}
	});
};

/**
 * List of Anamnesis
 */
exports.listByAnagrafica = function(req, res) {
	Anamnesi.find().where('anagraficaId').equals(req.query.anagraficaId).sort('-created').populate('user', 'displayName').exec(function(err, anamnesis) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(anamnesis);
		}
	});
};

/**
 * Anamnesi middleware
 */
exports.anamnesiByID = function(req, res, next, id) { 
	Anamnesi.findById(id).populate('user', 'displayName').exec(function(err, anamnesi) {
		if (err) return next(err);
		if (! anamnesi) return next(new Error('Failed to load Anamnesi ' + id));
		req.anamnesi = anamnesi ;
		next();
	});
};

/**
 * Anamnesi authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.anamnesi.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
