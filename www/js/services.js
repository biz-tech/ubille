var path = "http://crm.biztechus.com";
//var path = "http://23.229.229.135/crm";
//var path = "http://localhost/vtigercrm";
angular.module('ubille.services', [])

.factory('Customers', function($http,$q) {
  // Might use a resource here that returns a JSON array
    var data = [];
	var site= path+"/ubilledata.php?oper=account";
	//var site= path+"/ubilleNewData.php?oper=account";

  return {
    all: function() {
		var deffered = $q.defer();				
		$http.get(site).success(function(response){			
			deffered.resolve(response);
			data = response;			
			/* console.log('customers: ' + JSON.stringify(data));			 */
	});
	return deffered.promise;
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
.factory('Product', function($http, $q) {
  // Might use a resource here that returns a JSON array
    var data = [];	
  	var site= path+"/ubilledata.php?oper=product";	

  return {  
    all: function() {	
		var deffered = $q.defer();
		$http.get(site).success(function(response){			
			deffered.resolve(response);
			data = response;
			/* console.log('product: ' + JSON.stringify(data)); */
    });
	return deffered.promise;
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
.factory('SalesOrder', function($http, $q) {
  // Might use a resource here that returns a JSON array
    var data = [];
  	var site= path+"/ubilledata.php?oper=order";		
	$http.get(site).success(function(response){	
		data = response;
	/* console.log('salesOrder: ' + JSON.stringify(data));		 */
	});	

  return {
    all: function() {	
	var deffered = $q.defer();
		$http.get(site).success(function(response){			
			deffered.resolve(response);
			data = response;
    });
	return deffered.promise;
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
})
.factory('Setting', function($http, $q) {  
    var data = [];
  	var site= path+"/ubilledata.php?oper=set";		
	$http.get(site).success(function(response){	
		data = response;	
	});	

  return {
    all: function() {	
	var deffered = $q.defer();
		$http.get(site).success(function(response){			
			deffered.resolve(response);
			data = response;
    });
	return deffered.promise;
	}
  };
});
