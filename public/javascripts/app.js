(function(){
var app = angular.module("main", ['directives', 'filters']);
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
	app.factory('compareService', function(){
		var trips2 = [];
		return {
		ctrips : trips2,
		toggle : function(id) {
			if(trips2.lastIndexOf(id)){
				trips2.splice(trips2.lastIndexOf(id), 1)
				return
			} 
			trips2.push(id)
		},
		isIn : function(id){
			if(trips2.lastIndexOf(id)){
				console.log(trips2.lastIndexOf(id));
				return true
			}
			else{
				return false
			}
		}
		}
	})
	app.factory('sidebarService', function(){
		var openLeft = false;
		var openRight = false;
		return {
			toggle : function(side){
				switch(side){
					case "left":
						openLeft = !openLeft
						break;
					case "right":
						openRight = !openRight
						break;
				}
			},
			state : function(side){
				switch(side){
					case "left":
						return openLeft
					case "right":
						return openRight
				}
			}
		}
	})
	app.controller('sidebarCtrl', ['$scope','sidebarService', function($scope, sidebarService){
		$scope.state = function(side){
			return sidebarService.state(side)
		}
		$scope.toggle = function(side){
			sidebarService.toggle(side)
		}
	}])
	app.controller('appBarCtrl', ['$scope','sidebarService', function($scope, sidebarService){
		$scope.toggle = function(side){
			sidebarService.toggle(side)
		}
	}])
	app.controller('detailsCtrl', ['$scope', '$http','$routeParams', function($scope,$http,$routeParams){
		$http.get('/viajes/' + $routeParams.id).success(function(data){
			$scope.trip = data
		})
	}])
	app.controller('func2Ctrl', ['$scope', '$http','$routeParams', function($scope,$http,$routeParams){
		$http.get('/funcionario/' + $routeParams.id).success(function(data){
			$scope.func = data
			console.log('Si')
		})
	}])
	app.controller("tripsCtrl", ['$http', '$scope', 'tabService', 'compareService' , (function($http, $scope, tabService, compareService){
		$scope.isSelected = function(checkTab){
			return tabService.isSelected(checkTab)
		}
		$http.get("/search/viajes").success(function(data){
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
		$http.get("/search/funcionario").success(function(data){
			$scope.func = data;
		})
	}])
	app.controller('fTripsCtrl', ['$scope','$http', '$routeParams',function($scope, $http, $routeParams){
		$http.get('/funcionario/viajes/'+$routeParams.id).success(function(data){
			$scope.trips = data
		})
	}])
	app.controller('follow', ['$scope', '$http', function($scope, $http){
		$scope.tel = ""
		$scope.mail = ""
		$scope.name = ""
		$scope.follow = function(){
			console.log('entro');
			$http.post('/seguir', {telefono: tel, email: mail, nombre : name})
		}
	}])
	app.controller('modals', ['$scope','$modal' , function($scope, $modal){
		$scope.open = function(){
			$modal.open({
				templateUrl: "../views/modals.html",
	      controller: 'follow',
	      size:'lg'
	      })
		}
	}])
	app.controller('compareCtrl', ['$scope', 'compareService', function($scope, compareService){
		$scope.toggle = function(id){
			compareService.toggle(id)
		}
		$scope.isIn = function(id){
			compareService.isIn(id)
		}
	}])

})();