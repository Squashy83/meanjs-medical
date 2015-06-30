'use strict';

// Anagraficas controller
angular.module('anagraficas').controller('AnagraficasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Anagraficas', 'linkAnamnesiToAnagrafica', 'ngDialog', 'Fathers', 'Mothers', 
	function($scope, $stateParams, $location, Authentication, Anagraficas, linkAnamnesiToAnagrafica,ngDialog,Fathers,Mothers) {
		$scope.authentication = Authentication;

		// Create new Anagrafica
		$scope.create = function() {
			// Create new Anagrafica object
			var anagrafica = new Anagraficas ({
				name: this.name,
                surname: this.surname,
                birthday: this.birthday,
                fiscalcode: this.fiscalcode,
                gender: this.gender,
                ischild: calculateIsChild($scope.birthday),
                isorphan: this.isorphan,
                italyborn: this.italyborn,
                comingfrom: this.comingfrom,
                nationality: this.nationality,
                spokenlanguage: this.spokenlanguage,
                livewith: this.livewith,
                familyitalydate: this.familyitalydate,
                community: this.community,
                phone: this.phone,
                wentbackcountry: this.wentbackcountry,
                wentbackcountrystartdate: this.wentbackcountrystartdate,
                wentbackcountryenddate: this.wentbackcountryenddate,
                wentbackcountrywith: this.wentbackcountrywith,
                jobtype: this.jobtype,
                oldjobtype: this.oldjobtype,
                education: this.education,
                legalsituation: this.legalsituation,
                documents: this.documents,
                permission: this.permission,
                civilstate: this.civilstate,
                realaddress: this.realaddress,
                legaladdress: this.legaladdress,
                desiderata: this.desiderata
			});

            if($scope.currentFather !== undefined)
                anagrafica.father=$scope.currentFather;
            
            if($scope.currentMother !== undefined)
                anagrafica.mother=$scope.currentMother;

			// Redirect after save
			anagrafica.$save(function(response) {
				$location.path('anagraficas/' + response._id);

				// Clear form fields
				$scope.name = '';
                $scope.surname  = '';
                $scope.birthday  = '';
                $scope.fiscalcode  = '';
                $scope.gender  = '';
                $scope.ischild  = '';
                $scope.isorphan  = '';
                $scope.italyborn  = '';
                $scope.comingfrom  = '';
                $scope.nationality  = '';
                $scope.spokenlanguage = '';
                $scope.livewith = '';
                $scope.father = '';
                $scope.mother = '';
                $scope.familyitalydate = '';
                $scope.community = '';
                $scope.phone = '';
                $scope.wentbackcountry = '';
                $scope.wentbackcountrystartdate = '';
                $scope.wentbackcountryenddate = '';
                $scope.wentbackcountrywith = '';
                $scope.jobtype = '';
                $scope.education = '';
                $scope.legalsituation = '';
                $scope.documents = [];
                $scope.permission = {};
                $scope.civilstate = '';
                $scope.desiderata = [];
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Anagrafica
		$scope.remove = function(anagrafica) {
			if ( anagrafica ) { 
				anagrafica.$remove();

				for (var i in $scope.anagraficas) {
					if ($scope.anagraficas [i] === anagrafica) {
						$scope.anagraficas.splice(i, 1);
					}
				}
			} else {
				$scope.anagrafica.$remove(function() {
					$location.path('anagraficas');
				});
			}
		};

		// Update existing Anagrafica
		$scope.update = function() {
			var anagrafica = $scope.anagrafica;
            anagrafica.ischild = calculateIsChild($scope.anagrafica.birthday);
			anagrafica.$update(function() {
				$location.path('anagraficas/' + anagrafica._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Anagraficas
		$scope.find = function() {
			$scope.anagraficas = Anagraficas.query();
		};

		// Find existing Anagrafica
		$scope.findOne = function() {
            linkAnamnesiToAnagrafica.set($stateParams.anagraficaId);
			$scope.anagrafica = Anagraficas.get({ 
				anagraficaId: $stateParams.anagraficaId
			});

      //SI PUO' UTILIZZARE IL SUCCESS QUI?

            $scope.anagrafica.$promise.then(function(data) {
    linkAnamnesiToAnagrafica.setName(((data.name).concat(' ')).concat(data.surname));
    linkAnamnesiToAnagrafica.setBirth(data.birthday);  
                 $scope.anagrafica.father = Anagraficas.get({ 
				anagraficaId: $scope.anagrafica.father
			});  
             $scope.anagrafica.mother = Anagraficas.get({ 
				anagraficaId: $scope.anagrafica.mother
			});  
});
		};
        
        $scope.link2Anagrafica = function() {
            linkAnamnesiToAnagrafica.set($stateParams.anagraficaId);
            $scope.anagrafica = Anagraficas.get({ 
				anagraficaId: $stateParams.anagraficaId
			});
            
            $scope.anagrafica.$promise.then(function(data) {
    linkAnamnesiToAnagrafica.setName(((data.name).concat(' ')).concat(data.surname));
    linkAnamnesiToAnagrafica.setBirth(data.birthday);           
});

        };
        
        $scope.documents = [{idtype:'',idvalidfrom:'',idvalidto:'',number:''}];
        
        $scope.addDocument = function(){
            var document = {
                idtype: $scope.idtype,
                idvalidfrom: $scope.idvalidfrom,
                idvalidto: $scope.idvalidto,
                number: $scope.number
            };
            $scope.documents.push(document);
        };
        
        $scope.removeDocument = function(index){
    $scope.documents.splice(index, 1);
  };
        
        $scope.desiderata = [{type:'',note:''}];
        
        $scope.addDesire = function(){
            var desire = {
                type: $scope.type,
                note: $scope.note
            };
            $scope.desiderata.push(desire);
        };
        
        $scope.removeDesire = function(index){
    $scope.desiderata.splice(index, 1);
  };
        
        
        //RIPENSARLO MEGLIO - SOLUZIONE SPORCA
         $scope.addDocumentEdit = function(){
            var document = {
                idtype: $scope.idtype,
                idvalidfrom: $scope.idvalidfrom,
                idvalidto: $scope.idvalidto,
                number: $scope.number
            };
            $scope.anagrafica.documents.push(document);
        };
        
        $scope.removeDocumentEdit = function(index){
    $scope.anagrafica.documents.splice(index, 1);
  };
        
        
        
        $scope.addDesireEdit = function(){
            var desire = {
                type: $scope.type,
                note: $scope.note
            };
            $scope.anagrafica.desiderata.push(desire);
        };
        
        $scope.removeDesireEdit = function(index){
    $scope.anagrafica.desiderata.splice(index, 1);
  };
        
     $scope.confirmF = function(){
         $scope.father=$scope.currentFather;
         if($scope.anagrafica !== undefined){
             $scope.anagrafica.father=$scope.currentFather;
         }
     };
        
         $scope.confirmM = function(){
         $scope.mother=$scope.currentMother;
             if($scope.anagrafica !== undefined){
             $scope.anagrafica.mother=$scope.currentMother;
         }
     };
        
  function calculateIsChild(birthday) {
      if(birthday !== undefined){
  $scope.ischild = 0;
          if($scope.anagrafica !== undefined)
  $scope.anagrafica.ischild = 0;

  var birthDate = (birthday+'').split('-');
  var birthMonth = birthDate[1];
  var birthDay = birthDate[2];
  var birthYear = birthDate[0];
  var todayDate = new Date();
  var todayYear = todayDate.getFullYear();
  var todayMonth = todayDate.getMonth();
  var todayDay = todayDate.getDate();
  var age = todayYear - birthYear; 

  if (todayMonth < birthMonth - 1)
  {
    age--;
  }

  if (birthMonth - 1 === todayMonth && todayDay < birthDay)
  {
    age--;
  }
  if(age < 14){
    $scope.ischild = 1;
      if($scope.anagrafica !== undefined)
      $scope.anagrafica.ischild = 1;
     return 1;
  } else{ return 0;}
      } else return 0;
}
        
    $scope.flagIsChild = function (){
        return calculateIsChild($scope.birthday);
    };
        
        $scope.clickToOpenF = function () {
        ngDialog.open({ template: 'fatherslist', scope: $scope});
    };
        
        $scope.clickToOpenM = function () {
        ngDialog.open({ template: 'motherslist', scope: $scope });
    };
        
//**PAGINATION        
  $scope.currentPage = 1;
  $scope.pageSize = 10;
  $scope.meals = [];
//PAGINATION**
 
        
        $scope.loadFathers = function() {
            $scope.fathers = Fathers.query();
        };
        
        $scope.loadMothers = function() {
            $scope.mothers = Mothers.query();
        };
        
        $scope.selectList = function (parent) {
            switch(parent.gender){
                case false:
                     $scope.currentMother = parent;
                    break;
                    
                case true:
                    $scope.currentFather = parent;
                    break;
            }

        };
	}
]);