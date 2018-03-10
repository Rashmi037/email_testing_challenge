var expect = require("chai").expect,
  supertest = require("supertest"),
  { request } = require("http"),
  { HttpServer } = require("./../../node_modules/sinon-server/lib/"),
  api = supertest("http://localhost:8080"),
  testServer_sendgrid = new HttpServer({ port: 1338 });

var postData = JSON.stringify({
  to: [{ email: "to_valid_1@gmail.com" }],
  cc: [],
  bcc: [],
  from: "from_valid@gmail.com",
  subject: "something",
  text: "something"
});
testServer_sendgrid.withArgs("POST", "/mail/send").resolves({
  status: 200,
  headers: { "Content-Type": "application/json" },
  body: {
    success: "ok"
  }
});

describe("Email Service should send email through sendgrid if", function() {
  beforeEach(function() {
    testServer_sendgrid.start();
  });
  afterEach(function() {
    testServer_sendgrid.stop();
  });

  it("mailgun is down", function(done) {
    api
      .post("/sendMail")
      .set("Content-Type", "application/json")
      .send(postData)
      .end(function(err, res) {
        expect(res.body).to.equal(true);
        expect(res.status).to.equal(200);
        done();
      });
  });
});
