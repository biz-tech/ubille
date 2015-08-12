var path = "http://crm.biztechus.com";
//var path = "http://localhost/vtigercrm";
angular.module('ubille.services', [])

.factory('Customers', function($http) {
  // Might use a resource here that returns a JSON array
    var data = [];
  	var site= path+"/testdata.php?oper=acoount";		
	$http.get(site).success(function(response){	
		data = response;		
	});	
	
  return {
    all: function() {	
      return data;
    },
    remove: function(customer) {
      data.splice(data.indexOf(customer), 1);	  
    },
    get: function(customerId) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].accountid == parseInt(customerId)) {	
          return data[i];		  
        }
      }
      return null;
    }
  };
})
.factory('Product', function($http) {
  // Might use a resource here that returns a JSON array
    var data = [];	
  	var site= path+"/testdata.php?oper=product";
	$http.get(site).success(function(response){			
		data = response;
	});	

  return {
    all: function() {	
      return data;
    },   
    get: function(productNo) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].product_no == productNo) {					
          return data[i];
        }
      }
      return null;
    }
  };
})
.factory('SalesOrder', function($http) {
  // Might use a resource here that returns a JSON array
    var data = [];
  	var site= path+"/testdata.php?oper=order";		
	$http.get(site).success(function(response){	
		data = response;			
	});	

  return {
    all: function() {	
      return data;
    },
    remove: function(salesorder) {
      data.splice(data.indexOf(salesorder), 1);
    },
    get: function(salesorderNo) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].salesorder_no == salesorderNo) {
							
				return data[i];
			}
		}
      return null;
    }
  };
});