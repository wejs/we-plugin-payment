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