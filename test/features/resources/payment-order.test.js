const assert = require('assert'),
  request = require('supertest'),
  helpers = require('we-test-tools').helpers,
  stubs = require('we-test-tools').stubs;

let _, http, we, salvedUser, salvedUserPassword, authenticatedRequest;

describe('payment-orderFeature', function () {
  before(function (done) {
    http = helpers.getHttp();
    we = helpers.getWe();
    _ = we.utils._;

    const userStub = stubs.userStub();
    helpers.createUser(userStub, function(err, user) {
      if (err) throw err;

      salvedUser = user;
      salvedUserPassword = userStub.password;

      // login user and save the browser
      authenticatedRequest = request.agent(http);
      authenticatedRequest.post('/login')
      .set('Accept', 'application/json')
      .send({
        email: salvedUser.email,
        password: salvedUserPassword
      })
      .expect(200)
      .set('Accept', 'application/json')
      .end(  (err)=> {
        if (err) throw err;
        done();
      });
    });
  });

  describe('find', function () {
    it('get /payment_order route should find one payment_order', function(done){
      request(http)
      .get('/payment_order')
      .set('Accept', 'application/json')
      .end(function (err, res) {
        assert.equal(200, res.status);
        assert(res.body.payment_order);
        assert( _.isArray(res.body.payment_order) , 'payment_order not is array');
        assert(res.body.meta);

        done();
      });
    });
  });
  describe('create', function () {
    it('post /payment_order create one payment_order record');
  });
  describe('findOne', function () {
    it('get /payment_order/:id should return one payment_order');
  });
  describe('update', function () {
    it('put /payment_order/:id should upate and return payment_order');
  });
  describe('destroy', function () {
    it('delete /payment_order/:id should delete one payment_order');
  });
});
