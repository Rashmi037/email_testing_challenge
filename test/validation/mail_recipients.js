var expect = require("chai").expect,
  supertest = require("supertest"),
  api = supertest("http://localhost:8080");

describe("Email Service should not send mail if recipients are not correctly specified", function() {
  it("to-field is empty", function(done) {
    var postData = JSON.stringify({
      to: [],
      cc: [],
      bcc: [],
      from: "from_valid@gmail.com",
      subject: "something",
      text: "something"
    });
    this.timeout(10000);
    api
      .post("/sendMail")
      .set("Content-Type", "application/json")
      .send(postData)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0].defaultMessage).to.equal("may not be empty");
        done();
      });
  });
  it("to-mailid is invalid", function(done) {
    var postData = JSON.stringify({
      to: [{ email: "to_valid_1gmail.com" }],
      cc: [],
      bcc: [],
      from: "from_valid@gmail.com",
      subject: "something",
      text: "something"
    });
    this.timeout(10000);
    api
      .post("/sendMail")
      .set("Content-Type", "application/json")
      .send(postData)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0].defaultMessage).to.equal(
          'must match "[\\w.-]+@[a-zA-Z.]+"'
        );
        done();
      });
  });
  it("to-field contains invalid mailid", function(done) {
    var postData = JSON.stringify({
      to: [{ email: "to_valid_1@gmail.com" }, { email: "to_valid_2gmail.com" }],
      cc: [],
      bcc: [],
      from: "from_valid@gmail.com",
      subject: "something",
      text: "something"
    });
    this.timeout(10000);
    api
      .post("/sendMail")
      .set("Content-Type", "application/json")
      .send(postData)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0].defaultMessage).to.equal(
          'must match "[\\w.-]+@[a-zA-Z.]+"'
        );
        done();
      });
  });
  it("cc-mailid is invalid", function(done) {
    var postData = JSON.stringify({
      to: [{ email: "to_valid_1@gmail.com" }],
      cc: [{ email: "cc_valid_1gmail.com" }],
      bcc: [],
      from: "from_valid@gmail.com",
      subject: "something",
      text: "something"
    });
    this.timeout(10000);
    api
      .post("/sendMail")
      .set("Content-Type", "application/json")
      .send(postData)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0].defaultMessage).to.equal(
          'must match "[\\w.-]+@[a-zA-Z.]+"'
        );
        done();
      });
  });
  it("cc-field contains atleast one invalid mailid", function(done) {
    var postData = JSON.stringify({
      to: [{ email: "to_valid_1@gmail.com" }],
      cc: [{ email: "cc_valid_1@gmail.com" }, { email: "cc_valid_2gmail.com" }],
      bcc: [],
      from: "from_valid@gmail.com",
      subject: "something",
      text: "something"
    });
    this.timeout(10000);
    api
      .post("/sendMail")
      .set("Content-Type", "application/json")
      .send(postData)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0].defaultMessage).to.equal(
          'must match "[\\w.-]+@[a-zA-Z.]+"'
        );
        done();
      });
  });
  it("bcc-mailid is invalid", function(done) {
    var postData = JSON.stringify({
      to: [{ email: "to_valid_1@gmail.com" }],
      cc: [],
      bcc: [{ email: "bcc_valid_1gmail.com" }],
      from: "from_valid@gmail.com",
      subject: "something",
      text: "something"
    });
    this.timeout(10000);
    api
      .post("/sendMail")
      .set("Content-Type", "application/json")
      .send(postData)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0].defaultMessage).to.equal(
          'must match "[\\w.-]+@[a-zA-Z.]+"'
        );
        done();
      });
  });
  it("bcc-field contains atleast one invalid mailid", function(done) {
    var postData = JSON.stringify({
      to: [{ email: "to_valid_1@gmail.com" }],
      cc: [],
      bcc: [
        { email: "bcc_valid_1@gmail.com" },
        { email: "bcc_valid_2gmail.com" }
      ],
      from: "from_valid@gmail.com",
      subject: "something",
      text: "something"
    });
    this.timeout(10000);
    api
      .post("/sendMail")
      .set("Content-Type", "application/json")
      .send(postData)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors[0].defaultMessage).to.equal(
          'must match "[\\w.-]+@[a-zA-Z.]+"'
        );
        done();
      });
  });
});

