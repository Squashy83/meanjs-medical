'use strict';

//Setting up route
angular.module('anamnesis').config(['$stateProvider',
	function($stateProvider) {
		// Anamnesis state routing
		$stateProvider.
/*		state('listAnamnesist', {
			url: '/anamnesist',
			templateUrl: 'modules/anamnesis/views/list-anamnesis.client.view.html'
		}).*/
		state('createAnamnesi', {
			url: '/anamnesis/create',
			templateUrl: 'modules/anamnesis/views/create-anamnesi.client.view.html'
		}).
		state('viewAnamnesi', {
			url: '/anamnesis/:anamnesiId',
			templateUrl: 'modules/anamnesis/views/view-anamnesi.client.view.html'
		}).
		state('editAnamnesi', {
			url: '/anamnesis/:anamnesiId/edit',
			templateUrl: 'modules/anamnesis/views/edit-anamnesi.client.view.html'
		});
	}
]);