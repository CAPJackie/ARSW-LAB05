orders = undefined;



addOrder = function(){
	var insert = {2:{"orderAmountsMap":{"HOTDOG":10,"HAMBURGUER":20,"BEER":40},"tableNumber":2}};
	axios.post('/orders', insert)
		.then(function(){                
			//Render the tables
                        $("#tablasActuales").append("<p id='tag"+2+"'>Order 2</p>");
                        //$("#tablasActuales").append("<p id='total"+2+"'> total = "+getTotalBill(2)+"</p>");
			$("#tablasActuales").append("<table id='Order"+2+"' class='table table-dark'> <thead> <tr> <th scope='col'>Product</th> <th scope='col'>Quantity</th> </tr> </thead>");
			for(map in insert[2].orderAmountsMap){
				//Render the rows
				$("#Order"+2).append("<tbody> <tr> <td>"+map+"</td> <td>"+insert[2].orderAmountsMap[map]+"</td> </tr> </tbody>");
			}
			
		})
		.catch(function(error){
			console.log(error);
			errorMessage();
		});
}


removeOrderById = function(id){
	axios.delete('/orders/'+id)
		.then(function(){
                        //document.getElementById("total"+id).remove();
                        document.getElementById("tag"+id).remove();
			document.getElementById("Order"+id).remove();
		})
		.catch(function(error){
			console.log(error);
			errorMessage();
		});
}

loadOrdersList = function(){
	orders = [];
	axios.get('/orders')
		.then(function(result){
			orders = result.data;
			$("#tablasActuales").empty();
			for(key in orders){
				//Render the tables
                                $("#tablasActuales").append("<p id='tag"+key+"'>Order "+key+ "</p>");
                                //$("#tablasActuales").append("<p id='total"+key+"'> total = "+getTotalBill(key)+"</p>");
				$("#tablasActuales").append("<table id='Order"+key+"' class='table table-dark'> <thead> <tr> <th scope='col'>Product</th> <th scope='col'>Quantity</th> </tr> </thead>");
				for(map in orders[key].orderAmountsMap){
					//Render the rows
					$("#Order"+key).append("<tbody> <tr> <td>"+map+"</td> <td>"+orders[key].orderAmountsMap[map]+"</td> </tr> </tbody>");
				}
			}
			
			//console.log(orders);
		})
		.catch(function(error){
			console.log(error);
			errorMessage();
		});
}


errorMessage = function(){
	alert("There is a problem with our servers. We apologize for the inconvince, please try again later");
}

$(document).ready(
			function(){
				loadOrdersList();
							
			}
	
);