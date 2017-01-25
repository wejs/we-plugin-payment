var assert = require('assert');
var request = require('supertest');
var helpers = require('we-test-tools').helpers;
var stubs = require('we-test-tools').stubs;
var _ = require('lodash');
var http;
var we;

describe('payment-cartFeature', function () {
  var salvedPage, salvedUser, salvedUserPassword;
  var authenticatedRequest;

  before(function (done) {
    http = helpers.getHttp();
    we = helpers.getWe();

    var userStub = stubs.userStub();
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
      .end(function (err, res) {
        if (err) throw err;

        done();
      });

    });
  });

  describe('find', function () {
    it('get /payment-cart route should find one payment-cart', function(done){
      request(http)
      .get('/payment-cart')
      .set('Accept', 'application/json')
      .end(function (err, res) {
        assert.equal(200, res.status);
        assert(res.body.payment-cart);
        assert( _.isArray(res.body.payment-cart) , 'payment-cart not is array');
        assert(res.body.meta);

        done();
      });
    });
  });
  describe('create', function () {
    it('post /payment-cart create one payment-cart record');
  });
  describe('findOne', function () {
    it('get /payment-cart/:id should return one payment-cart');
  });
  describe('update', function () {
    it('put /payment-cart/:id should upate and return payment-cart');
  });
  describe('destroy', function () {
    it('delete /payment-cart/:id should delete one payment-cart')
  });
});
