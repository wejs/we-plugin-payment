const assert = require('assert'),
  request = require('supertest'),
  helpers = require('we-test-tools').helpers,
  stubs = require('we-test-tools').stubs;

let http, we, agent, salvedUser, salvedUserPassword, authenticatedRequest;

describe('we-plugin-payment-orderFeature', function() {

  before(function (done) {
    http = helpers.getHttp();
    agent = request.agent(http);

    we = helpers.getWe();

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
        done(err);
      });
    });
  });

  describe('API', function () {
    it ('it should do something');
  });
});