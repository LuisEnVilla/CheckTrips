(function(){
var app = angular.module("main", ['ngRoute', 'directives']);
	app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/details/:id', {
        templateUrl: '../views/details.html',
        controller : 'detailsCtrl'
      }).
      when('/funcionario/:id', {
        templateUrl: '../views/trip-list.html',
        controller : 'fTripsCtrl'
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
	app.factory('sidebarService', function(){
		var open = false;
		return {
			toggle : function(){
				open = !open;
				console.log(open);
			},
			state : function(){
				return open
			}
		}
	})
	app.controller('sidebarCtrl', ['$scope','sidebarService', function($scope, sidebarService){
		$scope.state = function(){
			return sidebarService.state()
		}
		$scope.toggle = function(){
			sidebarService.toggle()
		}
	}])
	app.controller('appBarCtrl', ['$scope','sidebarService', function($scope, sidebarService){
		$scope.toggle = function(){
			sidebarService.toggle()
		}
	}])
	app.controller('detailsCtrl', ['$scope', '$http','$routeParams', function($scope,$http,$routeParams){
		$http.get('/viajes/' + $routeParams.id).success(function(data){
			$scope.trip = data
		})
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
	app.controller('fTripsCtrl', ['$scope','$http', '$routeParams',function($scope, $http, $routeParams){
		$http.get('/funcionario/viajes/'+$routeParams.id).success(function(data){
			$scope.trips = data
		})
	}])
	app.filter('fLetter', function(word) {
		return word[0]
	});
})();