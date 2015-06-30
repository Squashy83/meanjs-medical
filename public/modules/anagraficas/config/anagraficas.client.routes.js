'use strict';

//Setting up route
angular.module('anagraficas').config(['$stateProvider',
	function($stateProvider) {
		// Anagraficas state routing
		$stateProvider.
		state('listAnagraficas', {
			url: '/anagraficas',
			templateUrl: 'modules/anagraficas/views/list-anagraficas.client.view.html'
		}).
		state('createAnagrafica', {
			url: '/anagraficas/create',
			templateUrl: 'modules/anagraficas/views/create-anagrafica.client.view.html'
		}).
		state('viewAnagrafica', {
			url: '/anagraficas/:anagraficaId',
			templateUrl: 'modules/anagraficas/views/view-anagrafica.client.view.html'
		}).
		state('editAnagrafica', {
			url: '/anagraficas/:anagraficaId/edit',
			templateUrl: 'modules/anagraficas/views/edit-anagrafica.client.view.html'
		});
	}
]);