// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('ubille', ['ionic', 'ubille.controllers', 'ubille.services', 'chart.js'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('search', {
      url: '/search',
      templateUrl: 'templates/search.html'
    })
    .state('#/setting', {
      url: '/setting',				  
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
	
    .state('tabs.product', {
      url: "/product",
      views: {
        'product-tab': {
          templateUrl: "templates/product.html",
		  controller: "productCtrl"
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
    .state('tabs.customers', {
      url: "/customers",
      views: {
        'customers-tab': {
          templateUrl: "templates/customers.html",	
		  controller: 'CustomersCtrl'	  	  
        }
      }
    })
	.state('tabs.salesOrder', {
      url: "/salesOrder",
      views: {
        'salesOrder-tab': {
          templateUrl: "templates/salesOrder.html",
		  controller: 'salesOrderCtrl'		  
        }
      }
    })
	.state('tabs.product-detail', {
      url: "/product/:productNo",	
      views: {
        'product-tab': {
          templateUrl: "templates/productDetail.html",
		  controller: 'productDetailCtrl'
        }
      }
    })
	.state('tabs.salesOrder-detail', {
      url: "/salesOrder/:salesorderNo",
      views: {
        'salesOrder-tab': {
          templateUrl: "templates/salesOrderDetail.html",
		  controller: 'salesDetailCtrl'		  
        }
      }
    })
	.state('tabs.customer-detail', {
      url: "/customers/:customerId",
      views: {
        'customers-tab': {
          templateUrl: "templates/customer-detail.html",
		  controller: 'CustomerDetailCtrl'
        }
      }
    })
	.state('tabs.customer-add', {
      url: "/addCustomer",
      views: {
        'customers-tab': {
          templateUrl: "templates/addCustomer.html",
		  controller: 'addCustomerCtrl'
        }
      }
    })
	.state('#/cartList',{
	   url: "/cartList",     
       templateUrl: "templates/addSalesOrder.html" 		 
    })	
	;
   $urlRouterProvider.otherwise("/tab/home");

})
 .controller("BarCtrl", function ($scope) {
  $scope.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'];  
  $scope.series =['2014','2015'];
  $scope.data = [[65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56],
				[75, 39, 79, 85, 47, 59, 44, 66, 0, 0, 0, 0]];
	$scope.colours = [
    '#97BBCD', // blue
    '#46BFBD', // green
    '#FDB45C' // yellow
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
})

.controller("DoughnutCtrl", function ($scope) {
  $scope.labels = ["Men", "Women", "Children", "Sports", "Plus"];
  $scope.data = [300, 500, 70, 100, 30];
  $scope.colours = [
    '#97BBCD', // blue    
    '#F7464A', // red
    '#46BFBD', // green
    '#FDB45C', // yellow
    '#4D5360'  // dark grey
  ];  
})
.controller("LineCtrl", function ($scope) {
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  }; 
})
.controller("RadarCtrl", function ($scope) {
  $scope.labels =["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];

  $scope.data = [
    [65, 59, 90, 81, 56, 55, 40],
    [28, 48, 40, 19, 96, 27, 100]
  ];  
});


