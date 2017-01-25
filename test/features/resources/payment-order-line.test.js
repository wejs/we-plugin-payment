const assert = require('assert'),
  request = require('supertest'),
  helpers = require('we-test-tools').helpers,
  stubs = require('we-test-tools').stubs,
  _ = require('lodash');

let http, we, salvedPage, salvedUser, salvedUserPassword, authenticatedRequest;

describe('payment-order-lineFeature', function () {

  before(function (done) {
    http = helpers.getHttp();
    we = helpers.getWe();

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
      .end( (err)=> {
        if (err) throw err;
        done();
      });

    });
  });

  describe('find', function () {
    it('get /payment-order-line route should find one payment-order-line', function(done){
      request(http)
      .get('/payment-order-line')
      .set('Accept', 'application/json')
      .end(function (err, res) {
        assert.equal(200, res.status);
        assert(res.body['payment-order-line']);
        assert( _.isArray(res.body['payment-order-line']) , 'payment-order-line not is array');
        assert(res.body.meta);

        done();
      });
    });
  });
  describe('create', function () {
    it('post /payment-order-line create one payment-order-line record');
  });
  describe('findOne', function () {
    it('get /payment-order-line/:id should return one payment-order-line');
  });
  describe('update', function () {
    it('put /payment-order-line/:id should upate and return payment-order-line');
  });
  describe('destroy', function () {
    it('delete /payment-order-line/:id should delete one payment-order-line');
  });
});
