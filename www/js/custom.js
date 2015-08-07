var path = "http://crm.biztechus.com";
var test = "http://localhost/vtigercrm";
var params = location.search.split('&')[1]; // list 화면에서 클릭한 값을 담아서 detail 조회할때 사용.




//현재 url 담기.
var url =  window.location.href;			
var gourl = url.split('&');				
$('input[name="currentUrl"]').val(gourl[0]+"&"+gourl[1]);
/*
// product list
function cntrProd($scope, $http){ 
	//var site= path+"/testdata.php?oper=product";
	var site= test+"/testdata.php?oper=product";		
	$http.get(site).success(function(response){
		$scope.data = response;
	});
}

// product detail
function cntrProductDetail($scope, $http){
	//var site= path+"/testdata.php?oper=productDetail&"+params;	
	var site= test+"/testdata.php?oper=productDetail&"+params;	
	$http.get(site).success(function(response){
		$scope.data = response;		
	}); 
}


// Account list
function cntrAccount($scope, $http){
	//var site= path+"/testdata.php?oper=acoount";
	var site= test+"/testdata.php?oper=acoount";	
	$http.get(site).success(function(response){	
		$scope.data = response;	
	});	
};

// Account detail
function cntrAccDetail($scope, $http){
	//var site= path+"/testdata.php?oper=accountDetail&"+params;
	var site= test+"/testdata.php?oper=accountDetail&"+params;	
	$http.get(site).success(function(response){
	
		$scope.data = response;		
	}); 
}

// order list
function cntrOrder($scope, $http){
	//var site= path+"/testdata.php?oper=Order";
	var site= test+"/testdata.php?oper=order";		
	$http.get(site).success(function(response){
		$scope.data = response;
	});
}

// order list
function cntrOrderDetail($scope, $http){

	//var site= path+"/testdata.php?oper=orderDetail&"+params;
	var site= test+"/testdata.php?oper=orderDetail&"+params;		
	$http.get(site).success(function(response){
		$scope.data = response;
	});
}

function cntrAddOrder($scope, $http){
	//var site= path+"/testdata.php?oper=addOrder&"+params;
	var site= test+"/testdata.php?oper=addOrder";		
	$http.get(site).success(function(response){		
		var tmp = response[0].salesorder_no;
		var id = tmp.substring(0,2);
		var num = Number(tmp.substr(2));
		response[0].salesorder_no = id+(num+1);		
		$scope.data = response;	
	});
}
*/

 $(function(){ 
        $("#edit").click(function(){
            var $this = $(this);
            var value = $this.attr('value');		
			
            if(value=="Edit"){
                $this.attr("value","Cancel");
				document.getElementById("save").style.display = "block";
				document.getElementById("delete").style.display = "none";
            }else{
                $this.attr("value","Edit");
				document.getElementById("save").style.display = "none";
				document.getElementById("delete").style.display = "block";
            }
            $(".editable").toggle();
			//original 정보 input에 담기.
			originId();
			if(params.split("=")[0]=="orgno"){
				accEdit();
			}else if(params.split("=")[0]=="orderno"){
				orderEdit();
			}
        });				
        $("input.editable").change(function(){
            $(this).prev().value($(this).value());
        });				
		$("#save").click(function(){
			$('input[name="stage"]').val("save");	
			document.forms["Edit"].submit();			
		});

		$("#delete").click(function(){		
			$(".editable").toggle();
			//original 정보 input에 담기.
			originId();
			if(params.split("=")[0]=="orderno"){orderEdit();}
			$('input[name="stage"]').val("delete");	
			document.forms["Edit"].submit();			
		});		
    });


function originId(){
var accid = $('#originAccid').text();			
$('input[name="accId"]').val(accid);
var accountname = $('#originAccName').text();			
$('input[name="accountname"]').val(accountname);
var salesorder_no = $('#originSoNo').text();			
$('input[name="salesorder_no"]').val(salesorder_no);
var sostatus = $('#originSoStatus').text();			
$('input[name="sostatus"]').val(sostatus);
}

function accEdit(){
var name = $('#originAccName').text();
$('input[name="accountname"]').val(name);	
var email = $('#originAccEmail').text();	
$('input[name="email"]').val(email);	
var phone = $('#originAccPhone').text();	
$('input[name="phone"]').val(phone);	
var street = $('#originAccStreet').text();	
$('input[name="street"]').val(street);	
var city = $('#originAccCity').text();	
$('input[name="city"]').val(city);	
var state = $('#originAccState').text();	
$('input[name="state"]').val(state);	
}

function orderEdit(){
var bill_street = $('#originBillStreet').text();
$('input[name="bill_street"]').val(bill_street);	
var bill_city = $('#originBillCity').text();	
$('input[name="bill_city"]').val(bill_city);	
var bill_code = $('#originBillCode').text();	
$('input[name="bill_code"]').val(bill_code);	
var ship_street = $('#originShipStreet').text();	
$('input[name="ship_street"]').val(ship_street);	
var ship_city = $('#originShipCity').text();	
$('input[name="ship_city"]').val(ship_city);	
var ship_code = $('#originShipCode').text();	
$('input[name="ship_code"]').val(ship_code);
var productname = $('#originSoPd').text();
$('input[name="productname"]').val(productname);	
var quantity = $('#originSoQnt').text();
$('input[name="quantity"]').val(quantity);	
var listprice = $('#originSoPrc').text();	
$('input[name="listprice"]').val(listprice);	
var selectCtrl = document.getElementById("discountType");
var selectedItem =  selectCtrl.options[selectCtrl.selectedIndex];
if(selectedItem.value == "percent"){	
	var discount = $('#originDcPer').text();	
	$('input[name="discount"]').val(discount);
}else{
	var discount = $('#originDcAmt').text();	
	$('input[name="discount"]').val(discount);
}	
var subtotal = $('#originSoSubtotal').text();	
$('input[name="subtotal"]').val(subtotal);
var comment = $('#originSoCom').text();	
$('input[name="comment"]').val(comment);	
var total = $('#originSoTotal').text();	
$('input[name="total"]').val(total);	
	
}

function selectChange(){
var selectCtrl = document.getElementById("discountType");
var selectedItem =  selectCtrl.options[selectCtrl.selectedIndex];
	if(selectedItem.value == "amount"){	
		document.getElementById("originDcAmt").style.display = "block";
		document.getElementById("originDcPer").style.display = "none";
	}else{
		document.getElementById("originDcAmt").style.display = "none";
		document.getElementById("originDcPer").style.display = "block";
	}
}
