var path = "http://crm.biztechus.com";
var test = "http://172.20.10.205/vtigercrm";
var params = location.search.split('&')[1]; // list 화면에서 클릭한 값을 담아서 detail 조회할때 사용.

angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('search', {
      url: '/search',
      templateUrl: 'templates/search.html'
    })
    .state('settings', {
      url: '/settings',
      templateUrl: 'templates/settings.html'
    })
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
	// side menu start
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/home.html",
          controller: 'HomeTabCtrl'
        }
      }
    })
    .state('tabs.facts', {
      url: "/facts",
      views: {
        'home-tab': {
          templateUrl: "templates/facts.html"
        }
      }
    })
    .state('tabs.facts2', {
      url: "/facts2",
      views: {
        'home-tab': {
          templateUrl: "templates/facts2.html"
        }
      }
    })
	// side menu end
	
    .state('tabs.product', {
      url: "/product",
      views: {
        'product-tab': {
          templateUrl: "templates/product.html"
        }
      }
    })
    .state('tabs.navstack', {
      url: "/navstack",
      views: {
        'about-tab': {
          templateUrl: "templates/nav-stack.html"
        }
      }
    })
    .state('tabs.customer', {
      url: "/customer",
      views: {
        'customer-tab': {
          templateUrl: "templates/customer.html"		  	  
        }
      }
    })
	.state('tabs.salesOrder', {
      url: "/salesOrder",
      views: {
        'salesOrder-tab': {
          templateUrl: "templates/salesOrder.html"
        }
      }
    })
	.state('tabs.accDetail', {
      url: "/accDetail",
      views: {
        'customer-tab': {
          templateUrl: "templates/accDetail.html"
        }
      }
    })
	;

   $urlRouterProvider.otherwise("/tab/home");

})
.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };
})
.controller('HomeTabCtrl', function($scope) {
})
.controller('orderCtrl', function($scope, $http) {
var site= test+"/testdata.php?oper=order";		
	$http.get(site).success(function(response){
		$scope.data = response;		
	});
})
.controller('productCtrl', function($scope, $http) {
//var site= path+"/testdata.php?oper=product";
	var site= test+"/testdata.php?oper=product";		
	$http.get(site).success(function(response){
		$scope.data = response;
	});
})
.controller('accountCtrl', function($scope, $http) {
	//var site= path+"/testdata.php?oper=acoount";
	var site= path+"/testdata.php?oper=acoount";	
	$http.get(site).success(function(response){	
		$scope.data = response;			
	});	
})
.controller('accDetailCtrl', function($scope, $http) {
	//var site= path+"/testdata.php?oper=accountDetail&"+params;	
	var site= test+"/testdata.php?oper=accountDetail&"+params;	
	$http.get(site).success(function(response){	
		$scope.data = response;				
		$scope.movePage = function(){
			$scope
		}
	}); 
})
; 