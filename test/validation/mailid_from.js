var expect = require("chai").expect,
  supertest = require("supertest"),
  api = supertest("http://localhost:8080");

describe("Email Service should not send mail if from field is not correctly specified", function() {
  it("from field is empty", function(done) {
    var postData = JSON.stringify({
      to: [{ email: "to_valid_1@gmail.com" }],
      cc: [],
      bcc: [],
      from: "",
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

  it("from field contains invalid mail id", function(done) {
    var postData = JSON.stringify({
      to: [{ email: "to_valid_1@gmail.com" }],
      cc: [],
      bcc: [],
      from: "from_validgmail.com",
      subject: "something",
      text: "something"
    });
    this.timeout(10000);
    api
      .post("/sendMail")
      .set("Content-Type", "application/json")
      .send(postData)
      .end(function(err, res) {
        expect(res.body.errors[0].defaultMessage).to.equal(
          'must match "[\\w.-]+@[a-zA-Z.]+"'
        );
        expect(res.statusCode).to.equal(400);
      });
    done();
  });
});
