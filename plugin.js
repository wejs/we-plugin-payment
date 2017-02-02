/**
 * Plugin.js file, set configs, routes, hooks and events here
 *
 * see http://wejs.org/docs/we/plugin
 */


const PaymentGateway = require('./lib/PaymentGateway.js');

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
      controller: 'payment-order',
      action: 'findOpenOrders',
      model: 'payment-order'
    },
    // all orders how dont are open
    'get /orders': {
      controller: 'payment-order',
      action: 'find',
      model: 'payment-order'
    },

    // API
    // 'post /cart/add-item': {
    //   controller: 'payment-cart',
    //   action: 'create',
    //   responseType: 'json'
    // },
    // 'post /cart/remove-item/:id': {
    //   controller: 'payment_order',
    //   action: 'delete',
    //   responseType: 'json'
    // },
    'post /order/create': {
      controller: 'payment-order',
      action: 'create',
      responseType: 'json'
    },
    'get /payment/callback/:orderId': {
      controller: 'payment-order',
      action: 'cancelOrReturnCallback',
      responseType: 'json'
    }
  });

  plugin.gateways = {};

  plugin.registerGateway = function registerGateway(opts) {
    plugin.gateways[name] = new PaymentGateway(opts.name, opts);
  };

  return plugin;
};