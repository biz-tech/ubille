angular.module('ubille.controllers', [])

.controller('DashCtrl', function($scope) {})
 
.controller('loginCtrl', function($scope, $http, $state, $window, User) {			
	$('.logout').click(function(){
		window.sessionStorage.clear();		
	});
	var session = window.sessionStorage.user;		
	if(session != null && session != 'empty' && session != 'undefined'){			
		$state.go('tabs.home');
	}else{	
		$scope.data = {}; 			
		$scope.login = function(){	
			if($scope.data.email == undefined){
				alert("please input login information");
				return false;
			}else{			
				//var link = 'http://crm.biztechus.com/ubilledata.php?oper=login';
				var link = 'http://crm.biztechus.com/ubilleNewData.php?oper=login';
				$http.post(link, {email : $scope.data.email, password : $scope.data.password }).then(function (res){			
					if(res.data != ''){
						$scope.response = res.data;
						window.sessionStorage.user = JSON.stringify(res.data);													
						var now = new Date().getTime();
						var setupTime = sessionStorage.getItem('setupTime');
						if (setupTime == null) {
							sessionStorage.setItem('setupTime', now);						
						} 																				
						$state.go('tabs.home');						
					}else{
						alert("Invalid Information");				
					}			
				});
			}
		};
		// 비로그인 상태일때 메뉴 비활성화.
		if(window.sessionStorage.user == undefined){	
			$scope.$root.cartList = null;
			$('.logoutDisabled a').css('background','lightgray');			
			$('.logoutDisabled a').click(function(){
				alert("You Should Login");
				return false;
			});				
		}			
	}	
	//이메일 자동완성을 위해서 가져온 정보. 미구현.
	User.all().then(function(data){
		$scope.users = data;		
	});
	
	
	
})
.controller('CustomersCtrl', function($scope, $log, Customers, $state, $ionicPopup, $rootScope, $ionicLoading) { 	
	var now = new Date().getTime();	
	if(sessionStorage != null){
		sessionStorage.setItem('setupTime', now);	
	}else{
		$state.go('login');
	}						
		
	// 하단 tabs menu show
	$scope.$root.tabsHidden = "";
	$ionicLoading.show({
		template: 'Loading...'
	});
	// customer data load
	Customers.all().then(function(data){
		$scope.customers = data;	
		$ionicLoading.hide();
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
	
	// company list delete 
	$scope.remove = function(customer) {
		Customers.remove(customer);
	};  

	// company add button 
	$scope.$root.addButton = function(){
		$state.go('tabs.customer-add');		
	};
	
	// addbutton을 눌렀을 때 상태 변화
	$scope.$on('$stateChangeStart', function() {
		console.log('Customer stateChangeStart left ');
		$scope.$root.addButton = null;
	});	
	
	// cart list 화면에서 select company 할때 사용.
	$scope.click = function(item){			
		$("input:text[name='accountname']").val(item.accountname);
		$("input:text[name='accountid']").val(item.accountid);
		$("input:text[name='email']").val(item.email1);
		$(".selectAccount").show();
		$(".atferSelect").text(item.accountname);					
		$(".selectAccount").val(2);						
		$scope.modal.hide();
		$rootScope.accountName = item.accountname;
		$rootScope.accountStreet = item.bill_street;
		$rootScope.accountCity = item.bill_city;
		$rootScope.accountState = item.bill_state;
	};
})
.controller('addCustomerCtrl', function($scope, $state) {
	var now = new Date().getTime();
	if(sessionStorage != null){
		sessionStorage.setItem('setupTime', now);	
	}else{
		$state.go('login');
	}	
	// add company 화면
	$("input[name='user_id']").val(JSON.parse(sessionStorage.user)[0].id);	
	$("input[name='curl']").val(document.URL);
	
	$scope.customer = {};
	$scope.addCustomerSubmit = function(){				
		$state.go('tabs.home');
	};		
})
.controller('CustomerDetailCtrl', function($scope, $stateParams, $log, Customers) {
	var now = new Date().getTime();
	if(sessionStorage != null){
		sessionStorage.setItem('setupTime', now);	
	}else{
		$state.go('login');
	}	
	// company detail 화면 
	// 하단 tab menu 숨김
	$scope.$root.tabsHidden = "tabs-item-hide";
	// customer id와 일치하는 정보 가져옴.
	$scope.customer = Customers.get($stateParams.customerId);
	$('input[name="acc_id"]').val($stateParams.customerId);
	$("input[name='curl']").val(document.URL);
	// edit button
	$scope.$root.addDetailButton = function($state){		
		$(".customerDetailShow").css("display","none");		
		$(".customerDetailEdit").css("display","block");

		$('input[name="Email"]').val($('input[name="Email"]').attr('placeholder'));
		$('input[name="Phone"]').val($('input[name="Phone"]').attr('placeholder'));
		$('input[name="Street"]').val($('input[name="Street"]').attr('placeholder'));
		$('input[name="City"]').val($('input[name="City"]').attr('placeholder'));
		$('input[name="State"]').val($('input[name="State"]').attr('placeholder'));
	}
	
	// submit.
	$scope.submit = function($state){		
		$scope.customer.email1 = $('input[name="Email"]').val();
		$scope.customer.phone = $('input[name="Phone"]').val();
		$scope.customer.bill_street = $('input[name="Street"]').val();
		$scope.customer.bill_city = $('input[name="City"]').val();
		$scope.customer.bill_state = $('input[name="State"]').val();
		$(".customerDetailShow").css("display","block");		
		$(".customerDetailEdit").css("display","none");
		$state.go('tabs.home');
	// edit 클릭 했을 때 상태 변화.
	$scope.$on('$stateChangeStart', function() {
		console.log('CustomerDetailCtrl stateChangeStart left ');
		$scope.$root.addDetailButton = null;
	})
}
})

.controller('productCtrl', function($scope, Product, $ionicLoading, ProductColor) {
	var now = new Date().getTime();
	if(sessionStorage != null){
		sessionStorage.setItem('setupTime', now);	
	}else{
		$state.go('login');
	}
	// product list
	// tab menu show
	$scope.$root.tabsHidden = "";
	$ionicLoading.show({
		template: 'Loading...'
	});
	// product data 
	Product.all().then(function(data){
		$scope.data = data;		
		$ionicLoading.hide();
	});
	ProductColor.all();	
	/*
	$scope.remove = function(data) {  
		Product.remove(data);
	};
	  
   	$scope.$root.addButton = function($state){
		alert("Product ADD");		
	}

	$scope.$on('$stateChangeStart', function() {
		console.log('Product stateChangeStart left ');
		$scope.$root.addButton = null;
	}) */	
})
.controller('productDetailCtrl', function($scope, $stateParams, Product, $state, $ionicPopup, $ionicModal, ProductColor) {	
	var now = new Date().getTime();
	if(sessionStorage != null){
		sessionStorage.setItem('setupTime', now);	
	}else{
		$state.go('login');
	}
	$scope.$root.tabsHidden = "tabs-item-hide"; 
	$scope.item = Product.get($stateParams.productNo);	
	$scope.color = ProductColor.get($stateParams.productNo);
	
	// product detail toggle
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
	
	//quantity 선택값을 저장.
	$scope.selectedVal = function(itemQnt){
		return $scope.item.itemQnt = itemQnt;
	}; 	
	
	// cart에 담긴 item을 삭제할때 사용.
	$scope.close = function(index){			
			$scope.salesorder.items.splice(this.$index, 1);		
	};
	
	// select color pattern 
	$scope.selectPattern = function(a){			
	$('.color').removeClass('lightgray');
	$('.'+a).parent('.color').toggleClass('lightgray');	
		for(i=0;i<$scope.color.length;i++){
			if($scope.color[i].color_id == a){
				var pattern = "";
				pattern = $scope.color[i];				
				$scope.item.color = pattern.color_id;
				$scope.item.colorName = pattern.color_name;				
			}
		}
	}
	
	// add to cart 눌렀을 때.
	$scope.cart = function(){
		// 선택한 수량을 저장.
		$scope.item.itemQnt = $('.itemQnt').val();		
		
		// add cart 누를 때 마다 $scope.salesorder.item 에 저장.
		$scope.salesorder.items.push({		
			product_no : $scope.item.product_no,
			itemQnt: $scope.item.itemQnt,
			productname : $scope.item.productname,
			unit_price: $scope.item.unit_price,			
			path : $scope.item.pic1,
			name : $scope.item.pic2,
			color : $scope.item.color,
			colorName : $scope.item.colorName,			 
			user_id : JSON.parse(sessionStorage.user)[0].id,
			taxSales : JSON.parse(sessionStorage.user)[0].usertax,			
			total : $scope.item.itemQnt * $scope.item.unit_price
		});		
		
		console.log($scope.salesorder.items);
		// add cart 누를 때 수량선택이 안되어 있으면
		if($scope.item.itemQnt == undefined || $scope.item.itemQnt == "select"){	
			var popup = $ionicPopup.alert({
				title : "Alert",
				template : "Please Check Quantity"
			});		
			return false;
		}else{		
			// 수량선택이 되어 있고 add cart 누르면 checkout 팝업.
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
						$state.go('#/cartList');
						$('.cartBadge').addClass('badge badge-assertive');
						$('.cartBadge').text($scope.salesorder.items.length-1);
						
					}}				
				]	
			});
		}
	};

})
.controller('salesOrderCtrl', function($scope, SalesOrder, $state, $ionicLoading) {	
	var now = new Date().getTime();
	if(sessionStorage != null){
		sessionStorage.setItem('setupTime', now);	
	}else{
		$state.go('login');
	}
	$scope.$root.tabsHidden = "";
	
	$ionicLoading.show({
		template: 'Loading...'
	});
	
	SalesOrder.all().then(function(dataList){		
		$scope.data = dataList;			
		$ionicLoading.hide();				
	});        
	$scope.remove = function(data) {  
		SalesOrder.remove(data);
	};
	/*
 	$scope.$root.addButton = function(){
		$state.go('tabs.salesOrder-add');	
	}*/

	$scope.$on('$stateChangeStart', function() {
		console.log('SalesOrder stateChangeStart left ');
		$scope.$root.addButton = null;
	}) 	
})
.controller('salesDetailCtrl', function($scope, $stateParams, SalesOrder, $http) { 
	var now = new Date().getTime();
	if(sessionStorage != null){
		sessionStorage.setItem('setupTime', now);	
	}else{
		$state.go('login');
	}	
	$scope.$root.tabsHidden = "tabs-item-hide"; 	
	$scope.item = SalesOrder.get($stateParams.salesorderNo); 
	console.log($scope.item);
	$scope.subtotal = $scope.item[0].subtotal;
	$scope.total = $scope.item[0].total;
	
	$('.createInvoiceBtn').click(function(){
	console.log($scope.item);
		var link = 'http://crm.biztechus.com/ubilleNewData.php?oper=createInvoiceHead';
				$http.post(link, {
						accountid : $scope.item[0].customer_id, 
						afterDc : $scope.item.subtotal, 
						discountPrice : $scope.item[0].subtotal,
						tax : $scope.item[0].tax, 
						discount : $scope.item[0].discount, 
						subtotal : $scope.item[0].listprice,
						total : $scope.item[0].total,
						user_id : $scope.item[0].user_id, 
						color : $scope.item.color}
					).then(function (res){					
					var link = 'http://crm.biztechus.com/ubilleNewData.php?oper=createInvoiceDetail';
					$http.post(link, $scope.item).then(function (res){										
			});		
		});					
	});
})
.controller('invoiceCtrl', function($scope, invoice, $state, $ionicLoading) {	
	var now = new Date().getTime();
	if(sessionStorage != null){
		sessionStorage.setItem('setupTime', now);	
	}else{
		$state.go('login');
	}
	$scope.$root.tabsHidden = "";
	
	$ionicLoading.show({
		template: 'Loading...'
	});
	
	invoice.all().then(function(dataList){		
		$scope.data = dataList;		
		console.log($scope.data);
		$ionicLoading.hide();				
	});        
	$scope.remove = function(data) {  
		SalesOrder.remove(data);
	};
	/*
 	$scope.$root.addButton = function(){
		$state.go('tabs.salesOrder-add');	
	}*/

	$scope.$on('$stateChangeStart', function() {
		console.log('SalesOrder stateChangeStart left ');
		$scope.$root.addButton = null;
	}) 	
})
.controller('invoiceDetailCtrl', function($scope, $stateParams, invoice) { 
	var now = new Date().getTime();
	if(sessionStorage != null){
		sessionStorage.setItem('setupTime', now);	
	}else{
		$state.go('login');
	}	
	$scope.$root.tabsHidden = "tabs-item-hide"; 	
	$scope.item = invoice.get($stateParams.salesorderNo); 		
	$scope.subtotal = $scope.item[0].subtotal;
	$scope.total = $scope.item[0].total;
})
.controller('addSalesOrderCtrl', function($scope, Customers, $state, Product, $window, $ionicModal, ReportSvc, $rootScope, $http) {		
	var now = new Date().getTime();
	if(sessionStorage != null){
		sessionStorage.setItem('setupTime', now);	
	}else{
		$state.go('login');
	}
	
	Product.all().then(function(data){
		$scope.data = data;				
	});	
	
	// select company 누르면 modal 창을 띄우기 위해 combobox 를 숨김.	
	$(".selectAccount").click(function(){	
		$(".selectAccount").hide();
	});	
	// modal template url
	$ionicModal.fromTemplateUrl('templates/selectCompany.html', {
		scope: $scope				
	}).then(function(modal) {		
		$scope.modal = modal;		
	});
	// default value of discount price
	$('.discountPrice').val(0);
	
	// 물품 가격과 세금 그리고 할인 가격을 계산.
	var total = 0;	
	var sales = 0;  	
	for(i=0;i<$scope.salesorder.items.length;i++){
		var sum = $scope.salesorder.items[i].itemQnt * $scope.salesorder.items[i].unit_price;							
		var sumTaxSales = $scope.salesorder.items[i].itemQnt * $scope.salesorder.items[i].unit_price * ($scope.salesorder.items[i].taxSales * 0.01);		
		var tax = $scope.salesorder.items[i].taxSales;
		total += sum;					
		sales += sumTaxSales;		
	};		
	$scope.total = total.toFixed(2);				// 선택된 물품의 급액의 합  (세전)
	$scope.sales = sales.toFixed(2);				// 선택된 물품의 세금의 합	
	$scope.tax = tax; 								// 세금비율(8%, 12% ... )
	$('.item.dcPrice>div').text("$"+$scope.total); 	// default pretax value 를 넣어준다.
	$scope.discount = $scope.total;					// 할인된 가격이 저장 될 곳.
	
	// discount 금액을 입력후 focus out 되면 자동 계산.
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
	
	// 물품 삭제시 자동 계산.
	$scope.close = function(index){			
		$scope.salesorder.items.splice(this.$index, 1);		
		var totalTmp = $scope.total - this.item.unit_price;
		$scope.total = totalTmp.toFixed(2);
		$('.item.dcPrice>div').text("$"+$scope.total);
		var salesTmp = $scope.sales - this.item.itemQnt * this.item.unit_price * this.item.taxSales * 0.01;
		$scope.sales = salesTmp.toFixed(2);		
		$('.cartBadge').text($scope.salesorder.items.length-1); // cart badge count -1 
		if($('.cartBadge').text() == 0){
			$('.cartBadge').text('');
		}
	}; 		
	
	//submit 눌렀을 때.
	$scope.addSalesOrderSubmit = function(){
		if($scope.salesorder.items.length == 0){
			alert("No Product");
			return false;
		}
		//카트 badge count 삭제
		$('.cartBadge').text('');
		// select company 확인.
		if($(".selectAccount option:selected").text() == " -- select -- "){
			alert("choose company");
			window.event.returnValue = false;			 
		}else{		
			// 물품 넘버 저장.
			var pdNo = $(".productNo").text();			
			$("input[name='productNo']").val(pdNo);	
			// 물품 수량 저장.
			var qty = $(".qty").text();			
			$("input[name='qty']").val(qty);
						
			var base = $(".unit_price").text();			
			$("input[name='item[base]']").val(base.split('$')[2]);
			
			var productName = $(".productName").text();					
			$("input[name='item[productname]']").val(productName);
						
			var tax = $(".taxsales").text();			
			$("input[name='tax']").val(tax.split('$')[1]);
			
			var dc = $(".afterDc").text();			
			$("input[name='afterDc']").val(dc.split('$')[1]);
			
			var subtotal = $(".subtotalprice").text();			
			$("input[name='subtotal']").val(subtotal.split('$')[1]);
								
			$("input[name='user_id']").val(JSON.parse(sessionStorage.user)[0].id);
			$("input[name='curl']").val(document.URL);
			
			/* pdf 내용에 들어가는 정보들 */
			if($('.discountPrice').text() != '' || $('.discountPrice').val() != 'undefined'){								
				$scope.dcPrice = $('.discountPrice').val(); 
			}else{
				$('.discountPrice').val('0'); 
				$scope.dcPrice = "0";				
			}		
			var link = 'http://crm.biztechus.com/ubilleNewData.php?oper=addSalesOrderHead';
				$http.post(link, {accountid : $("input[name='accountid']").val(), afterDc : dc.split('$')[1], discountPrice :  $("input[name='discountPrice']").val(),tax : tax.split('$')[1], discount : dc.split('$')[1], subtotal : subtotal.split('$')[1], user_id : JSON.parse(sessionStorage.user)[0].id, color : $scope.salesorder.items[1].color}).then(function (res){					
					var link = 'http://crm.biztechus.com/ubilleNewData.php?oper=addSalesOrder';
					$http.post(link, $scope.salesorder.items).then(function (res){										
				});		
			});	
			
					

			$rootScope.items = $scope.salesorder.items;
			$rootScope.total = $scope.total; // 주문한 물품의 총 가격 (세전)
			$rootScope.sales = $scope.sales; // 주문가격에 대한 총 세금 
			$rootScope.tax = $scope.tax; // 물품의 세금			
			var dcFixed = Number($scope.discount);			
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
													
							cordova.plugins.email.open({
								to:      [$("input:text[name='email']").val()],                             
								subject: 'sales order invioce',
								body:    'Hello, Thank you for sales order invoice. We will contact you soon regarding sales order.',
								isHTML: false,
								attachments: [filePath],
								app:'gmail'
							});
							$scope.salesorder.items.splice(0);																
							$state.go('tabs.home');								
						});												
					return true;					
				}				
		}
	}
})	
.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.salesorder = {
	items:[{
		product_no : '', 	//제품번호
		itemQnt : '',  		//주문수량
        productname : '',	//제품명
        unit_price : '',	//제품단가
		path : '',			//이미지폴더경로
		name : '',			//이미지이름
		color : '',			//제품색상번호
		colorName : '',		//색상이름		
		taxSales : '',		//세금
		total : '',			//주문금액+세금
		user_id : '',		//유저(세일즈맨) 번호
		discount : '',		//할인 금액
		afterDc : '',		//할인 적용 후 금액
		subTotal : ''		//할인 전 금액
	}]
  };
  /*
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };*/
})
.controller('HomeTabCtrl', function($scope, $state) {		
	$('.logoutDisabled a').css('background','');
	$('.logoutDisabled a').unbind('click');
	
	$scope.$root.addDetailButton = null;
	$scope.$root.tabsHidden = "";	
	$scope.$root.cartList = function(){		
		$state.go('#/cartList');
	};
	var now = new Date().getTime();
	if(now-sessionStorage.getItem('setupTime') > 60*1000*30) {
        window.sessionStorage.clear();  
		$state.go('login');
    }		
})
.controller('settingCtrl', function($scope, Setting, $state ) {
	Setting.all().then(function(data){				
		$scope.data = data;				
		$scope.data[0].tax = JSON.parse(sessionStorage.user)[0].usertax;		
	});	
	
	$scope.account = {};
	$scope.$root.addDetailButton = function(){		
		$(".accountDetailShow").css("display","none");		
		$(".accountDetailEdit").css("display","block");	
		
		$('input[name="accName"]').val($('input[name="accName"]').attr('placeholder'));
		$('input[name="address"]').val($('input[name="address"]').attr('placeholder'));
		$('input[name="city"]').val($('input[name="city"]').attr('placeholder'));
		$('input[name="state"]').val($('input[name="state"]').attr('placeholder'));
		$('input[name="country"]').val($('input[name="country"]').attr('placeholder'));
		$('input[name="code"]').val($('input[name="code"]').attr('placeholder'));
		$('input[name="phone"]').val($('input[name="phone"]').attr('placeholder'));
		$('input[name="fax"]').val($('input[name="fax"]').attr('placeholder'));
		$('input[name="website"]').val($('input[name="website"]').attr('placeholder'));
		$('input[name="tax"]').val($('input[name="tax"]').attr('placeholder'));
		$('input[name="user_id"]').val(JSON.parse(sessionStorage.user)[0].id);		
		$('input[name="curl"]').val(document.URL);	
	}
	$scope.selectedVal = function(tax){
		$('input[name="tax"]').val(tax);
	}; 
	$scope.submit = function(){
		$(".customerDetailShow").css("display","block");		
		$(".customerDetailEdit").css("display","none");
		$state.go('tabs.home');
	}	
});


