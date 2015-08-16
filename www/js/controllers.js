angular.module('ubille.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('CustomersCtrl', function($scope, $log, Customers, $state) { 
	console.log($scope);
	$scope.$root.tabsHidden = "";
	Customers.all().then(function(data){
		$scope.customers = data;
		//console.log('CustomersCtrl2: ' + data);	 
	});
	 	
	$scope.remove = function(customer) {
		Customers.remove(customer);
	};  

	$scope.$root.addButton = function(){
		$state.go('tabs.customer-add');
	};
	$scope.$on('$stateChangeStart', function() {
		console.log('Customer stateChangeStart left ');
		$scope.$root.addButton = null;
	})
})
.controller('addCustomerCtrl', function($scope, $http, $location, Customers, $state) {	  	
	$scope.customer = {};
	$scope.addCustomerSubmit = function(){
		$scope.customer.accountname = $("input[name='Name']").val();
		$scope.customer.phone = $("input[name='phone']").val();
		$scope.customer.email1 = $("input[name='email1']").val();
		$scope.customer.Street = $("input[name='Street']").val();
		$scope.customer.City = $("input[name='City']").val();				
		$scope.customer.State = $('input[name="State"]').val();		
		$state.go('tabs.customers');
	};	
})
.controller('CustomerDetailCtrl', function($scope, $stateParams, $log, Customers) {	
	$scope.$root.tabsHidden = "tabs-item-hide";
	$scope.customer = Customers.get($stateParams.customerId);
	
	$scope.$root.addDetailButton = function($state){		
		$(".customerDetailShow").css("display","none");		
		$(".customerDetailEdit").css("display","block");		
	}
	
	$scope.submit = function($state){
		$scope.customer.email1 = $('input[name="Email"]').val();
		$scope.customer.phone = $('input[name="Phone"]').val();
		$scope.customer.bill_street = $('input[name="Street"]').val();
		$scope.customer.bill_city = $('input[name="City"]').val();
		$scope.customer.bill_state = $('input[name="State"]').val();
		$(".customerDetailShow").css("display","block");		
		$(".customerDetailEdit").css("display","none");
	}
	
	$scope.$on('$stateChangeStart', function() {
	console.log('CustomerDetailCtrl stateChangeStart left ');
	$scope.$root.addDetailButton = null;
	})
})

.controller('productCtrl', function($scope, Product) {
	$scope.$root.tabsHidden = "";
		Product.all().then(function(data){
			$scope.data = data;		
		});     
	$scope.remove = function(data) {  
		Product.remove(data);
	};
  
/*   	$scope.$root.addButton = function($state){
		alert("Product ADD");		
	}

	$scope.$on('$stateChangeStart', function() {
		console.log('Product stateChangeStart left ');
		$scope.$root.addButton = null;
	}) */
})
.controller('productDetailCtrl', function($scope, $stateParams, Product, $state, $ionicPopup) {	
  $scope.$root.tabsHidden = "tabs-item-hide"; 
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
	return $scope.item.itemQnt = itemQnt;
  }; 
  $scope.close = function(){			
		
  };  
 $('.button.button-small').click(function(){
	$('.button.button-small').removeClass('radio-icon ion-checkmark');
    $(this).addClass('radio-icon ion-checkmark');
});
  $scope.cart = function(){
  $scope.item.itemQnt = $('.itemQnt').val();  
	if($scope.item.itemQnt == undefined || $scope.item.itemQnt == "select"){	
		var popup = $ionicPopup.alert({
			title : "Alert",
			template : "Please Check Quantity"
		});		
		return false;
	}else{		
		var popup = $ionicPopup.alert({			
			title : "Ubille Cart",
			scope : $scope,
			template :									
				"<ion-list id='idx'><ion-item class='item-thumbnail-left item-remove-animate item-icon-right' type='item-text-wrap'>"+			
				"<img ng-src=http://crm.biztechus.com/"+$scope.item.path+$scope.item.attachmentsid+'_'+$scope.item.name+">"+
				"Product Name : "+$scope.item.productname+"<br>"+
				"Price : $"+$scope.item.unit_price+"<br>"+
				"Quantity : "+$scope.item.itemQnt+"<br>"+
				"SubTotal : $"+$scope.item.unit_price*$scope.item.itemQnt+"<br>"+
				"<i class='ion-close-round' ng-click='close()'></i>"+
				"</ion-item></ion-list><p>"+window.localStorage["keep"]+"</p>",
				
			buttons : [
				{text : 'Keep Shopping',
				 onTap : function (e){			 											  				
				window.localStorage["keep"] += "<ion-item class='item-thumbnail-left item-remove-animate item-icon-right' type='item-text-wrap'>"+			
				"<img src=http://crm.biztechus.com/"+$scope.item.path+$scope.item.attachmentsid+'_'+$scope.item.name+">"+
				"Product Name : "+$scope.item.productname+"<br>"+
				"Price : $"+$scope.item.unit_price+"<br>"+
				"Quantity : "+$scope.item.itemQnt+"<br>"+
				"SubTotal : $"+$scope.item.unit_price*$scope.item.itemQnt+"<br>"+
				"<i class='ion-close-round' ng-click='close()'></i>"+
				"</ion-item>";
				$state.go('tabs.product');				
				}},
				{text : 'Check Out',
				 type : 'button-assertive',
				 onTap : function(e){
					delete window.localStorage["keep"];
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
/* 	$scope.$root.addButton = function($state){
		alert("SalesOrder ADD");		
	}

	$scope.$on('$stateChangeStart', function() {
	console.log('SalesOrder stateChangeStart left ');
	$scope.$root.addButton = null;
	}) */
})
.controller('salesDetailCtrl', function($scope, $stateParams, SalesOrder) { 
	$scope.$root.tabsHidden = "tabs-item-hide"; 
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


