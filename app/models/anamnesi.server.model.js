'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Anamnesi Schema
 */
var AnamnesiSchema = new Schema({
	
    anagraficaId: {
		type: String,
		default: '',
		trim: false
	},
    age: {
		type: String,
		default: '',
		trim: false
	},
    weight: {
		type: String,
		default: '',
		trim: false
	},
    height: {
		type: String,
		default: '',
		trim: false
	},
    armCircum: {
		type: String,
		default: '',
		trim: false
	},
    craniumCircum: {
		type: String,
		default: '',
		trim: false
	},
    examination: {
		type: String,
		default: '',
		trim: false
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Anamnesi', AnamnesiSchema);