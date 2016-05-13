module.exports = {
  findOpenOrders: function findOpenOrders(req, res, next) {
    res.locals.query.where.status = 'open';
    req.we.controllers.payment_order.find(req, res, next);
  },

  findOrders: function findOrders(req, res, next) {
    res.locals.query.where.status = {
      $ne: 'open'
    };
    req.we.controllers.payment_order.find(req, res, next);
  },

  find: function find(req, res) {
    res.locals.query.include.push({
      model: req.we.db.models.payment_order_process,
      as: 'processes',
      required: false
    });

    res.locals.Model.findAll(res.locals.query)
    .then(function afterFind(records) {
      res.locals.data = records;

      res.locals.Model.count(res.locals.query)
      .then(function afterCount(count) {

        res.locals.metadata.count = count;
        res.ok();

      }).catch(req.queryError);
    }).catch(res.queryError);
  }
};