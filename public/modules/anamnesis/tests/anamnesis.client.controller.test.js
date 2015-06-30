'use strict';

(function() {
	// Anamnesis Controller Spec
	describe('Anamnesis Controller Tests', function() {
		// Initialize global variables
		var AnamnesisController,
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

			// Initialize the Anamnesis controller.
			AnamnesisController = $controller('AnamnesisController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Anamnesi object fetched from XHR', inject(function(Anamnesis) {
			// Create sample Anamnesi using the Anamnesis service
			var sampleAnamnesi = new Anamnesis({
				name: 'New Anamnesi'
			});

			// Create a sample Anamnesis array that includes the new Anamnesi
			var sampleAnamnesis = [sampleAnamnesi];

			// Set GET response
			$httpBackend.expectGET('anamnesis').respond(sampleAnamnesis);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.anamnesis).toEqualData(sampleAnamnesis);
		}));

		it('$scope.findOne() should create an array with one Anamnesi object fetched from XHR using a anamnesiId URL parameter', inject(function(Anamnesis) {
			// Define a sample Anamnesi object
			var sampleAnamnesi = new Anamnesis({
				name: 'New Anamnesi'
			});

			// Set the URL parameter
			$stateParams.anamnesiId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/anamnesis\/([0-9a-fA-F]{24})$/).respond(sampleAnamnesi);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.anamnesi).toEqualData(sampleAnamnesi);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Anamnesis) {
			// Create a sample Anamnesi object
			var sampleAnamnesiPostData = new Anamnesis({
				name: 'New Anamnesi'
			});

			// Create a sample Anamnesi response
			var sampleAnamnesiResponse = new Anamnesis({
				_id: '525cf20451979dea2c000001',
				name: 'New Anamnesi'
			});

			// Fixture mock form input values
			scope.name = 'New Anamnesi';

			// Set POST response
			$httpBackend.expectPOST('anamnesis', sampleAnamnesiPostData).respond(sampleAnamnesiResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Anamnesi was created
			expect($location.path()).toBe('/anamnesis/' + sampleAnamnesiResponse._id);
		}));

		it('$scope.update() should update a valid Anamnesi', inject(function(Anamnesis) {
			// Define a sample Anamnesi put data
			var sampleAnamnesiPutData = new Anamnesis({
				_id: '525cf20451979dea2c000001',
				name: 'New Anamnesi'
			});

			// Mock Anamnesi in scope
			scope.anamnesi = sampleAnamnesiPutData;

			// Set PUT response
			$httpBackend.expectPUT(/anamnesis\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/anamnesis/' + sampleAnamnesiPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid anamnesiId and remove the Anamnesi from the scope', inject(function(Anamnesis) {
			// Create new Anamnesi object
			var sampleAnamnesi = new Anamnesis({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Anamnesis array and include the Anamnesi
			scope.anamnesis = [sampleAnamnesi];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/anamnesis\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAnamnesi);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.anamnesis.length).toBe(0);
		}));
	});
}());