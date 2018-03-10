var expect = require("chai").expect,
  supertest = require("supertest"),
  api = supertest("http://localhost:8080");

describe("Email Service should not send mail if body is not correctly formed", function() {
      it("body is empty", function(done) {
        var postData = JSON.stringify({
          to: [{ email: "to_valid_1@gmail.com" }],
          cc: [],
          bcc: [],
          from: "from_valid@gmail.com",
          subject: "something",
          text: ""
        });
        this.timeout(10000);
        api
          .post("/sendMail")
          .set("Content-Type", "application/json")
          .send(postData)
          .end(function(err, res) {
            expect(res.statusCode).to.equal(400);    
            expect(res.body.errors[0].defaultMessage).to.equal(
              "size must be between 1 and 200"
            );
            done();
          });
      });
    
      it("body is too long", function(done) {
        var postData = JSON.stringify({
          to: [{ email: "to_valid_1@gmail.com" }],
          cc: [],
          bcc: [],
          from: "from_valid@gmail.com",
          subject: "something",
          text:
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        });
        this.timeout(10000);
        api
          .post("/sendMail")
          .set("Content-Type", "application/json")
          .send(postData)
          .end(function(err, res) {
            expect(res.statusCode).to.equal(400);
            expect(res.body.errors[0].defaultMessage).to.equal(
              "size must be between 1 and 200"
            );
            done();
          });
      });
    });
    