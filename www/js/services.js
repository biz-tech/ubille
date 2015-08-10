var path = "http://crm.biztechus.com";
angular.module('ubille.services', [])

.factory('Customers', function($http,$scope) {
  // Might use a resource here that returns a JSON array
    var customers = [];
  	var site= path+"/testdata.php?oper=acoount";	
	console.log("customer list");
	$http.get(site).success(function(response){	
		customers = response;	
			console.log(customers);
	});	


  return {
    all: function() {
	console.log(customers);
      return customers;
    },
    remove: function(customer) {
      customers.splice(customers.indexOf(customer), 1);
    },
    get: function(customerId) {
      for (var i = 0; i < customers.length; i++) {
        if (customers[i].accountid === parseInt(customerId)) {
          return customers[i];
        }
      }
      return null;
    }
  };
});