/**
 * payment_order
 *
 * @module      :: Model
 * @description :: payment_order model
 *
 */

module.exports = function (we) {
  const model = {
    definition: {
      description: { type: we.db.Sequelize.TEXT },
      // total value, sum of all order_line values and freight
      total: {
        type: we.db.Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      currency: {
        type: we.db.Sequelize.STRING(4),
        allowNull: false
      },
      // open, canceled, awaiting_payment, payd, done
      status: {
        type: we.db.Sequelize.STRING,
        defaultValue: 'open'
      },
      // type identifier like event-1-ticket
      orderTypeIdentifier: {
        type: we.db.Sequelize.STRING,
        allowNull: false
      },
      // aditional data
      data: {
        type: we.db.Sequelize.BLOB,
        formFieldType: null
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
      customer: { type: 'belongsTo', model: 'user' },
      lines: {
        type: 'hasMany',
        model: 'payment-order-line',
        inverse: 'order'
      },
      processes: {
        type: 'hasMany',
        model: 'payment-order-process',
        inverse: 'order'
      }
    },
    options: {
      classMethods: {},
      instanceMethods: {},
      hooks: {}
    }
  };

  return model;
};