'use strict';

//Anagraficas service used to communicate Anagraficas REST endpoints
angular.module('anagraficas').factory('Anagraficas', ['$resource',
	function($resource) {
		return $resource('anagraficas/:anagraficaId', { anagraficaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

angular.module('anagraficas').factory('Fathers', ['$resource',
	function($resource) {
		return $resource('/anagraficas/fathersList', { anagraficaId: '@_id'
		}, {
			getFathers: {
				method: 'GET'
			}
		});
	}
]);

angular.module('anagraficas').factory('Mothers', ['$resource',
	function($resource) {
		return $resource('/anagraficas/mothersList', { anagraficaId: '@_id'
		}, {
			getMothers: {
				method: 'GET'
			}
		});
	}
]);