'use strict';

// Anamnesis controller
angular.module('anamnesis').controller('AnamnesisController', ['$scope', '$stateParams', '$location', 'Authentication', 'Anamnesis', 'AnamnesisByAnagrafica','linkAnamnesiToAnagrafica', '$filter',
	function($scope, $stateParams, $location, Authentication, Anamnesis, AnamnesisByAnagrafica, linkAnamnesiToAnagrafica, $filter) {
		$scope.authentication = Authentication;
         
		// Create new Anamnesi
		$scope.create = function() {



			// Create new Anamnesi object
			var anamnesi = new Anamnesis ({
				age: this.age,
                weight: this.weight,
                height: this.height,
                armCircum: this.armCircum,
                craniumCircum: this.craniumCircum,
                examination: this.examination,
                anagraficaId: linkAnamnesiToAnagrafica.get()
			});

			// Redirect after save
			anamnesi.$save(function(response) {
				$location.path('anamnesis/' + response._id);

				// Clear form fields
                $scope.age = '';
                $scope.weight = '';
                $scope.height = '';
                $scope.armCircum = '';
                $scope.craniumCircum = '';
                $scope.examination = '';
                $scope.anagraficaId = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Anamnesi
		$scope.remove = function(anamnesi) {
			if ( anamnesi ) { 
				anamnesi.$remove();

				for (var i in $scope.anamnesis) {
					if ($scope.anamnesis [i] === anamnesi) {
						$scope.anamnesis.splice(i, 1);
					}
				}
			} else {
				$scope.anamnesi.$remove(function() {
					$location.path('anamnesis');
				});
			}
		};

		// Update existing Anamnesi
		$scope.update = function() {
			var anamnesi = $scope.anamnesi;

			anamnesi.$update(function() {
				$location.path('anamnesis/' + anamnesi._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

        
        // Find existing Anamnesis
        $scope.findByAnagrafica = function() {
                        var dataset = [];
            dataset[0]={key:'Cumulative Return', values:[]};
            $scope.anamnesis = AnamnesisByAnagrafica.query({
               anagraficaId : linkAnamnesiToAnagrafica.get()
            },function (response) {
                var i=0;
    angular.forEach(response, function (anamnesi) {
        if (anamnesi) {
            dataset[0].values.unshift({'label':($filter('date')(anamnesi.created, 'dd/MM/yyyy'))+'-'+i,'value':anamnesi.height});
i++;
        }


    });
                $scope.data=dataset;

});
            
};

		// Find existing Anamnesi
		$scope.findOne = function() {
            $scope.anagraficaName = linkAnamnesiToAnagrafica.getName();
			$scope.anamnesi = Anamnesis.get({ 
				anamnesiId: $stateParams.anamnesiId
			});
		};
        
         /* Chart options */
        $scope.options = {
    chart: {
        type: 'discreteBarChart',
        height: 450,
        yDomain:[0,200],
        margin : {
            top: 20,
            right: 20,
            bottom: 60,
            left: 55
        },
        x: function(d){ return d.label; },
        y: function(d){ return d.value; },
        showValues: true,
        transitionDuration: 500,
        xAxis: {
            axisLabel: 'Date'
        },
        yAxis: {
            axisLabel: 'CM',
            axisLabelDistance: 50
        }
    }
};
        
        $scope.config = {
    visible: true, // default: true
    extended: true, // default: false
    disabled: false, // default: false
    autorefresh: true, // default: true
    refreshDataOnly: false // default: false
};
        
          function calculateIsChild(birthday) {
      if(birthday !== undefined){
  $scope.ischild = 0;

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
  return age;
      } else return 0;
}
        
                $scope.age=calculateIsChild(linkAnamnesiToAnagrafica.getBirth());
	}
]);