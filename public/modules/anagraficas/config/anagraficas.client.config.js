'use strict';

// Configuring the Articles module
angular.module('anagraficas',['ngDialog','angularUtils.directives.dirPagination']).run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Anagraficas', 'anagraficas', 'dropdown', '/anagraficas(/create)?');
		Menus.addSubMenuItem('topbar', 'anagraficas', 'List Anagraficas', 'anagraficas');
		Menus.addSubMenuItem('topbar', 'anagraficas', 'New Anagrafica', 'anagraficas/create');
	}
]);


