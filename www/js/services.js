var path = "http://crm.biztechus.com";

angular.module('ubille.services', [])
.factory('User', function($http, $q){  
    var data = [];	
	var site= path+"/ubilleNewData.php?oper=user";
  return {
    all: function() {
		var deffered = $q.defer();				
		$http.get(site).success(function(response){			
			deffered.resolve(response);
			data = response;	
		});
		return deffered.promise;
	}
}
})
.factory('Customers', function($http,$q) {
  // Might use a resource here that returns a JSON array
    var data = [];
	//var site= path+"/ubilledata.php?oper=account";
	var site= path+"/ubilleNewData.php?oper=account";

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
  	//var site= path+"/ubilledata.php?oper=product";
	var site= path+"/ubilleNewData.php?oper=product";		

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
.factory('ProductColor', function($http, $q) {
  // Might use a resource here that returns a JSON array
    var data = [];	
  	//var site= path+"/ubilledata.php?oper=product";
	var site= path+"/ubilleNewData.php?oper=productColor";		

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
	var dataArr = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].product_id == productNo) {					
         	dataArr.push(data[i]);	
        }
      }
      return dataArr;
    }	
  };
})
.factory('SalesOrder', function($http, $q) {
  // Might use a resource here that returns a JSON array
    var data = [];
  	//var site= path+"/ubilledata.php?oper=order";
	var site= path+"/ubilleNewData.php?oper=orderDetail";		
	$http.get(site).success(function(response){	
		data = response;
		console.log(data);
	/* console.log('salesOrder: ' + JSON.stringify(data));		 */
	});	

  return {
    all: function() {	
	var deffered = $q.defer();
		var site= path+"/ubilleNewData.php?oper=orderList";
		$http.get(site).success(function(response){			
			deffered.resolve(response);
			dataList = response;				
    });
	return deffered.promise;
	},   
    remove: function(salesorder) {
      data.splice(data.indexOf(salesorder), 1);
    },
    get: function(salesorderNo) {				
	var dataArr = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].salesorder_no == salesorderNo) {
			
			dataArr.push(data[i]);	
			console.log(dataArr);
			}				
		}		
      return dataArr;
    }
  };
})
.factory('invoice', function($http, $q) {
  // Might use a resource here that returns a JSON array
    var data = [];
  	//var site= path+"/ubilledata.php?oper=order";
	var site= path+"/ubilleNewData.php?oper=invoiceDetail";		
	$http.get(site).success(function(response){	
		data = response;
		console.log(data);
	/* console.log('salesOrder: ' + JSON.stringify(data));		 */
	});	

  return {
    all: function() {	
	var deffered = $q.defer();
		var site= path+"/ubilleNewData.php?oper=invoiceList";
		$http.get(site).success(function(response){			
			deffered.resolve(response);
			dataList = response;				
    });
	return deffered.promise;
	},   
    remove: function(salesorder) {
      data.splice(data.indexOf(salesorder), 1);
    },
    get: function(salesorderNo) {	
		console.log(salesorderNo);
	var dataArr = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].salesorder_no == salesorderNo) {
			
			dataArr.push(data[i]);	
			console.log(dataArr);
			}				
		}		
      return dataArr;
    }
  };
})
.factory('Setting', function($http, $q) {  
    var data = [];
  	var site= path+"/ubilleNewData.php?oper=set";		
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
