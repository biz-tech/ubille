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
	Product.all().then(function(data){
		$scope.data = data;		
	});     
  $scope.remove = function(data) {  
    Product.remove(data);
  };
})
.controller('productDetailCtrl', function($scope, $stateParams, Product, $state, $ionicPopup) {	
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
$scope.selectedVal = function(itemQnt){
	return $scope.itemQnt = itemQnt;
  }; 
  $scope.close = function(){			
		var click_id = $(this).attr('id');
		alert(click_id);
  };  
  $scope.cart = function(){
	if($scope.itemQnt == undefined || $scope.itemQnt == "select"){
		var popup = $ionicPopup.alert({
			title : "Alert",
			template : "Please Check Quantity"
		});		
		return false;
	}else{		
		var popup = $ionicPopup.alert({			
			title : "My Cart",
			scope : $scope,
			template :									
				"<ion-list id='idx'><ion-item class='item-thumbnail-left item-remove-animate item-icon-right' type='item-text-wrap'>"+			
				"<img src=http://crm.biztechus.com/"+$scope.item.path+$scope.item.attachmentsid+'_'+$scope.item.name+">"+
				"Product Name : "+$scope.item.productname+"<br>"+
				"Price : $"+$scope.item.unit_price+"<br>"+
				"Quantity : "+$scope.itemQnt+"<br>"+
				"SubTotal : $"+$scope.item.unit_price*$scope.itemQnt+"<br>"+
				"<i class='ion-close-round' ng-click='close()'></i>"+
				"</ion-item>"+window.localStorage["keep"]+"</ion-list>",
				
			buttons : [
				{text : 'Keep Shoping',
				 onTap : function (e){			 											  				
				window.localStorage["keep"] += "<ion-item class='item-thumbnail-left item-remove-animate item-icon-right' type='item-text-wrap'>"+			
				"<img src=http://crm.biztechus.com/"+$scope.item.path+$scope.item.attachmentsid+'_'+$scope.item.name+">"+
				"Product Name : "+$scope.item.productname+"<br>"+
				"Price : $"+$scope.item.unit_price+"<br>"+
				"Quantity : "+$scope.itemQnt+"<br>"+
				"SubTotal : $"+$scope.item.unit_price*$scope.itemQnt+"<br>"+
				"<i class='ion-close-round' ng-click='close()'></i>"+
				"</ion-item>";								
				}},
				{text : 'Check Out',
				 type : 'button-assertive',
				 onTap : function(e){
					delete window.localStorage["keep"]
					$state.go('tabs.product');
				 }}				
			]	
		});
	}
  };
})

.controller('salesOrderCtrl', function($scope, SalesOrder) {	
  $scope.$root.tabsHidden = "";
  SalesOrder.all().then(function(data){
		$scope.data = data;		
	});        
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