var path = "http://crm.biztechus.com";
angular.module('ubille.services', [])

.factory('Customers', function($http) {
  // Might use a resource here that returns a JSON array
    var data = [];
  	var site= path+"/testdata.php?oper=acoount";	
	console.log("customer list");
	$http.get(site).success(function(response){	
		data = response;	
	});	

  return {
    all: function() {
	// console.log("service all");
      return data;
    },
    remove: function(customer) {
      data.splice(data.indexOf(customer), 1);
    },
    get: function(customerId) {
      for (var i = 0; i < data.length; i++) {
	  // console.log("count: " + i + " customerId: " + customerId);
        if (data[i].accountid == parseInt(customerId)) {
		// console.log("count: " + i + " customerId: " + customerId);
          return data[i];
        }
      }
      return null;
    }
  };
});