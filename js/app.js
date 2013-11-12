var demoApp = angular.module('demoApp', []);

// config sets up the routing
demoApp.config(function($routeProvider) {
	$routeProvider
		.when('/',
			{
				controller: 'SimpleController',
				templateUrl: 'partials/view1.html'
			})
		.when('/view2',
			{
				controller: 'SecondController',
				templateUrl: 'partials/view2.html'
			})
		.otherwise({ redirectTo: '/' });
});


// Factory providing data for one or more controller
demoApp.factory('SimpleFactory', function() {
	var customers = [
		{ name: 'John Whitez', city: 'Phoenix' },
		{ name: 'Jamie Rile', city: 'Atlanta' },
		{ name: 'Heidi White', city: 'Chicago' },
		{ name: 'Tom Green', city: 'Los Angeles' }
	];
	var factory={};
	factory.getCustomers = function() {
		return customers;
	};
	return factory;
});

// SimpleController - uses factory and stores data into $scope
demoApp.controller('SimpleController', function($scope, SimpleFactory, Math) {
	$scope.customers = [];
	$scope.result = Math.multiply(9, 9);
	$scope.greeting = 'Hello World!!';
	init();
	function init() {
		$scope.customers = SimpleFactory.getCustomers();
	}
	$scope.addCustomer = function() {
		$scope.customers.push(
			{name: $scope.newCustomer.name, city: $scope.newCustomer.city }
		);
	};

	$scope.deleteCustomer = function (index) {
        $scope.customers.splice(index, 1)
    };
});

// SecondController
demoApp.controller('SecondController', function($scope, SimpleFactory) {
	$scope.customers = SimpleFactory.getCustomers();

	$scope.numbers = [10, 25, 35, 45, 60, 80, 100];
    $scope.lowerBound = 5;
    
    // Creating a filter inside a controller
    $scope.greaterThanNum = function (item) {
        return item > $scope.lowerBound;
    };
});

// Custom directive - http://toddmotto.com/ultimate-guide-to-learning-angular-js-in-one-day/
demoApp.directive('customButton', function () {
  	return {
	    restrict: 'A',
	    replace: true,
	    transclude: true,
	    template: '<a href="" class="myawesomebutton" ng-transclude>' +
	                '<i class="icon-ok-sign"></i>' +
	              '</a>',
	    link: function (scope, element, attrs) {
	      	// DOM manipulation/events here!
	      	element.bind('click', function() {
				alert('test');
			});
	    }
  	};
});

demoApp.directive('toggleButton', function () {
	return {
		restrict: 'A',
	    replace: true,
	    transclude: true,
		template: '<a href="" class="btn">Toggle me!</a>',
		link: function (scope, element, attrs) {
			var on = false;
			element.bind('click', function() {
				if (on) {
					element.removeClass('active');
				} else {
					element.addClass('active');
				}
				on = !on;
			});
		}
	}
});

// Custom Service
demoApp.service('Math', function () {
  this.multiply = function (x, y) {
    return x * y;
  };
});

// Custom filter
demoApp.filter('reverse', function () {
    return function (input, uppercase) {
        var out = '';
        for (var i = 0; i < input.length; i++) {
            out = input.charAt(i) + out;
        }
        if (uppercase) {
            out = out.toUpperCase();
        }
        return out;
    }
});



