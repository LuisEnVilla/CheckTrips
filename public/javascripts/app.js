(function(){
var app = angular.module("main", ['ngRoute']);
	app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/details/:id', {
        templateUrl: '../views/details.html',
      }).
      when('/search', {
        templateUrl: '../views/search.html'
      }).
      otherwise({
        redirectTo: '/'
      });
      $locationProvider.html5Mode({
      	enabled : true,
      	requireBase: false
      });
  }]);
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
	app.factory('tripService', ['$http', function($http){
		return {
			trip : function(id){
				$http.get('/viajes/' + id ).success(function(data){
					return data
				})
			}
		}
	}])
	app.controller('detailsCtrl', ['$scope','$routeParams','tripService', function($scope,$routeParams,tripService){
		$scope.trip = tripService.trip($routeParams.id);
	}])
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
	app.directive('appHeader', function(){
		return {
			restrict : 'E',
			templateUrl : '../views/app-header.html'
		}
	});
	app.directive('tabs', function(){
		return {
			restrict : 'E',
			templateUrl : '../views/tabs.html'
		}
	});
})();