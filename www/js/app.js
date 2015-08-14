// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('ubille', ['ionic', 'ubille.controllers', 'ubille.services'])

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
; 
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
    });
   $urlRouterProvider.otherwise("/tab/home");

});
/* .directive('hideTabBar', function($timeout) {
  var style = angular.element('<style>').html(
    '.has-tabs.no-tabs:not(.has-tabs-top) { bottom: 0; }\n' +
    '.no-tabs.has-tabs-top { top: 44px; }');
  document.body.appendChild(style[0]);
  return {
    restrict: 'A',
    compile: function(element, attr) {
      var tabBar = document.querySelector('.tab-nav');
      return function($scope, $element, $attr) {
        var scroll = $element[0].querySelector('.scroll-content');
        $scope.$on('$ionicView.beforeEnter', function() {
          tabBar.classList.add('slide-away');
          scroll.classList.add('no-tabs');
        })
        $scope.$on('$ionicView.beforeLeave', function() {
          tabBar.classList.remove('slide-away');
          scroll.classList.remove('no-tabs')
        });
      }
    }
  };
}); */

