
var OrdersControllerModule = (function () {

    var selectedOrder;

   /* var getActualOrder = function () {
        var s = document.getElementById("orders");
        var selected = s.options[s.selectedIndex].value;
        var callback = {
            onSuccess: function (orden) {
                return orden;
            },
            onFailed: function (error) {
                console.log(error);
                errorMessage();
            }
        }
        RestControllerModule.getOrderById(selected, callback);
    }*/

    //Private error function
    var errorMessage = function () {
        alert("There is a problem with our servers. We apologize for the inconvince, please try again later");
    }
    var showOrdersByTable = function () {

        var callback = {

            onSuccess: function(ordersList){
                $("#actualTables").empty();
                for(key in ordersList){
                    $("#actualTables").append("<p id='tag"+key+"'>Table "+key+ "</p>");
                    $("#actualTables").append("<table id='Table"+key+"' class='table table-dark'> <thead> <tr> <th scope='col'>Product</th> <th scope='col'>Quantity</th> </tr> </thead>");
                    for(map in ordersList[key].orderAmountsMap){
                        $("#Table"+key).append("<tbody> <tr> <td>"+map+"</td> <td>"+ordersList[key].orderAmountsMap[map]+"</td> </tr> </tbody>");
                    }
                }
            },
            onFailed: function(exception){
                console.log(exception);
                errorMessage();
            }
        }
    RestControllerModule.getOrders(callback);
    };

    var updateOrder = function () {
        // todo implement
    };

    var deleteOrderItem = function (itemName) {
        // todo implement
    };

    var addItemToOrder = function (orderId, item) {
		var name = item[0];
		var quantity = item[1];
		if(selectedOrder[orderId].orderAmountsMap.keySet().contains(name)){
			selectedOrder[orderId].orderAmountsMap[name]+= parseInt(quantity);
		} else{
			selectedOrder[orderId].orderAmountsMap[item[0]] = parseInt(item[1]);
		}    
        var callback = {
            onSuccess: function () {
                showSelectedOrder();
            },
            onFailed: function (reason) {
                console.log(reason);
                errorMessage();
            }
        }
        RestControllerModule.updateOrder(selectedOrder[orderId],callback);
    };
    
    var loadSelectOrdersData = function (){
        var callback = {
            onSuccess: function(ordersList){
                $("#orders").empty();
                for(order in ordersList){
                    $("#orders").append("<option value='"+order+"'>Table "+order);
                }
            },
            onFailed: function(exception){
                console.log(exception);
                errorMessage();
            }
        }
        RestControllerModule.getOrders(callback);
    };
    
    var showSelectedOrder = function(){
        var s = document.getElementById("orders");
        var selected = s.options[s.selectedIndex].value;
        var callback = {
            onSuccess: function(order){
                selectedOrder = order;
                $("#actualOrder").empty();
                $("#actualOrder").append("<thead> <tr>  <th scope='col'>Item</th> <th scope='col'>Quantity</th> <th scope='col'></th> <th scope='col'></th>  </tr> </thead>");
                for(dish in order[selected].orderAmountsMap){
                    $("#actualOrder").append("<tbody> <tr> <td>"+dish+"</td> <td>"+order[selected].orderAmountsMap[dish]+"</td> <td><button type='button' class='btn'>Update</button></td> <td><button type='button' class='btn'>Delete</button></td></tr> </tbody>");
                }
            },
            onFailed: function(exception){
                console.log(exception);
                errorMessage();
            }
        }
        RestControllerModule.getOrderById(selected,callback);
    }

    return {
        showOrdersByTable: showOrdersByTable,
        updateOrder: updateOrder,
        deleteOrderItem: deleteOrderItem,
        addItemToOrder: addItemToOrder,
        loadSelectOrdersData: loadSelectOrdersData,
        showSelectedOrder: showSelectedOrder
    };

})();
