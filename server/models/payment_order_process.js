/**
 * payment_order_process
 *
 * @module      :: Model
 * @description :: payment_order_process model
 *
 */

module.exports = function (we) {
  var model = {
    definition: {
      gatewayProcesId: {
        type: we.db.Sequelize.INTEGER
      },
      gateway: {
        type: we.db.Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: we.db.Sequelize.STRING,
        allowNull: false
      },
      // save gateway response data
      response: {
        type: we.db.Sequelize.BLOB,
        skipSanitizer: true
      }
    },
    associations: {
      order: { type: 'belongsTo', model: 'payment_order' }
    },
    options: {
      classMethods: {},
      instanceMethods: {},
      hooks: {}
    }
  };

  return model;
};