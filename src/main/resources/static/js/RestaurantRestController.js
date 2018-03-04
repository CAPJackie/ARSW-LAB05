var RestControllerModule = (function () 
{

  var getOrders = function (callback) {
    axios.get('/orders')
        .then(function (response) {
          callback.onSuccess(response.data);
        })
        .catch(function (reason) {
          callback.onFailed(reason);
        });
  };
  
  var getOrderById = function(orderId, callback){
      axios.get('/orders/'+orderId)
              .then(function (response){
                  callback.onSuccess(response.data);
              })
              .catch(function (reason){
                  callback.onFailed(reason);
              });
  }

  var updateOrder = function (idOrder, order, callback) {
      console.log(idOrder);
      console.log(order);
      /*axios({
          method:'PUT',
          url:'/orders/'+idOrder,
          data: order,
          headers: {'Content-Type': 'application/json; charset=utf-8'}
      })*/
      axios.put('/orders/'+idOrder, orden)
            .then(function(){
                console.log("SI LLEGA")
                callback.onSuccess();
            })
            .catch(function(reason){
                callback.onFailed(reason);
            });
  };

  var deleteOrder = function (orderId, callback) {
    axios.delete('/orders/'+orderId)
            .then(function(){
                callback.onSuccess();
            })
            .catch(function(reason){
                callback.onFailed(reason);
            });
  };

  var createOrder = function (order, callback) {
    // todo implement
  };

  return {
    getOrders: getOrders,
    getOrderById: getOrderById,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder,
    createOrder: createOrder
  };

})();