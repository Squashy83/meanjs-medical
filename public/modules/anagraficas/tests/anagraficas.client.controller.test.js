'use strict';

(function() {
	// Anagraficas Controller Spec
	describe('Anagraficas Controller Tests', function() {
		// Initialize global variables
		var AnagraficasController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Anagraficas controller.
			AnagraficasController = $controller('AnagraficasController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Anagrafica object fetched from XHR', inject(function(Anagraficas) {
			// Create sample Anagrafica using the Anagraficas service
			var sampleAnagrafica = new Anagraficas({
				name: 'New Anagrafica'
			});

			// Create a sample Anagraficas array that includes the new Anagrafica
			var sampleAnagraficas = [sampleAnagrafica];

			// Set GET response
			$httpBackend.expectGET('anagraficas').respond(sampleAnagraficas);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.anagraficas).toEqualData(sampleAnagraficas);
		}));

		it('$scope.findOne() should create an array with one Anagrafica object fetched from XHR using a anagraficaId URL parameter', inject(function(Anagraficas) {
			// Define a sample Anagrafica object
			var sampleAnagrafica = new Anagraficas({
				name: 'New Anagrafica'
			});

			// Set the URL parameter
			$stateParams.anagraficaId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/anagraficas\/([0-9a-fA-F]{24})$/).respond(sampleAnagrafica);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.anagrafica).toEqualData(sampleAnagrafica);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Anagraficas) {
			// Create a sample Anagrafica object
			var sampleAnagraficaPostData = new Anagraficas({
				name: 'New Anagrafica'
			});

			// Create a sample Anagrafica response
			var sampleAnagraficaResponse = new Anagraficas({
				_id: '525cf20451979dea2c000001',
				name: 'New Anagrafica'
			});

			// Fixture mock form input values
			scope.name = 'New Anagrafica';

			// Set POST response
			$httpBackend.expectPOST('anagraficas', sampleAnagraficaPostData).respond(sampleAnagraficaResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Anagrafica was created
			expect($location.path()).toBe('/anagraficas/' + sampleAnagraficaResponse._id);
		}));

		it('$scope.update() should update a valid Anagrafica', inject(function(Anagraficas) {
			// Define a sample Anagrafica put data
			var sampleAnagraficaPutData = new Anagraficas({
				_id: '525cf20451979dea2c000001',
				name: 'New Anagrafica'
			});

			// Mock Anagrafica in scope
			scope.anagrafica = sampleAnagraficaPutData;

			// Set PUT response
			$httpBackend.expectPUT(/anagraficas\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/anagraficas/' + sampleAnagraficaPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid anagraficaId and remove the Anagrafica from the scope', inject(function(Anagraficas) {
			// Create new Anagrafica object
			var sampleAnagrafica = new Anagraficas({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Anagraficas array and include the Anagrafica
			scope.anagraficas = [sampleAnagrafica];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/anagraficas\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAnagrafica);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.anagraficas.length).toBe(0);
		}));
	});
}());