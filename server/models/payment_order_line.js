/**
 * payment_order_line
 *
 * @module      :: Model
 * @description :: payment_order_line model
 *
 */

module.exports = function (we) {
  var model = {
    definition: {
      description: {
        type: we.db.Sequelize.STRING
      },
      value: {
        type: we.db.Sequelize.DECIMAL(10, 2),
        defaultValue: 1,
        allowNull: false
      },
      freight: {
        type: we.db.Sequelize.DECIMAL(10, 2),
      },
      // optional reference to related model
      modelName: {
        type: we.db.Sequelize.STRING,
        allowNull: true
      },
      modelId: {
        type: we.db.Sequelize.INTEGER,
        allowNull: true
      },
      // aditional data
      data: {
        type: we.db.Sequelize.BLOB,
        formFieldType: null
      },

      // identifier for this order line
      orderLineIdentifier: {
        type: we.db.Sequelize.STRING,
        allowNull: false
      },

      hookAfterSuccess: {
        type: we.db.Sequelize.STRING,
        formFieldType: null,
        allowNull: false
      },
      hookAfterCancel: {
        type: we.db.Sequelize.STRING,
        formFieldType: null,
        allowNull: false
      }
    },
    associations: {
      order: { type: 'belongsTo', model: 'payment_order' }
    },
    options: {
      imageFields: {
        image: { formFieldMultiple: false }
      },
      classMethods: {},
      instanceMethods: {},
      hooks: {}
    }
  };

  return model;
};