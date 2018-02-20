/*var order = {
				idOrder: 1, 
				products:[
							{
								'Product':'PIZZA',
								'Quantity':'3'
							},
							{
								'Product':'HOTDOG',
								'Quantity':'1'
							},
							{
								'Product':'COKE',
								'Quantity':'4'
							}
						]
};*/


orders = undefined;



addOrder = function(id, Products){
	var newOrder = {idOrder:id, products:Products};
	orders.push(newOrder);
}


removeOrderById = function(id){
	axios.delete('/orders/'+id)
		.then(function(){
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
				removeOrderById(3);
				
				
				
				
				
			}
	
);