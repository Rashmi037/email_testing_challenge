var expect = require("chai").expect,
  supertest = require("supertest"),
  api = supertest("http://localhost:8080");
  
describe("Email Service is sending internal server error if recipients are repeated", function() {
  it("to-field contains same recipient more than once", function(done) {
    var postData = JSON.stringify({
      to: [
        { email: "to_valid_1@gmail.com" },
        { email: "to_valid_1@gmail.com" }
      ],
      cc: [],
      bcc: [],
      from: "from_valid@gmail.com",
      subject: "something",
      text: "something"
    });
    this.timeout(20000);
    api
      .post("/sendMail")
      .set("Content-Type", "application/json")
      .send(postData)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(500);
        done();
      });
  });
  it("cc-field contains same recipient more than once", function(done) {
    var postData = JSON.stringify({
      to: [{ email: "to_valid_1@gmail.com" }],
      cc: [
        { email: "cc_valid_1@gmail.com" },
        { email: "cc_valid_1@gmail.com" }
      ],
      bcc: [],
      from: "from_valid@gmail.com",
      subject: "something",
      text: "something"
    });
    this.timeout(20000);
    api
      .post("/sendMail")
      .set("Content-Type", "application/json")
      .send(postData)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(500);
        done();
      });
  });
  it("bcc-field contains same recipient more than once", function(done) {
    var postData = JSON.stringify({
      to: [{ email: "to_valid_1@gmail.com" }],
      cc: [],
      bcc: [
        { email: "bcc_valid_1@gmail.com" },
        { email: "bcc_valid_1@gmail.com" }
      ],
      from: "from_valid@gmail.com",
      subject: "something",
      text: "something"
    });
    this.timeout(20000);
    api
      .post("/sendMail")
      .set("Content-Type", "application/json")
      .send(postData)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(500);
        done();
      });
  });
  it("either of to-field or cc_field contains same recipient", function(done) {
    var postData = JSON.stringify({
      to: [
        { email: "to_valid_1@gmail.com" },
        { email: "to_valid_2@gmail.com" }
      ],
      cc: [{ email: "to_valid_1@gmail.com" }],
      bcc: [],
      from: "from_valid@gmail.com",
      subject: "something",
      text: "something"
    });
    this.timeout(20000);
    api
      .post("/sendMail")
      .set("Content-Type", "application/json")
      .send(postData)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(500);
        done();
      });
  });
  it("either of to-field or bcc_field contains same recipient", function(done) {
    var postData = JSON.stringify({
      to: [
        { email: "to_valid_1@gmail.com" },
        { email: "to_valid_2@gmail.com" }
      ],
      cc: [],
      bcc: [{ email: "to_valid_1@gmail.com" }],
      from: "from_valid@gmail.com",
      subject: "something",
      text: "something"
    });
    this.timeout(20000);
    api
      .post("/sendMail")
      .set("Content-Type", "application/json")
      .send(postData)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(500);
        done();
      });
  });
  it("either of cc-field or bcc_field contains same recipient", function(done) {
    var postData = JSON.stringify({
      to: [
        { email: "to_valid_1@gmail.com" },
        { email: "to_valid_2@gmail.com" }
      ],
      cc: [{ email: "cc_valid_1@gmail.com" }],
      bcc: [{ email: "cc_valid_1@gmail.com" }],
      from: "from_valid@gmail.com",
      subject: "something",
      text: "something"
    });
    this.timeout(20000);
    api
      .post("/sendMail")
      .set("Content-Type", "application/json")
      .send(postData)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(500);
        done();
      });
  });
});
