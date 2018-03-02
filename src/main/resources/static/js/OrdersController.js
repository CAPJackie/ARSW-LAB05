var OrdersControllerModule = (function () {
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
        // todo implement
    };

    return {
        showOrdersByTable: showOrdersByTable,
        updateOrder: updateOrder,
        deleteOrderItem: deleteOrderItem,
        addItemToOrder: addItemToOrder
    };

})();