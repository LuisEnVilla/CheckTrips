var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
	$scope.formData = {};
	// when landing on the page, get all todos and show them
	$http.get('/viajes')
	.success(function(data) {
	$scope.todos = data;
	})
	.error(function(data) {
	console.log('Error: ' + data);
	});
}