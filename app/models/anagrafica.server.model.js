'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var DocumentsSchema = new Schema({
    idtype: {
		type: String,
		default: '',
		trim: false
	},
        idvalidfrom: {
		type: String,
		default: '',
		trim: false
	},
    idvalidto: {
		type: String,
		default: '',
		trim: false
	},
    number: {
        type: String,
		default: '',
		trim: false
            }
});

var DesireSchema = new Schema({
    type: {
		type: String,
		default: '',
		trim: false
	},
        note: {
		type: String,
		default: '',
		trim: false
	}
});

/*var PermessoSchema = new Schema({

});*/

/**
 * Anagrafica Schema
 */
var AnagraficaSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill the Name',
		trim: true
	},
    surname: {
		type: String,
		default: '',
		required: 'Please fill the Surname',
		trim: true
	},
    birthday: {
		type: String,
		default: '',
		required: 'Please fill the Birthday',
		trim: false
	},
    fiscalcode: {
		type: String,
		default: '',
		trim: false
	},
    gender: {
		type: Boolean,
		default: false,
		required: 'Please fill the Gender'
	},
    italyborn: { 
		type: Boolean,
		default: false
	},
    comingfrom: {
		type: String,
		default: 'ITALY',
		trim: false
	},
        nationality: {
		type: String,
		default: 'ITALY',
		trim: false
	},
    spokenlanguage: {
		type: String,
		default: 'Italian',
		trim: false
	},
    livewith: {
		type: String,
		default: '',
		trim: false
	},
    ischild: {
		type: Boolean,
		default: false
	},
    father: {
		type: String,
		default: '',
		trim: false
	},
    mother: {
		type: String,
		default: '',
		trim: false
	},
    familyitalydate: {
		type: String,
		default: '',
		trim: false
	}, 
    community: {
		type: String,
		default: '',
		trim: false
	},
    phone: {
		type: String,
		default: '',
		trim: false
	},
    isorphan: {
		type: Boolean,
		default: false
	},
     wentbackcountry: {
		type: Boolean,
		default: false
	},
     wentbackcountrystartdate: {
		type: String,
		default: '',
		trim: false
	},
    wentbackcountryenddate: {
		type: String,
		default: '',
		trim: false
	},
    wentbackcountrywith: {
		type: String,
		default: '',
		trim: false
	},
   jobtype: {
		type: String,
		default: '',
		trim: false
	},
     oldjobtype: {
		type: String,
		default: '',
		trim: false
	},
    education: {
		type: String,
		default: '',
		trim: false
	},
	created: {
		type: Date,
		default: Date.now
	},
    legalsituation: {
		type: Boolean,
		default: false
	},
    documents: {
        type: [DocumentsSchema],
        default: [],
        trim: false
    },
    permission: {
            type: {
		type: String,
		default: '',
		trim: false
	},
        validfrom: {
		type: String,
		default: '',
		trim: false
	},
    validto: {
		type: String,
		default: '',
		trim: false
	}
    },
     civilstate: {
		type: String,
		default: '',
		trim: false
	},
    legaladdress: {
		type: String,
		default: '',
		trim: false
	},
    realaddress: {
		type: String,
		default: '',
		trim: false
	},
    desiderata: {
        type: [DesireSchema],
        default: [],
        trim: false
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Anagrafica', AnagraficaSchema);