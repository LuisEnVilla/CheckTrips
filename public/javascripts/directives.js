(function(){
var app = angular.module("directives", []);
	app.directive('tripCards', function(){
		return {
			restrict: 'E',
			templateUrl: '../views/trip-cards.html'
		};
	});
	app.directive('funcCard', function(){
		return {
			restrict: 'E',
			templateUrl : '../views/func-card.html'
		}
	});
	app.directive('appBar', function(){
		return {
			restrict : 'E',
			templateUrl : '../views/app-bar.html'
		}
	});
	app.directive('tabs', function(){
		return {
			restrict : 'E',
			templateUrl : '../views/tabs.html'
		}
	});
})();