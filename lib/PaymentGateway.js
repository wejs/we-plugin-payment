/**
 * Payment gateway prototype
 *
 * Required actions how may be done by payment gateways, overryde this methods in custom PaymentGateways
 */

function PaymentGateway(config) {
  this.config = config;

  this.init();
}

PaymentGateway.prototype = {
  init() {

  },

  /**
   * Submit one transaction to payment gateway
   *
   * @param  {Object}   order      User order
   * @param  {Object}   creditCard User credicard
   * @param  {Function} cb         callback
   */
  submitTransaction() {

  },

  authorizeTransaction() {

  }
};


module.exports = PaymentGateway;