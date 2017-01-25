/**
 * Plugin.js file, set configs, routes, hooks and events here
 *
 * see http://wejs.org/docs/we/plugin
 */
module.exports = function loadPlugin(projectPath, Plugin) {
  const plugin = new Plugin(__dirname);

  // set plugin configs
  plugin.setConfigs({
    payment: {
      moneyPrefix: '$',
      currency: 'USD',
      orderExpirationTime: false // false = never expires old orders
    }
  });

  // ser plugin routes
  plugin.setRoutes({
    // Pages

    // get open cart orders
    'get /cart': {
      controller: 'payment_order',
      action: 'findOpenOrders',
      model: 'payment_order',
      template: 'payment_order/cart'
    },
    // all orders how dont are open
    'get /orders': {
      controller: 'payment_order',
      action: 'find',
      model: 'payment_order',
      template: 'payment_order/orders'
    },

    // API
    'post /cart/add-item': {
      controller: 'payment_order',
      action: 'create',
      responseType: 'json'
    },
    'post /cart/remove-item/:id': {
      controller: 'payment_order',
      action: 'delete',
      responseType: 'json'
    },
    'post /order/create': {
      controller: 'payment_order',
      action: 'create',
      responseType: 'json'
    },
    'get /payment/callback/:orderId': {
      controller: 'payment_order',
      action: 'cancelOrReturnCallback',
      responseType: 'json'
    }
  });

  return plugin;
};