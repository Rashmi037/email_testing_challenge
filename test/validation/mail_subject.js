var expect = require("chai").expect,
  supertest = require("supertest"),
  api = supertest("http://localhost:8080");

describe("Email Service should not send mail if subject is not correctly specified", function() {
  it("subject is empty", function(done) {
    var postData = JSON.stringify({
      to: [{ email: "to_valid_1@gmail.com" }],
      cc: [],
      bcc: [],
      from: "from_valid@gmail.com",
      subject: "",
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
          "size must be between 1 and 100"
        );
        done();
      });
  });

  it("subject is too long", function(done) {
    var postData = JSON.stringify({
      to: [{ email: "to_valid_1@gmail.com" }],
      cc: [],
      bcc: [],
      from: "from_valid@gmail.com",
      subject:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
          "size must be between 1 and 100"
        );
        done();
      });
  });
});
