/*global angularflashcardsApp:true */
'use strict';

var angularflashcardsApp = angular.module('angularflashcardsApp', ['angularLocalStorage']);

angularflashcardsApp.run(function($rootScope, $http, $location, storage) {

	/*
	* retrieve data
	*/
	$http.get('data/vocabs.json').success(function(data) {
		if (data) {
			$rootScope.stacks = data;
		}
	}).error(function(data) {
		console.error('Error fetching feed:', data);
	});

	/*
	 * set storage vars
	 */
	storage.bind($rootScope, 'incorrectA1');
	storage.bind($rootScope, 'incorrectA2');
	storage.bind($rootScope, 'incorrectB1');
	storage.bind($rootScope, 'incorrectB2');
	function updateIncorrectJson() {
		$rootScope.incorrect = {
			'A1' : $rootScope.incorrectA1.length > 0 ? JSON.parse($rootScope.incorrectA1) : '',
			'A2' : $rootScope.incorrectA2.length > 0 ? JSON.parse($rootScope.incorrectA2) : '',
			'B1' : $rootScope.incorrectB1.length > 0 ? JSON.parse($rootScope.incorrectB1) : '',
			'B2' : $rootScope.incorrectB2.length > 0 ? JSON.parse($rootScope.incorrectB2) : ''
		};
	}

	updateIncorrectJson();
	/*
	 * back button
	 */
	$rootScope.history = [];

	$rootScope.$on('$routeChangeSuccess', function() {
		if ($rootScope.history[$rootScope.history.length - 1] !== $location.$$path) {
			$rootScope.history.push($location.$$path);
		}
		updateIncorrectJson();
	});

	$rootScope.back = function() {
		var prevUrl = $rootScope.history.length > 1 ? $rootScope.history[$rootScope.history.length - 2] : '/';
		$location.path(prevUrl);
		updateIncorrectJson();
	};

}).config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'views/main.html',
		controller : 'MainCtrl'
	}).when('/stack/:id', {
		templateUrl : 'views/stack.html',
		controller : 'StackCtrl'
	}).otherwise({
		redirectTo : '/',

	});
});

