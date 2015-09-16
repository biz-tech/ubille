angular.module('ubille.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('CustomersCtrl', function($scope, $log, Customers, $state, $ionicPopup,$ionicModal, $rootScope) { 		
	$scope.$root.tabsHidden = "";
		
	Customers.all().then(function(data){
		$scope.customers = data;		
	});					
	/*
	$scope.noMoreItemsAvailable = false;
	$scope.loadMore = function() {
		$scope.customers.push({ id: $scope.customers.length});
		
		if ( $scope.customers.length == 24 ) {
		$scope.noMoreItemsAvailable = true;
		}
		
		$scope.$broadcast('scroll.infiniteScrollComplete');
	};
	$scope.customers = [];
	*/
	$scope.click = function(item){						
		$("input:text[name='accountname']").val(item.accountname);
		$("input:text[name='email']").val(item.email1);
		$(".selectAccount").show();
		$(".atferSelect").text(item.accountname);					
		$(".selectAccount").val(2);						
		$scope.modal.hide();
		$rootScope.accountName = item.accountname;
		$rootScope.accountStreet = item.bill_street;
		$rootScope.accountCity = item.bill_city;
		$rootScope.accountState = item.bill_state;
	}
	
	$scope.remove = function(customer) {
		Customers.remove(customer);
	};  

	$scope.$root.addButton = function(){
		$state.go('tabs.customer-add');		
	};
	$scope.$on('$stateChangeStart', function() {
		console.log('Customer stateChangeStart left ');
		$scope.$root.addButton = null;
	});	
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
  	
   $scope.salesorder.items.push({		
		product_no : $scope.item.product_no,
        itemQnt: $scope.item.itemQnt,
        productname : $scope.item.productname,
        unit_price: $scope.item.unit_price,
		path : $scope.item.path,
		name : $scope.item.name,
		attachmentsid : $scope.item.attachmentsid,		
		taxSales : $scope.item.percentage,
		total : $scope.item.itemQnt * $scope.item.unit_price
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
.controller('addSalesOrderCtrl', function($scope, Customers, $state, Product, $window, $ionicModal, ReportSvc, $rootScope) {
	Product.all().then(function(data){
		$scope.data = data;				
	});	
	$(".selectAccount").change(function(){
		if($(".selectAccount option:selected").text() == "Add Company"){
			$state.go('tabs.customer-add');
		}
	}); 
		
	$(".selectAccount").click(function(){	
		$(".selectAccount").hide();
	});	
	$ionicModal.fromTemplateUrl('templates/selectCompany.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});
  
	$scope.createContact = function(u) {        
		$scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
		$scope.modal.hide();
	};
	
	var total = 0;	
	var sales = 0;
	for(i=0;i<$scope.salesorder.items.length;i++){
		var sum = $scope.salesorder.items[i].itemQnt * $scope.salesorder.items[i].unit_price;							
		var sumTaxSales = $scope.salesorder.items[i].itemQnt * $scope.salesorder.items[i].unit_price * ($scope.salesorder.items[i].taxSales * 0.01);
		var tax = $scope.salesorder.items[i].taxSales;
		total += sum;					
		sales += sumTaxSales;
	};	
	
	$scope.total = total.toFixed(2);	
	$scope.sales = sales.toFixed(2);	
	$scope.tax = tax;
	
	$('.discountPrice').bind('blur',function(){		
		if($("input:radio[name='discount']:checked").val()=="per"){
			var dcPricePer = $('.discountPrice').val();
			$scope.discount = $scope.total - $scope.total * (dcPricePer * 0.01);							
			$scope.dcKind = "per";
		}else{
			var dcPriceAmt = $('.discountPrice').val();
			$scope.discount = $scope.total - dcPriceAmt;							
			$scope.dcKind = "amt";
		}	
		$('.item.dcPrice>div').text("$"+$scope.discount.toFixed(2));		
	});
	
	$scope.close = function(index){			
		$scope.salesorder.items.splice(this.$index, 1);		
		var totalTmp = $scope.total - this.item.unit_price;
		$scope.total = totalTmp.toFixed(2);
		var salesTmp = $scope.sales - this.item.itemQnt * this.item.unit_price * this.item.taxSales * 0.01;
		$scope.sales = salesTmp.toFixed(2);		
	}; 		
	$scope.addSalesOrderSubmit = function(){
		if($(".selectAccount option:selected").text() == " -- select -- "){
			alert("choose company");
			window.event.returnValue = false;			 
		}else{		
			var pdNo = $(".productNo").text();			
			$("input[name='productNo']").val(pdNo+',');	

			var qty = $(".qty").text();			
			$("input[name='qty']").val(qty+',');
			
			/* pdf 내용에 들어가는 정보들 */
			if($('.discountPrice').text() != '' || $('.discountPrice').val() != 'undefined'){								
				$scope.dcPrice = $('.discountPrice').val(); 
			}else{
				$('.discountPrice').val('0'); 
				$scope.dcPrice = "0";
			}
			
			$rootScope.items = $scope.salesorder.items;
			$rootScope.total = $scope.total; // 주문한 물품의 총 가격 (세전)
			$rootScope.sales = $scope.sales; // 주문가격에 대한 총 세금 
			$rootScope.tax = $scope.tax; // 물품의 세금			
			var dcFixed = Number($scope.discount.toFixed(2));			
			var grandTot = parseFloat(dcFixed) + parseFloat($scope.sales);			
			$rootScope.grandTotal = grandTot.toFixed(2); // 총 가격 + 세금
			$rootScope.discount = dcFixed.toFixed(2); // 할인 적용 가격	
			
			if($scope.dcKind == "per"){
				$rootScope.dcPrice = $('.discountPrice').val()+"%";
			}else{
				$rootScope.dcPrice = "$"+$('.discountPrice').val();
			}
			
			//if no cordova, then running in browser and need to use dataURL and iframe
				if (!window.cordova) {				
					ReportSvc.runReportDataURL( {},{} )
						.then(function(dataURL) {
							//set the iframe source to the dataURL created
							console.log('report run in browser using dataURL and iframe');
							//document.getElementById('pdfImage').src = dataURL;
						});
					return true;
				}
				//if codrova, then running in device/emulator and able to save file and open w/ InAppBrowser
				else {					
					ReportSvc.runReportAsync( {},{} )
						.then(function(filePath) {
							function convertImgToBase64URL(url, callback, outputFormat){
								var img = new Image();
								img.crossOrigin = 'Anonymous';
								img.onload = function(){
									var canvas = document.createElement('CANVAS'),
									ctx = canvas.getContext('2d'), dataURL;
									canvas.height = this.height;
									canvas.width = this.width;
									ctx.drawImage(this, 0, 0);
									dataURL = canvas.toDataURL(outputFormat);
									callback(dataURL);
									canvas = null; 
								};
								img.src = url;
							}
							convertImgToBase64URL('../img/logo.png', function(base64Img){
								var base64 = base64Img; //이미지를 base64로 인코딩								
							});		
							//log the file location for debugging and oopen with inappbrowser
							//console.log('report run on device using File plugin');
							//console.log('ReportCtrl: Opening PDF File (' + filePath + ')');
							window.open(filePath, '_blank', 'location=no,closebuttoncaption=Close,enableViewportScale=yes');							
							window.plugin.email.open({
								to:      [$("input:text[name='email']").val()],                             
								subject: 'sales order invioce',
								body:    'Hello, Thank you for sales order invoice. We will contact you soon regarding sales order.',
								isHTML: false,
								attachments: [filePath],
								app:'gmail'
							});
						});
					return true;
				}								
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
		taxSales : '',
		total : ''
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


