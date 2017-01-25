const assert = require('assert'),
  request = require('supertest'),
  helpers = require('we-test-tools').helpers,
  stubs = require('we-test-tools').stubs;

let http,
  _,
  we,
  salvedPage,
  salvedUser,
  salvedUserPassword,
  authenticatedRequest;

describe('payment', function () {
  before(function (done) {
    http = helpers.getHttp();
    we = helpers.getWe();
    _ = we.utils._;

    const userStub = stubs.userStub();
    helpers.createUser(userStub, (err, user)=> {
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

  describe('payment-process without shipping', function () {
    it('User should list some products from db', function(done) {

      done();
    });

    it('User should add 1 product in cart');
    it('User should add 2 products in cart');
    it('User should list all products in card');
    it('User should skip shipping process');
    it('User should list payment options');
    it('User should select one payment option');
    it('User should get payment report data');
    it('User should confirm the payment');
    it('The system should send the user to the payment gateway system');
    it('After success the system should register the payment success data');
    it('The system should redirect user to one payment page with payment report');
  });
});
