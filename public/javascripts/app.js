(function(){
var app = angular.module("main", []);
	app.factory('tabService', function(){
		var tab = 1;
		return {
			stab: tab,
			selectTab : function(setTab){
				tab = setTab;
			},
			isSelected : function(checkTab){
				return tab === checkTab;
			}
		}
	})
	app.controller("tripsCtrl", ['$http', '$scope', 'tabService' , (function($http, $scope, tabService){
		$scope.isSelected = function(checkTab){
			return tabService.isSelected(checkTab)
		}
		$http.get("/viajes").success(function(data){
			$scope.trips = data;
		});
	})]);
	app.controller('tabsCtrl', ['$scope', 'tabService', function($scope, tabService){
		$scope.tab = tabService.stab;
		$scope.selectTab = function(setTab){
			tabService.selectTab(setTab)
		}
		$scope.isSelected = function(checkTab){
			return tabService.isSelected(checkTab)
		}
	}])
	app.controller('funcCtrl', ['$http', 'tabService', '$scope', function($http, tabService, $scope){
		$scope.isSelected = function(checkTab){
			return tabService.isSelected(checkTab)
		}
		$http.get("/funcionario").success(function(data){
			$scope.func = data;
		})
	}])
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
})();