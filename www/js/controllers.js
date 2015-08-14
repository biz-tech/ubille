angular.module('ubille.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('CustomersCtrl', function($scope, Customers) { 
	$scope.$root.tabsHidden = "";
	Customers.all().then(function(data){
		$scope.customers = data;
		//console.log('CustomersCtrl2: ' + data);	 
	});
	 	
	$scope.remove = function(customer) {
		Customers.remove(customer);
	};  

})
.controller('addCustomerCtrl', function($scope, $http, $location) {	
  $('.submit').click(function(){
	console.log("submit");
  });
})
.controller('CustomerDetailCtrl', function($scope, $stateParams, Customers) {	
	$scope.$root.tabsHidden = "tabs-hide";
	$scope.customer = Customers.get($stateParams.customerId);
})

.controller('productCtrl', function($scope, Product) {
  $scope.$root.tabsHidden = "";
  $scope.data = Product.all();    
  $scope.remove = function(data) {  
    Product.remove(data);
  };
})
.controller('productDetailCtrl', function($scope, $stateParams, Product, $state) {	
  $scope.$root.tabsHidden = "tabs-hide";
  $scope.item = Product.get($stateParams.productNo);
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = group;
    } else {
      $scope.shownGroup = null;
    }
  };  
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === null;
  };  
})

.controller('salesOrderCtrl', function($scope, SalesOrder) {	
  $scope.$root.tabsHidden = "";
  $scope.data = SalesOrder.all();        
  $scope.remove = function(data) {  
    SalesOrder.remove(data);
  };
})
.controller('salesDetailCtrl', function($scope, $stateParams, SalesOrder) { 
  $scope.$root.tabsHidden = "tabs-hide"; 
  $scope.item = SalesOrder.get($stateParams.salesorderNo);      
})

.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  /*
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };*/
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };
})
.controller('HomeTabCtrl', function($scope) {
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.directive('hideTabs', function($rootScope) {
  return {
    restrict: 'A',
    link: function($scope, $el) {
      $scope.$on("$ionicView.beforeEnter", function () {
        $rootScope.hideTabs = true;
      });
      $scope.$on("$ionicView.beforeLeave", function () {
        $rootScope.hideTabs = false;
      });
    }
  };
});