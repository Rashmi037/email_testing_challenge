var expect = require("chai").expect,
  supertest = require("supertest"),
  api = supertest("http://localhost:8080");

describe("Email Service should not send mail if mailid pattern is not correct", function() {
  it("mailid conatins invalid characters", function(done) {
    var postData = JSON.stringify({
      to: [{ email: "to_valid&_1@.com" }],
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
  it("domain name contains invalid characters", function(done) {
    var postData = JSON.stringify({
      to: [{ email: "to_valid_1@%.com" }],
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
  it("domain name is not according to specified pattern", function(done) {
    var postData = JSON.stringify({
      to: [{ email: "to_valid_1@%gmail." }],
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
});
