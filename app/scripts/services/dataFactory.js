/*global angularflashcardsApp:true */

'use strict';

angularflashcardsApp
.factory('dataFactory', function($http) {
	/*
	var d = $q.defer();
	$http.get('data/vocabs.json')
	.success(function(data, status, headers, config) {
		d.resolve(data, status, headers, config);
	}).error(function(data, status, headers, config) {
		d.reject(data, status, headers, config);
	});
	return d.promise;
	*/
    /*
	$http.get('data/vocabs.json').then(function(res){
          $scope.todos = res.data;
    });
    */
    return{
      retrieveVocabs : function() {
	      return $http.get('data/vocabs.json');
		  }
	  };
  });