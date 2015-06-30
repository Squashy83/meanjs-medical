'use strict';

//Anamnesis service used to communicate Anamnesis REST endpoints
angular.module('anamnesis').factory('Anamnesis', ['$resource',
	function($resource) {
		return $resource('anamnesis/:anamnesiId', { anamnesiId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

angular.module('anamnesis').factory('AnamnesisByAnagrafica', ['$resource',
	function($resource) {
		return $resource('anamnesist', { anagraficaId: '@anagraficaId'
		}, {
			listByAnagrafica: {
				method: 'GET'
			}
		});
	}
]);


angular.module('anamnesis').service('linkAnamnesiToAnagrafica', function() {
    
    var anagraficaId = {};
    var anagraficaName = {};
    var anagraficaBirthday = {};
    function set(anaID){
        anagraficaId=anaID;
    }
    function setName(anaNAME){
        anagraficaName=anaNAME;
    }
    function setBirth(anaBIRTH){
        anagraficaBirthday=anaBIRTH;
    }
    function get() {
  return anagraficaId;
 }
    function getName() {
  return anagraficaName;
 }
    function getBirth() {
  return anagraficaBirthday;
 }
     return {
  set: set,
  setName: setName,
  setBirth: setBirth,
  get: get,
  getName: getName,   
  getBirth: getBirth, 
 };
});

