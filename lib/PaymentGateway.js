/**
 * Payment gateway prototype
 *
 * Required actions how may be done by payment gateways, overryde this methods in custom PaymentGateways
 */

function PaymentGateway(config) {
  this.config = config;

  this.init();
}

PaymentGateway.prototype.init = function init() {

}

PaymentGateway.prototype.submitTransaction = function submitTransaction(order, creditCard, cb) {

}

PaymentGateway.prototype.authorizeTransaction = function() {

}

module.exports = PaymentGateway;