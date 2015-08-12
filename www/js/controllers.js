angular.module('ubille.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('CustomersCtrl', function($scope, Customers) {
  $scope.listCanSwipe = true;  
  $scope.customers = Customers.all();
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
  $scope.customer = Customers.get($stateParams.customerId);
})
/*
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})*/


.controller('productCtrl', function($scope, Product) {
  $scope.data = Product.all();    
  $scope.remove = function(data) {  
    Product.remove(data);
  };
})
.controller('productDetailCtrl', function($scope, $stateParams, Product) {	
  $scope.item = Product.get($stateParams.productNo);

})

.controller('salesOrderCtrl', function($scope, SalesOrder) {	
  $scope.data = SalesOrder.all();        
  $scope.remove = function(data) {  
    SalesOrder.remove(data);
  };
})
.controller('salesDetailCtrl', function($scope, $stateParams, SalesOrder) {  
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
});