var expect = require("chai").expect,
  supertest = require("supertest"),
  { request } = require("http"),
  { HttpServer } = require("./../../node_modules/sinon-server/lib/"),
  api = supertest("http://localhost:8080"),
  testServer_mailgun = new HttpServer({ port: 1337 });

var postData = JSON.stringify({
  to: [{ email: "to_valid_1@gmail.com" }],
  cc: [],
  bcc: [],
  from: "from_valid@gmail.com",
  subject: "something",
  text: "something"
});
testServer_mailgun
  .withArgs(
    "POST",
    "/sandbox66af2bfe73644db3b91920c1afe40d95.mailgun.org/messages"
  )
  .resolves({
    status: 200,
    headers: { "Content-Type": "application/json" },
    body: {
      success: "ok"
    }
  });

describe("Email Service should send email through MailGun if", function() {
  beforeEach(function() {
    testServer_mailgun.start();
  });
  afterEach(function() {
    testServer_mailgun.stop();
  });

  it("sendgrid is down", function(done) {
    api
      .post("/sendMail")
      .set("Content-Type", "application/json")
      .send(postData)
      .end(function(err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.equal(true);
        done();
      });
  });
});
