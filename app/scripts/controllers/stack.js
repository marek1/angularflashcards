/*global angularflashcardsApp:true */

'use strict';

angularflashcardsApp
.controller('StackCtrl', function($routeParams, $rootScope, $scope, storage) {
	
	var id= $routeParams.id;
	if ($routeParams.show==='all'){
		$scope.stack=$rootScope.stacks[id];
	}else if ($routeParams.show==='incorrect'){
		$scope.stack=$rootScope.incorrect[id];
	}
	$rootScope.status=id;
	$scope.alreadySeen=[];
	$scope.currentVocabNumber = 0;
	$scope.counter = 0;
	$scope.correctOnes = [];
	$scope.incorrectOnes = [];
	storage.bind($rootScope,'incorrectA1');
	storage.bind($rootScope,'incorrectA2');
	storage.bind($rootScope,'incorrectB1');
	storage.bind($rootScope,'incorrectB2');
	function getRandomNumber(max){
		if (max > 1) {
			return Math.floor((Math.random()*max));
		}else{
			return 0;
		}
	}
	function getVocab(){
		
		console.log('$scope.stack.length : ',$scope.stack.length);
		console.log('$scope.counter : ',$scope.counter);
		
		if ($scope.stack.length>$scope.counter){
			
			var x = getRandomNumber($scope.stack.length);
			
			while ($scope.alreadySeen.indexOf(x)>=0){
				x = getRandomNumber($scope.stack.length);
			}
			$scope.currentVocabNumber = x;
			$scope.currentVocab = $scope.stack[x];
			$scope.alreadySeen.push(x);
			$scope.counter++;
		}
	}
	
	getVocab();
	
	function getVocabFromAlreadySeen(){
		var x = $scope.counter-1;
		$scope.currentVocabNumber = $scope.alreadySeen[x];
		$scope.currentVocab = $scope.stack[$scope.currentVocabNumber];
	}
	
	function updateLocalStorage(){
		/*
		 * Updating the localstorage
		 */
		if (id==='A1') {
			$rootScope.incorrectA1 = JSON.stringify($scope.incorrectOnes);
			console.log('new $rootScope.incorrectA1 , ',$rootScope.incorrectA1);
		}
		if (id==='A2') {
			$rootScope.incorrectA2 = JSON.stringify($scope.incorrectOnes);
			console.log('new $rootScope.incorrectA2 , ',$rootScope.incorrectA2);
		}
		if (id==='B1') {
			$rootScope.incorrectB1 = JSON.stringify($scope.incorrectOnes);
			console.log('new $rootScope.incorrectB1 , ',$rootScope.incorrectB1);
		}
		if (id==='B2') {
			$rootScope.incorrectB2 = JSON.stringify($scope.incorrectOnes);
			console.log('new $rootScope.incorrectB2 , ',$rootScope.incorrectB2);
		}
	}
	$scope.getNext = function(){
		console.log('$scope.counter : ',$scope.counter);
		console.log('$scope.stack.length : ',$scope.stack.length);
		if ($scope.counter<$scope.stack.length) {
			if ($scope.counter===$scope.alreadySeen.length){
				getVocab();
			}else{
				$scope.counter++;
				getVocabFromAlreadySeen();
			}
		}else{
			$rootScope.back();
		}
	};
	$scope.getPrevious = function(){
		$scope.counter--;
		getVocabFromAlreadySeen();
	};
	$scope.saveAsCorrect = function(){
		/*
		 * pushing into 'correct' array
		 */
		if ($scope.correctOnes.indexOf($scope.stack[$scope.currentVocabNumber])===-1) {
			$scope.correctOnes.push($scope.stack[$scope.currentVocabNumber]);
		}
		/*
		 * removing into from 'incorrect' array
		 */
		$scope.incorrectOnes.splice($scope.incorrectOnes.indexOf($scope.stack[$scope.currentVocabNumber]), 1);
		/*
		 * and update Local storage
		 */
		updateLocalStorage();
		/*
		 * get next vocab
		 */
		$scope.getNext();
	};
	$scope.saveAsIncorrent = function(){
		/*
		 * pushing into 'correct' array
		 */
		if ($scope.incorrectOnes.indexOf($scope.stack[$scope.currentVocabNumber])===-1) {
			$scope.incorrectOnes.push($scope.stack[$scope.currentVocabNumber]);
		}
		/*
		 * removing into from 'correct' array
		 */
		$scope.correctOnes.splice($scope.correctOnes.indexOf($scope.stack[$scope.currentVocabNumber]), 1);
		/*
		 * and update Local storage
		 */
		updateLocalStorage();
		/*
		 * get next vocab
		 */
		$scope.getNext();
	};
	
});


	