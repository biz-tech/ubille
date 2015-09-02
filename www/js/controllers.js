angular.module('ubille.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('CustomersCtrl', function($scope, $log, Customers, $state) { 	
	$scope.$root.tabsHidden = "";
	Customers.all().then(function(data){
		$scope.customers = data;		
	});	
	
	$(".selectAccount").change(function(){
		var indexCombo = selectAccount.options[selectAccount.selectedIndex].index;
		var accEmail = $scope.customers[indexCombo].email1;
		$(".salesOrderEmail").val(accEmail);
		
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
  $scope.close = function(index){			
		$scope.salesorder.items.splice(this.$index, 1);		
  };  
 $('.button.button-small').click(function(){
	$('.button.button-small').removeClass('radio-icon ion-checkmark');
    $(this).addClass('radio-icon ion-checkmark');
});  
  $scope.cart = function(){
  $scope.item.itemQnt = $('.itemQnt').val();
  /*
  var tax1 = $scope.item.taxinfo.split(',')[0]; // VAT : Price
  var tax2 = $scope.item.taxinfo.split(',')[1]; // Sales : Price
  var taxVat1 = tax1.split(':')[0]; // VAT
  var taxVat2 = tax1.split(':')[1]; // Price
  var taxSales1 = tax2.split(':')[0]; // Sales
  var taxSales2 = tax2.split(':')[1]; // Prive
  */
	
   $scope.salesorder.items.push({		
		product_no : $scope.item.product_no,
        itemQnt: $scope.item.itemQnt,
        productname : $scope.item.productname,
        unit_price: $scope.item.unit_price,
		path : $scope.item.path,
		name : $scope.item.name,
		attachmentsid : $scope.item.attachmentsid,		
		taxSales : $scope.item.percentage		
  });
  
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
			templateUrl :
				"templates/cart.html"
				,				
			buttons : [
				{text : 'Keep Shopping',
				 onTap : function (e){									
						
				$state.go('tabs.product');				
				}},
				{text : 'Check Out',
				 type : 'button-assertive',
				 onTap : function(e){	
					
					$state.go('tabs.salesOrder-add');
				 }}				
			]	
		});
	}
  };

})
.controller('salesOrderCtrl', function($scope, SalesOrder, $state) {	
	$scope.$root.tabsHidden = "";
		SalesOrder.all().then(function(data){
			$scope.data = data;		
			console.log(data);
		});        
	$scope.remove = function(data) {  
		SalesOrder.remove(data);
	};
 	$scope.$root.addButton = function(){
		$state.go('tabs.salesOrder-add');	
	}

	$scope.$on('$stateChangeStart', function() {
	console.log('SalesOrder stateChangeStart left ');
	$scope.$root.addButton = null;
	}) 
})
.controller('salesDetailCtrl', function($scope, $stateParams, SalesOrder) { 
	$scope.$root.tabsHidden = "tabs-item-hide"; 
	$scope.item = SalesOrder.get($stateParams.salesorderNo);      

})
.controller('addSalesOrderCtrl', function($scope, $http, $location, Customers, $state, Product) {
	Product.all().then(function(data){
		$scope.data = data;				
	});	
	$(".selectAccount").change(function(){
		if($(".selectAccount option:selected").text() == "Add Company"){
			$state.go('tabs.customer-add');
		}
	});
	
	var total = 0;	
	var sales = 0;
	for(i=0;i<$scope.salesorder.items.length;i++){
		var sum = $scope.salesorder.items[i].itemQnt * $scope.salesorder.items[i].unit_price;					
		var sumTaxSales = $scope.salesorder.items[i].itemQnt * $scope.salesorder.items[i].unit_price * ($scope.salesorder.items[i].taxSales * 0.01);
		var tax = $scope.salesorder.items[i].taxSales;
		total += sum;					
		sales += sumTaxSales;
	};	
	
	$scope.total = total	
	$scope.sales = sales;
	$scope.tax = tax;
	
	$('.discountPrice').bind('blur',function(){		
			if($("input:radio[name='discount']:checked").val()=="per"){
				var dcPrice = $('.discountPrice').val();
				$scope.discount = total * (dcPrice * 0.01);
			}else{
				var dcPrice = $('.discountPrice').val();
				$scope.discount = dcPrice;
			}
		
	});
	
	$scope.close = function(index){			
		$scope.salesorder.items.splice(this.$index, 1);		
		$scope.total -= this.item.unit_price;
	}; 	
	$scope.addSalesOrderSubmit = function(){
		if($(".selectAccount option:selected").text() == " -- select -- "){
			alert("choose company");
			
		}
	}
})
.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  /*
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };*/
  $scope.salesorder = {
	items:[{
		product_no : '',
		itemQnt : '',
        productname : '',
        unit_price : '',
		path : '',
		name : '',
		attachmentsid : '',		
		taxSales : ''
	}]
  };
  
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


