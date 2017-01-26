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
    const data = [{
      sku: 'CAB9-1',
      name: 'Smartphone Motorola Moto G4 PLUS XT1640 Branco - Dual Chip,Tela 5.5",Câmera 16MP+Frontal 5MP,Octa Core,32GB,2GB RAM,Android 6,Sensor impressão digital',
      desciption: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.',
      price: '1469.00',
      discount: '220.35',
      quantity: 1
    }, {
      sku: 'BCAA-1',
      name: 'Bicicleta Caloi Andes, Aro 26, 21 marchas, Suspensão Dianteira, V-Brake em alumínio, Preto Fosco - Caloi',
      description: 'Modelo ideal para passeio ou trilha leve. Quadro com design exclusivo e suspensão frontal que garante uma pedalada confortável.',
      price: '559.90',
      discount: '83.98',
      quantity: 2
    }];
    let products = [];

    before(function(done) {
      we.utils.async.eachSeries(data, (d, next)=> {
        we.db.models.product
        .create(d)
        .then( (p)=> {
          products.push(p);
          next();
          return null;
        })
        .catch(next);
      }, done);
    });

    it('User should get 2 diferent products and pay for it', function(done) {

      we.utils.async.series([
        // 'User should list some products from db'
        function listProducts(done) {
          authenticatedRequest
          .get('/product')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.log('res.text>', res.text);
              return done(err);
            }

            // console.log('res.body>', res.body);

            assert(res.body.product);
            assert(res.body.meta);
            assert.equal(res.body.meta.count, 2, 'Should have 2 records in db');
            assert.equal(res.body.product.length, 2, 'Should have 2 products');
            assert.equal(res.body.product[0].sku, data[0].sku);
            // assert.equal(res.body.product[0].name, data[0].name);
            assert.equal(res.body.product[0].quantity, data[0].quantity);

            assert.equal(res.body.product[1].sku, data[1].sku);
            // assert.equal(res.body.product[1].name, data[1].name);
            assert.equal(res.body.product[1].quantity, data[1].quantity);

            done();
          });
        },
        //
        // function AddOneProductInCart(done) {
        //   authenticatedRequest
        //   .psot('/cart/add-item')
        //   .set('Accept', 'application/json')
        //   .send({

        //   })
        //   .expect(200)
        //   .end(function (err, res) {
        //     if (err) {
        //       console.log('res.text>', res.text);
        //       return done(err);
        //     }

        //     console.log('res.body>', res.body);

        //     assert(res.body.product);
        //     assert(res.body.meta);
        //     assert.equal(res.body.meta.count, 2, 'Should have 2 records in db');
        //     assert.equal(res.body.product.length, 2, 'Should have 2 products');
        //     assert.equal(res.body.product[0].sku, data[0].sku);
        //     // assert.equal(res.body.product[0].name, data[0].name);
        //     assert.equal(res.body.product[0].quantity, data[0].quantity);

        //     assert.equal(res.body.product[1].sku, data[1].sku);
        //     // assert.equal(res.body.product[1].name, data[1].name);
        //     assert.equal(res.body.product[1].quantity, data[1].quantity);

        //     done();
        //   });
        // },
        function listPaymentOptions(done) {

          done();
        }

      ], done);

    });

    // it('User should add 1 product in cart');
    // it('User should add 2 products in cart');
    // it('User should list all products in card');
    // it('User should skip shipping process');
    it('User should list payment options');
    it('User should select one payment option');
    it('User should get payment report data');
    it('User should confirm the payment');
    it('The system should send the user to the payment gateway system');
    it('After success the system should register the payment success data');
    it('The system should redirect user to one payment page with payment report');
  });
});
